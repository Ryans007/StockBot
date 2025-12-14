import { HumanMessage } from "langchain";
import  orchestratorAgent  from "../agents/orchestratorAgent";
import AgentState from "../state";
import * as z from "zod";

async function orchestratorNode(state: z.infer<typeof AgentState>): Promise <z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await orchestratorAgent.invoke({
        messages: [
            new HumanMessage({content: state.userInput})
        ],
    });

    return {
        ...state,
        nextAgent: response.structuredResponse.nextAgent,
        orchestratorExplanation: response.structuredResponse.orchestrationExplanation,
        messages: messages.concat([new HumanMessage({content: state.userInput})]),
    };
}

export default orchestratorNode;