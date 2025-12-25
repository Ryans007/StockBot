import { HumanMessage } from "langchain";
import sqlAgent from "../agents/sql.ts";
import AgentState from "../state";
import * as z from "zod";

async function sql(state: z.infer<typeof AgentState>): Promise<z.infer<typeof AgentState>> {
    const response = await sqlAgent.invoke({
        messages: [
            new HumanMessage({ content: state.querySQL })
        ],
    });
    return {
        ...state,
        sqlResponse: String(response.messages[response.messages.length - 1].content),
    };
}

export default sql;