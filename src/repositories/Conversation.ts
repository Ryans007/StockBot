import { ConversationInterfaceRepository } from "./interfaces/Conversation.ts";
import Conversation from "../entities/Conversation.ts";
import { Repository } from "typeorm";

export default class ConversationRepository implements ConversationInterfaceRepository {
    private repository: Repository<Conversation>;
    constructor(repository: Repository<Conversation>) {
        this.repository = repository;
    }
    async save(conversation: Conversation): Promise<Conversation> {
        return await this.repository.save(conversation);
    }
    async getMessages(): Promise<Conversation[]> {
        return await this.repository.find();
    }
}