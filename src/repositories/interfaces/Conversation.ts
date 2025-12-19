import Conversation from "../../entities/Conversation.ts";

export interface ConversationInterfaceRepository {
    save(assistant: Conversation): Promise<Conversation>;
    getMessages(): Promise<void>;
}