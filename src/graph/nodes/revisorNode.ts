import { SystemMessage, HumanMessage } from "langchain";
import  revisorAgent  from "../agents/revisorAgent";
import AgentState from "../state";
import * as z from "zod";

async function revisorNode(state: z.infer<typeof AgentState>): Promise <z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await revisorAgent.invoke({
        messages: [
            new HumanMessage({content: `Pergunta inicial:${state.userInput}\nResposta SQL:${state.sqlResponse}`})
        ],
    });

    return {
        ...state,
        nextAgent: response.structuredResponse.nextAgent,
        userInput: response.structuredResponse.queryWeb,
        finalAnswer: state.sqlResponse,
    };
}

export default revisorNode;