import {tool} from "@langchain/core/tools";
import {z} from "zod";
import RecipeEntity from "../../entities/RecipeEntity";
import {AppDataSource} from "../../config/dataSource";

const toAddRecipeTool = tool(
  async (input: { name: string; ingredients: string; preparationMethod: string } ) => {
    try {
        const recipeRepository = AppDataSource.getRepository(RecipeEntity);

        const newRecipe = new RecipeEntity(
            input.name,
            input.ingredients,
            input.preparationMethod
        );

        await recipeRepository.save(newRecipe);

        return `Receita "${input.name}" adicionada com sucesso!`;
    } catch (error) {
        return "Ocorreu um erro ao adicionar a receita.";
    }
  },
    {
        name: "toAddRecipeTool",
        description: "Adiciona uma nova receita ao banco de dados. Use esta ferramenta quando quiser salvar uma receita com nome, ingredientes e método de preparação.",
        schema: z.object({
            name: z.string().describe("O nome da receita"),
            ingredients: z.string().describe("Os ingredientes necessários para a receita"),
            preparationMethod: z.string().describe("O modo de preparo da receita"),
        }),
    }
)

export default toAddRecipeTool;
