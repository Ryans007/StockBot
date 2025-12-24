import RecipeRepository from "../repositories/Recipe.ts";
import { Request, Response } from "express";
import Recipe from "../entities/Recipe.ts";
import { RecipeSchema } from "../schemas/Recipe.ts";
import { ZodError } from "zod";

export default class RecipeController {
    constructor(private repository: RecipeRepository) {}
    async create(req: Request, res: Response) {
        try {
            const validatedData = RecipeSchema.parse(req.body);
            const newRecipe = new Recipe(validatedData.name, validatedData.ingredients, validatedData.preparationMethod);
            const {success, message} = await this.repository.create(newRecipe);
            if (!success) {
                return res.status(400).json(message);
            }
            return res.status(201).json(message);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json("Erro ao criar a Receita!");
            }
            return res.status(400).json(error);
        }
    }
    async list(_: Request, res: Response) {
        const itemsList = await this.repository.list();
        return res.status(200).json(itemsList);
    }
    async update(req: Request, res: Response) {
        try {
            const validatedData = RecipeSchema.parse(req.body);
            const {id} = req.params;
            const itemToUpdate = new Recipe(validatedData.name, validatedData.ingredients, validatedData.preparationMethod);
            const {success, message} = await this.repository.update(Number(id), itemToUpdate);
            if (!success) {
                return res.status(400).json(message);
            }
            return res.status(200).json(message);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json("Erro ao atualizar a Receita!");
            }
            return res.status(400).json(error);
        }
    }
    async delete(req: Request, res: Response) {
        const {id} = req.params;
        const {success, message} = await this.repository.delete(Number(id));
        if (!success) {
            return res.status(400).json(message);
        }
        return res.status(200).json(message);
    }
}