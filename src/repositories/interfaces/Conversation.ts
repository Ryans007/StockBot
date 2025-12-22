import Conversation from "../../entities/Conversation.ts";

export interface ConversationInterfaceRepository {
    save(assistant: Conversation): Promise<Conversation>;
    getMessages(): Array<Conversation> | Promise<Conversation[]>;
}