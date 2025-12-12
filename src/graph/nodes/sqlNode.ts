import {HumanMessage} from "langchain";
import  sqlAgent  from "../agents/sqlAgent.js";
import AgentState from "../state.js";
import * as z from "zod";

async function sqlNode(state: z.infer<typeof AgentState>): Promise <z.infer<typeof AgentState>> {
    const response = await sqlAgent.invoke({
        messages: [
            new HumanMessage({content: state.userInput})
        ],
    });

    return {
        ...state,
        sqlResponse: String(response.messages[response.messages.length - 1].content),
    };
}

export default sqlNode;