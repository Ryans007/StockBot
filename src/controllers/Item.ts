import ItemRepository from "../repositories/Item.ts";
import {Request, Response} from "express";
import Item from "../entities/Item.ts";

export default class ItemController {
    constructor(private repository: ItemRepository) {}
    async create(req: Request, res: Response) {
        const {name, description, price, amount} = <Item> req.body;

        const newItem = new Item(name, description, price, amount)

        const {success, message} = await this.repository.create(newItem);

        if (!success) {
            return res.status(401).json(message);
        }
        return res.status(201).json(message);
    }
    async list(req: Request, res: Response) {
        const itemsList = await this.repository.list();

        return res.status(201).json(itemsList);
    }
    async update(req: Request, res: Response) {
        const {name, description, price, amount} = <Item> req.body;
        const {id} = req.params;

        const itemToUpdate = new Item(name, description, price, amount)

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