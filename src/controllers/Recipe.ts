import RecipeRepository from "../repositories/Recipe.ts";
import {Request, Response} from "express";
import Recipe from "../entities/Recipe.ts";

export default class RecipeController {
    constructor(private repository: RecipeRepository) {}
    async create(req: Request, res: Response) {
        const {name, ingredients, preparationMethod} = <Recipe> req.body;

        const newRecipe = new Recipe(name, ingredients, preparationMethod)

        const {success, message} = await this.repository.create(newRecipe);

        if (!success) {
            return res.status(401).json(message);
        }
        return res.status(201).json(message);
    }
    async list(_: Request, res: Response) {
        const itemsList = await this.repository.list();

        return res.status(201).json(itemsList);
    }
    async update(req: Request, res: Response) {
        const {name, ingredients, preparationMethod} = <Recipe> req.body;
        const {id} = req.params;

        const itemToUpdate = new Recipe(name, ingredients, preparationMethod)

        const {success, message} = await this.repository.update(Number(id), itemToUpdate);

        if (!success) {
            return res.status(401).json(message);
        }
        return res.status(201).json(message);
    }
    async delete(req: Request, res: Response) {
        const {id} = req.params;

        const {success, message} = await this.repository.delete(Number(id));

        if (!success) {
            return res.status(401).json(message);
        }
        return res.status(201).json(message);
    }
}