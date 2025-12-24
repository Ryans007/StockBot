import Recipe from "../entities/Recipe.ts";
import RecipeInterfaceRepository from "./interfaces/Recipe.ts";
import {Repository} from "typeorm";
import Conversation from "../entities/Conversation.ts";

export default class RecipeRepository implements RecipeInterfaceRepository {
    private repository: Repository<Recipe>
    constructor(repository: Repository<Recipe>) {
        this.repository = repository
    }
    async create(recipe: Recipe): Promise<{ success: boolean; message: string }> {
        try {
            await this.repository.save(recipe);
            return {
                success: true,
                message: "Receita criada com sucesso!"
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao criar uma Receita!"
            }
        }
    }
    async list(): Promise<Recipe[]> {
        return await this.repository.find()
    }
    async update(id: number, recipe: Recipe): Promise<{ success: boolean; message: string }> {
        try {
            const recipeToUpdate = await this.repository.findOneBy({id: id});
            if (!recipeToUpdate) {
                return {
                    success: false,
                    message: "Receita com esse id não encontrada!"
                }
            }

            recipeToUpdate.id = id;
            recipeToUpdate.name = recipe.name;
            recipeToUpdate.ingredients = recipe.ingredients;
            recipeToUpdate.preparationMethod = recipe.preparationMethod;

            await this.repository.save(recipeToUpdate);

            return {
                success: true,
                message: "Receita atualizada com sucesso!"
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao atualizar a Receita!"
            }
        }
    }
    async delete(id: number): Promise<{ success: boolean; message: string }> {
        try {
            await this.repository.delete(id);

            return {
                success: true,
                message: "Receita deletada com sucesso!"
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao apagar a receita!"
            }
        }
    }

}