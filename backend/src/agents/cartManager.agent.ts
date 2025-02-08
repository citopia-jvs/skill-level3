import { DynamicStructuredTool } from "@langchain/core/tools";
import * as fs from "fs";
import { RunnableConfig } from "@langchain/core/runnables";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { SystemMessage } from "@langchain/core/messages";
import { ExtendedChatMistralAI } from "./supervisor.agent.js";
import { AgentState } from "../state/agent.state.js";
import { HumanMessage } from "@langchain/core/messages";
import { z } from 'zod';
import { END } from "@langchain/langgraph";

const CART_FILE = "cart.json";

const cartManagerLLM = new ExtendedChatMistralAI({
  modelName: "mistral-tiny",
  temperature: 0,
  maxTokens: 512,
  apiKey: process.env.MISTRAL_API_KEY,
});

interface CartProduct {
  id: string;
  name: string;
  url: string;
}

type CartAction = "add" | "remove" | "list";

const cartManagerTool = new DynamicStructuredTool({
  name: "cart_manager",
  description: "Manage a cart with actions like add, remove, and list products.",
  schema: z.object({
    action: z.enum(["add", "remove", "list"] as const),
    product: z
      .object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
      })
      .optional(),
  }),
  func: async ({ action, product }) => {
    try {
      let cart: CartProduct[] = [];

      try {
        cart = JSON.parse(
          fs.existsSync(CART_FILE) ? fs.readFileSync(CART_FILE, "utf8") : "[]"
        );
      } catch (error) {
        console.error("Error reading cart file:", error);
        cart = [];
      }

      let message: string;

      switch (action) {
        case "add":
          if (product) {
            cart.push(product);
            message = "Cart updated successfully.";
            console.log(`Added product to cart: ${product.name}`);
          } else {
            message = "No product provided for add operation.";
          }
          break;

        case "remove":
          if (product) {
            const initialLength = cart.length;
            cart = cart.filter((p) => p.id !== product.id);
            const removed = initialLength > cart.length;
            message = removed ? "Cart updated successfully." : "Product not found in cart.";
            console.log(removed ? `Removed product: ${product.name}` : "Product not found in cart");
          } else {
            message = "No product provided for remove operation.";
          }
          break;

        case "list":
          if (cart.length === 0) {
            return "Cart is empty";
          }
          return cart.map((p) => `${p.name} - ${p.url}`).join("\n");

        default:
          message = "Invalid action specified.";
          break;
      }

      try {
        fs.writeFileSync(CART_FILE, JSON.stringify(cart, null, 2));
        return message;
      } catch (error) {
        console.error("Error writing cart file:", error);
        return "Error updating cart file.";
      }
    } catch (error) {
      console.error("Cart manager tool error:", error);
      return "An error occurred while managing the cart.";
    }
  },
});

const cartManagerAgent = createReactAgent({
  llm: cartManagerLLM,
  tools: [cartManagerTool],
  stateModifier: new SystemMessage(`
    You are a cart management expert. Your responsibilities include:
    1. Adding new information to the cart based on researcher's information
    2. Removing information as requested by the supervisor
    3. Listing current cart contents when asked
    
    Always confirm actions and provide clear feedback about what was done.
    Use the cart_manager tool to perform these operations.
  `)
});

export const cartManagerNode = async (
  state: typeof AgentState.State,
  config?: RunnableConfig,
) => {
  try {
    if (state.messages.some((msg) => {
      const content = typeof msg.content === 'string' ? msg.content : '';
      return content.includes("Unable to retrieve");
    })) {
      return {
        messages: [
          new HumanMessage({
            content: "Could not add anything to the cart as the required details are unavailable.",
          }),
        ],
        next: END,
      };
    }

    const result = await cartManagerAgent.invoke(state, config);
    return result;
  } catch (error) {
    console.error("Cart manager node error:", error);
    return {
      messages: [
        new HumanMessage({
          content: "An error occurred while processing the cart operation.",
        }),
      ],
      next: END,
    };
  }
};

export { cartManagerTool };