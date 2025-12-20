import { SystemMessage, HumanMessage, AIMessage } from "langchain";
import webAgent from "../agents/web.ts";
import AgentState from "../state";
import * as z from "zod";

async function web(state: z.infer<typeof AgentState>): Promise<z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await webAgent.invoke({
        messages: [
            new HumanMessage({ content: state.queryWeb })
        ],
    });

    return {
        ...state,
        finalAnswer: String(response.messages[response.messages.length - 1].content),
        messages: messages.concat(
            [
                new AIMessage({ content: String(response.messages[response.messages.length - 1].content) })
            ]
        ),
    };
}

export default web;