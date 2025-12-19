import {SystemMessage, HumanMessage, AIMessage} from "langchain";
import  web  from "../agents/web.ts";
import AgentState from "../state";
import * as z from "zod";

async function web(state: z.infer<typeof AgentState>): Promise <z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await web.invoke({
        messages: [
            new HumanMessage({content: state.userInput})
        ],
    });

    return {
        ...state,
        nextAgent: String(response.messages[response.messages.length - 1].content),
        messages: messages.concat(
            [
                new HumanMessage({content: state.userInput}),
                new AIMessage({content: String(response.messages[response.messages.length - 1].content)})
            ]
        ),
    };
}

export default web;