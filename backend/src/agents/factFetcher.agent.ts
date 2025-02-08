import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatMistralAI } from "@langchain/mistralai";

const search = new TavilySearchResults({
  apiKey: process.env.TAVILY_API_KEY!,
});

export const factFetcherNode = async (state: { birthday: string }) => {
  console.log(`📅 Fetching fun facts for: ${state.birthday}`);

  // Search for birthday-related facts
  const searchResults = await search.invoke(`fun facts about ${state.birthday}`);

  // Summarize the results using Mistral AI
  const llm = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY!,
    modelName: "mistral-medium",
    temperature: 0.7,
  });

  const response = await llm.invoke([
    {
      role: "system",
      content: `Here are some fun facts about ${state.birthday}:\n${searchResults
        .map((r: { content: string }) => r.content)
        .join("\n")}\n\nSummarize these in an engaging way.`,
    },
  ]);

  return { facts: response.content };
};
