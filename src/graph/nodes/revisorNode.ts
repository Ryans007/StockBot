import { SystemMessage, HumanMessage } from "langchain";
import  revisorAgent  from "../agents/revisorAgent.js";
import AgentState from "../state.js";
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