import ItemInterfaceRepository from "./interfaces/Item.ts";
import {Repository} from "typeorm";
import Item from "../entities/Item.ts";
import Conversation from "../entities/Conversation.ts";

export default class ItemRepository implements ItemInterfaceRepository {
    private repository: Repository<Item>;
    constructor(repository: Repository<Item>) {
        this.repository = repository;
    }
    async create(item: Item): Promise<{success: boolean; message?: string}> {
        try {
            await this.repository.save(item)
            return {
                success: true,
                message: "Item criado com sucesso!"
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao criar um Item!"
            }
        }
    }
    async list(): Promise<Item[]> {
        return await this.repository.find()
    }
    async update(id: number, item: Item): Promise<{ success: boolean; message: string }> {
        try {
            const itemToUpdate = await this.repository.findOneBy({id: id});

            if (!itemToUpdate) {
                return {
                    "success": false,
                    "message": "Nenhum Item encontrado com esse id!"
                }
            }

            itemToUpdate.id = id;
            itemToUpdate.name = item.name;
            itemToUpdate.description = item.description;
            itemToUpdate.amount = item.amount;
            itemToUpdate.price = item.price;

            await this.repository.save(itemToUpdate);

            return {
                success: true,
                message: "Item atualizado com sucesso!"
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao atualizar o Item!"
            }
        }
    }
    async delete(id: number): Promise<{ success: boolean; message: string }> {
        try {
            const itemToDelete = await this.repository.findOneBy({id: id});

            if (!itemToDelete){
                return {
                    "success": false,
                    "message": "Nenhum Item encontrado com esse id!"
                }
            }
            await this.repository.delete(id)
            return {
                success: true,
                message: "Item deletado com sucesso!"
            }

        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao deletar um Item!"
            }
        }
    }
}