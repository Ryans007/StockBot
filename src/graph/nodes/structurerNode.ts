import { HumanMessage } from "langchain";
import  structurerAgent  from "../agents/structurerAgent.js";
import AgentState from "../state.js";
import * as z from "zod";

async function structurerNode(state: z.infer<typeof AgentState>): Promise <z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await structurerAgent.invoke({
        messages: [
            new HumanMessage({content: `Histórico:\n ${state.userInput}`})
        ],
    });

    const sqlInstruction = `Por favor, insira estas receitas na tabela 'recipes:\n${response.structuredResponse}`

    return {
        ...state,
        userInput: sqlInstruction,
        messages: messages.concat([new HumanMessage(sqlInstruction)]),
    };
}

export default structurerNode;