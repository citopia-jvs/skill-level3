import { ChatMistralAI } from "@langchain/mistralai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { BaseOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { END } from "@langchain/langgraph";
import dotenv from "dotenv";
import { SystemMessage, HumanMessage, BaseMessage } from "@langchain/core/messages";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { RunnableSequence } from "@langchain/core/runnables";

dotenv.config();

// Constants
const CONSTANTS = {
  MODEL_NAME: "mistral-tiny",
  DEFAULT_TEMP: 0,
  MAX_TOKENS: 512,
} as const;

export const members = ["researcher", "cart_manager"] as const;
const options = [END, ...members] as const;

// Types and Interfaces
interface SupervisorState extends Record<string, any> {
  agentSummaries?: string[];
  lastAgent?: typeof options[number];
  sameAgentCount?: number;
  iterationCount?: number; // Added iteration count
}

interface AgentOutput {
  next: typeof options[number];
  reasoning: string;
  summary?: string;
}

// Create base LLM class
export class ExtendedChatMistralAI extends ChatMistralAI implements BaseChatModel {
  constructor(config: ConstructorParameters<typeof ChatMistralAI>[0]) {
    super(config);
  }
}

// LLM instance
export const llm = new ExtendedChatMistralAI({
  modelName: CONSTANTS.MODEL_NAME,
  temperature: CONSTANTS.DEFAULT_TEMP,
  maxTokens: CONSTANTS.MAX_TOKENS,
  apiKey: process.env.MISTRAL_API_KEY,
});

const systemPrompt = `
You are a supervisor managing a conversation between workers: researcher and cart_manager.
Your task is to determine who should act next based on the conversation.

Guidelines:
1. If information search is needed, choose 'researcher'
2. If cart operations are needed, choose 'cart_manager'
3. When a task is completed or no further action is needed, choose 'END'

Available options: ${options.join(", ")}

Important rules:
- Choose END when:
  * An information has been successfully added to cart
  * An error occurs that cannot be resolved
  * The task is complete
  * No further action is needed

Respond in the following format:
NEXT: [agent name or END]
REASON: [your reasoning]
SUMMARY: [optional summary of the current state]

Example responses:
---
NEXT: researcher
REASON: Need to search for information
SUMMARY: Starting the information search process
---
NEXT: cart_manager
REASON: Information is available, ready to add to cart
SUMMARY: Moving to cart management phase
---
NEXT: END
REASON: Information has been successfully added to cart
SUMMARY: Workflow completed successfully
`;

const prompt = ChatPromptTemplate.fromMessages([
  ["system", systemPrompt],
  new MessagesPlaceholder("messages"),
  ["human", "Based on the conversation above, who should act next? Please follow the format."],
]);

class SupervisorOutputParser extends BaseOutputParser<AgentOutput> {
  lc_namespace = ["supervisor", "output_parser"];

  getFormatInstructions(): string {
    return `Format your response as:
NEXT: [agent name or END]
REASON: [your reasoning]
SUMMARY: [optional summary]`;
  }

  async parse(input: string | BaseMessage): Promise<AgentOutput> {
    try {
      let text: string;

      if (typeof input === 'string') {
        text = input;
      } else if ('content' in input && typeof input.content === 'string') {
        text = input.content;
      } else {
        text = JSON.stringify(input);
      }

      // Check for completion indicators
      const completionIndicators = [
        "finish",
        "completed",
        "done",
        "added to cart",
        "cart updated",
        "unable to retrieve",
        "error occurred",
        "cannot proceed"
      ];

      if (completionIndicators.some(indicator => text.toLowerCase().includes(indicator))) {
        return {
          next: END,
          reasoning: "Task completion or stopping condition detected",
          summary: "Workflow ended due to completion or error",
        };
      }

      // Try to parse structured format
      const nextMatch = text.match(/NEXT:\s*(\w+)/i);
      const reasonMatch = text.match(/REASON:\s*([^\n]+)/i);
      const summaryMatch = text.match(/SUMMARY:\s*([^\n]+)/i);

      if (nextMatch) {
        const next = nextMatch[1].toLowerCase();
        const validNext = options.includes(next as any) ? next as typeof options[number] : END;

        return {
          next: validNext,
          reasoning: reasonMatch?.[1] || "No reasoning provided",
          summary: summaryMatch?.[1],
        };
      }

      // Content-based routing with strict conditions
      if (text.toLowerCase().includes("cart") && text.toLowerCase().includes("add")) {
        return {
          next: "cart_manager",
          reasoning: "Cart addition operation needed",
          summary: "Proceeding to add item to cart",
        };
      }

      if (text.toLowerCase().includes("search") || text.toLowerCase().includes("find")) {
        return {
          next: "researcher",
          reasoning: "Search operation needed",
          summary: "Initiating product search",
        };
      }

      // Default to END if no clear action is determined
      return {
        next: END,
        reasoning: "No clear next action determined",
        summary: "Ending workflow due to unclear direction",
      };
    } catch (error) {
      console.error("Error parsing supervisor output:", error);
      return {
        next: END,
        reasoning: "Error in parsing response",
        summary: "Ending workflow due to error",
      };
    }
  }
}

const formatMessages = async (input: { messages: BaseMessage[] }) => {
  const messages = [...input.messages];

  // Check for completion indicators in the last few messages
  const lastMessages = messages.slice(-3);
  const completionIndicators = [
    "added to cart",
    "cart updated",
    "unable to retrieve",
    "error occurred",
    "cannot proceed"
  ];

  const shouldEnd = lastMessages.some(msg =>
    completionIndicators.some(indicator =>
      (typeof msg.content === 'string' && msg.content.toLowerCase().includes(indicator))
    )
  );

  if (shouldEnd) {
    return {
      messages: [
        ...messages,
        new HumanMessage({
          content: "Task appears to be complete. Please confirm END status."
        })
      ]
    };
  }

  // Ensure last message is from human
  if (messages.length === 0 || !(messages[messages.length - 1] instanceof HumanMessage)) {
    messages.push(new HumanMessage({
      content: "Based on the conversation above, who should act next? Please follow the format."
    }));
  }

  return { messages };
};

// Main supervisor chain
export const supervisorChain = RunnableSequence.from([
  formatMessages,
  prompt,
  llm,
  new SupervisorOutputParser(),
  async (output: AgentOutput, state: SupervisorState) => {
    try {
      state.agentSummaries = state.agentSummaries || [];
      state.iterationCount = (state.iterationCount || 0) + 1; // Increment iteration count

      console.log(`Iteration: ${state.iterationCount}`);

      if (state.iterationCount > 5) {
        console.log(`Iteration limit of 5 exceeded. Terminating workflow.`);
        return {
          next: END,
          reasoning: "Iteration limit exceeded",
          summary: "Ending workflow due to iteration limit",
        };
      }

      // Track consecutive same-agent calls
      state.lastAgent = state.lastAgent || undefined;
      state.sameAgentCount = state.sameAgentCount || 0;

      if (output.next === state.lastAgent) {
        state.sameAgentCount++;
        if (state.sameAgentCount >= 3) {
          console.log(`Loop detected with agent '${output.next}'. Terminating workflow.`);
          return {
            next: END,
            reasoning: "Too many consecutive calls to the same agent",
            summary: "Ending workflow due to potential loop",
          };
        }
      } else {
        state.sameAgentCount = 0;
      }
      state.lastAgent = output.next;

      if (!output || !output.next) {
        console.log(`Invalid output received. Terminating workflow.`);
        return {
          next: END,
          reasoning: "No valid actions determined",
          summary: "Ending workflow due to invalid output",
        };
      }

      if (output.summary) {
        state.agentSummaries.push(output.summary);
      }

      return output;
    } catch (error) {
      console.error("Error in supervisor chain:", error);
      return {
        next: END,
        reasoning: "Error occurred in workflow",
        summary: "Ending workflow due to error",
      };
    }
  },
]);

export type { SupervisorState, AgentOutput };