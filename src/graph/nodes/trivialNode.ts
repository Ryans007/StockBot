import { SystemMessage, HumanMessage, AIMessage } from "langchain";
import  trivialAgent  from "../agents/trivialAgent";
import AgentState from "../state";
import * as z from "zod";

async function trivialNode(state: z.infer<typeof AgentState>): Promise <z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await trivialAgent.invoke({
        messages: [
            new HumanMessage({content: state.userInput})
        ],
    });

    return {
        ...state,
        finalAnswer: String(response.messages[response.messages.length - 1].content),
        messages: messages.concat(
            [
                new HumanMessage({content: state.userInput}),
                new AIMessage({content: String(response.messages[response.messages.length - 1].content)})
            ]
        ),
    };
}

export default trivialNode;