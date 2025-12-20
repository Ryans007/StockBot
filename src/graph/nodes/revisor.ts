import { SystemMessage, HumanMessage, AIMessage } from "langchain";
import revisorAgent from "../agents/revisor.ts";
import AgentState from "../state";
import * as z from "zod";

async function revisor(state: z.infer<typeof AgentState>): Promise<z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await revisorAgent.invoke({
        messages: [
            new HumanMessage({ content: `Pergunta inicial:${state.userInput}\nResposta SQL:${state.sqlResponse}` })
        ],
    });

    return {
        ...state,
        nextAgent: response.structuredResponse.nextAgent,
        queryWeb: response.structuredResponse.queryWeb,
        revisorExplanation: response.structuredResponse.revisorExplanation,
        finalAnswer: state.sqlResponse,
        messages: messages.concat(
            [
                new AIMessage({ content: String(response.messages[response.messages.length - 1].content) })
            ]
        ),
    };
}

export default revisor;