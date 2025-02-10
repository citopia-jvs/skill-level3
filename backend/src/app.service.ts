import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { graph } from "./workflow/workflow.js";
import { HumanMessage } from "@langchain/core/messages";

@Injectable()
export class AppService {
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

      // Return the accumulated details
      return { response, reasoning, summary, processingDetails };
    } catch (error) {


      // Provide meaningful error messages for different exceptions
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException("An error occurred while processing the query.");
    }
  }
}