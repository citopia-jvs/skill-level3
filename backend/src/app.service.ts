import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { graph } from "./workflow/workflow.js";
import { HumanMessage } from "@langchain/core/messages";
import Redis from 'ioredis';

@Injectable()
export class AppService {
  private redisClient: Redis;

  constructor() {
    // Initialize Redis client with environment variables
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',  // Use the Redis host from the environment variable
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,  // Use Redis password from environment variable
    });
  }

  async handleQuery(query: string): Promise<{
    response: string;
    reasoning: string;
    summary: string;
    processingDetails?: Record<string, any>;
  }> {
    if (!query || typeof query !== "string" || query.trim().length === 0) {
      throw new BadRequestException("Query must be a non-empty string.");
    }

    try {
      // Check if the result for this query is already cached in Redis
      const cachedResult = await this.redisClient.get(query);

      if (cachedResult) {
        // If cached, return the response from Redis
        console.log("Returning cached result from Redis.");
        return JSON.parse(cachedResult);
      }

      const streamResults = await graph.stream({
        messages: [new HumanMessage({ content: query })]
      });

      let response = "Workflow completed.";
      let reasoning = "No reasoning provided.";
      let summary = "No summary provided.";
      const processingDetails: Record<string, any>[] = [];
      let iterationCount = 0;

      for await (const output of streamResults) {
        iterationCount++;

        console.log("Supervisor State:", JSON.stringify(output, null, 2));

        // Add the current output to processing details for tracking the flow
        processingDetails.push({
          iteration: iterationCount,
          supervisorState: output
        });

        if (iterationCount > 25) {
          console.error("Recursion limit exceeded. Terminating workflow.");
          throw new Error("Recursion limit exceeded.");
        }

        // Extract and update the response details
        if (output?.messages) {
          response = output.messages[output.messages.length - 1]?.content || "No response.";
        }

        reasoning = output.reasoning || reasoning; // Keep the latest reasoning
        summary = output.summary || summary; // Keep the latest summary

        if (output.next === "__end__") {
          break; // Stop processing when the workflow ends
        }
      }

      // Store the result in Redis with a 1 hour expiration (or any suitable time)
      const result = { response, reasoning, summary, processingDetails };
      await this.redisClient.setex(query, 3600, JSON.stringify(result)); // Cache for 1 hour

      // Return the accumulated details
      return result;

    } catch (error) {
      // Provide meaningful error messages for different exceptions
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException("An error occurred while processing the query.");
    }
  }
}