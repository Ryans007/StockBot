import ItemRepository from "../repositories/Item.ts";
import { Request, Response } from "express";
import Item from "../entities/Item.ts";
import { ItemSchema } from "../schemas/Item.ts";
import { ZodError} from "zod";

export default class ItemController {
    constructor(private repository: ItemRepository) { }
    async create(req: Request, res: Response) {
        try {
            const validatedData = ItemSchema.parse(req.body);
            const newItem = new Item(validatedData.name, validatedData.description, validatedData.price, validatedData.amount)
            const { success, message } = await this.repository.create(newItem);
            if (!success) {
                return res.status(401).json(message);
            }
            return res.status(201).json(message);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json("Erro ao criar um Item!")
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
            const validatedData = ItemSchema.parse(req.body);
            const { id } = req.params;
            const itemToUpdate = new Item(validatedData.name, validatedData.description, validatedData.price, validatedData.amount)
            const { success, message } = await this.repository.update(Number(id), itemToUpdate);
            if (!success) {
                return res.status(401).json(message);
            }
            return res.status(201).json(message);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json("Erro ao atualizar o Item!")
            }
            return res.status(400).json(error);
        }
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.delete(Number(id));

        if (!success) {
            return res.status(400).json(message);
        }
        return res.status(200).json(message);
    }
}