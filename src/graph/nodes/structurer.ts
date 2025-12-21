import { HumanMessage } from "langchain";
import structurerAgent from "../agents/structurer.ts";
import AgentState from "../state";
import * as z from "zod";

async function structurer(state: z.infer<typeof AgentState>): Promise<z.infer<typeof AgentState>> {
    const messages = state.messages
    const response = await structurerAgent.invoke({
        messages: [
            ...messages,
            new HumanMessage({ content: state.userInput })
        ],
    });

    const recipeData = response.structuredResponse;
    const sqlInstruction = `Por favor, insira esta receita na tabela 'recipes':
Nome: ${recipeData.name}
Ingredientes: ${recipeData.ingredients}
Modo de Preparo: ${recipeData.preparationMethod}`;

    return {
        ...state,
        querySQL: sqlInstruction
    };
}

export default structurer;