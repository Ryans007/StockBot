import { HumanMessage } from "langchain";
import orchestratorAgent from "../agents/orchestrator.ts";
import AgentState from "../state";
import * as z from "zod";

async function orchestrator(state: z.infer<typeof AgentState>): Promise<z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await orchestratorAgent.invoke({
        messages: [
            ...messages,
            new HumanMessage({ content: state.userInput })
        ],
    });

    return {
        ...state,
        nextAgent: response.structuredResponse.nextAgent,
        querySQL: response.structuredResponse.querySQL || "",
        queryWeb: response.structuredResponse.queryWeb || "",
        orchestratorExplanation: response.structuredResponse.orchestrationExplanation,
        messages: [state.userInput]
    };
}

export default orchestrator;