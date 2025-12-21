import { SystemMessage, HumanMessage, AIMessage } from "langchain";
import trivialAgent from "../agents/trivial.ts";
import AgentState from "../state";
import * as z from "zod";

async function trivial(state: z.infer<typeof AgentState>): Promise<z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await trivialAgent.invoke({
        messages: [
            new HumanMessage({ content: state.userInput })
        ],
    });

    return {
        ...state,
        finalAnswer: String(response.messages[response.messages.length - 1].content),
        messages:
            [
                state.userInput,
                String(response.messages[response.messages.length - 1].content)
            ]
    };
}

export default trivial;