import {SystemMessage, HumanMessage, AIMessage} from "langchain";
import  webAgent  from "../agents/webAgent.js";
import AgentState from "../state.js";
import * as z from "zod";

async function webNode(state: z.infer<typeof AgentState>): Promise <z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await webAgent.invoke({
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

export default webNode;