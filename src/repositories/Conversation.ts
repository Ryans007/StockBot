import {AssistantInterfaceRepository} from "./interfaces/Conversation.ts";
import Conversation from "../entities/Conversation.ts";
import {Repository} from "typeorm";

export class AssistantRepository implements AssistantInterfaceRepository {
    private repository: Repository<Conversation>;

    constructor(repository: Repository<Conversation>) {
        this.repository = repository;
    }

    async save(assistant: Conversation): Promise<Conversation> {
        return await this.repository.save(assistant);
    }

    async getMessages(): Promise<void> {
        const assistant = await this.repository.find()
    }
}