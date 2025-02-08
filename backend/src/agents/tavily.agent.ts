import { RunnableConfig } from "@langchain/core/runnables";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { SystemMessage } from "@langchain/core/messages";
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { ExtendedChatMistralAI } from "./supervisor.agent.js";
import { AgentState } from "../state/agent.state.js";
import { HumanMessage } from "@langchain/core/messages";
import { END } from "@langchain/langgraph";

const researcherLLM = new ExtendedChatMistralAI({
  modelName: "mistral-tiny",
  temperature: 0,
  maxTokens: 512,
  apiKey: process.env.MISTRAL_API_KEY,
});

const tavilyApiKey = process.env.TAVILY_API_KEY;
if (!tavilyApiKey) {
  throw new Error("❌ Missing Tavily API Key. Set TAVILY_API_KEY in .env");
}

const tavilyTool = new TavilySearchResults({
  apiKey: tavilyApiKey,
  maxResults: 5,
});

const systemPrompt = `
You are a web researcher specializing in finding accurate and relevant information.
Your responsibilities include:
1. Using the Tavily search engine to find specific information
2. Extracting key details
3. Providing clear, concise summaries of your findings
4. Ensuring information is current and from reliable sources
`;

const tavilyAgent = createReactAgent({
  llm: researcherLLM,
  tools: [tavilyTool],
  stateModifier: new SystemMessage(systemPrompt)
});

let attempts = 0;
const MAX_ATTEMPTS = 5;

export const tavilyNode = async (
  state: typeof AgentState.State,
  config?: RunnableConfig,
) => {
  try {
    attempts++;

    if (attempts > MAX_ATTEMPTS) {
      console.log(`Researcher: Maximum attempts (${MAX_ATTEMPTS}) reached`);
      return {
        messages: [
          new HumanMessage({
            content: "Maximum attempts reached. Unable to retrieve details.",
          }),
        ],
        next: END,
      };
    }

    console.log(`Researcher: Attempt ${attempts} of ${MAX_ATTEMPTS}`);

    const result = await tavilyAgent.invoke(state, config);
    const lastMessage = result.messages[result.messages.length - 1];

    if (!lastMessage) {
      throw new Error("No response received from Tavily agent");
    }

    const content = lastMessage.content as string;
    if (content && !content.includes("Unable to retrieve")) {
      attempts = 0;
    }

    return {
      messages: [
        new HumanMessage({
          content: content,
        }),
      ],
    };

  } catch (error) {
    console.error("Researcher node error:", error);
    return {
      messages: [
        new HumanMessage({
          content: "An error occurred while researching. Please try again.",
        }),
      ],
      next: attempts >= MAX_ATTEMPTS ? END : undefined,
    };
  }
};

export { tavilyTool, MAX_ATTEMPTS };