import Conversation from "../../entities/Conversation.ts";

export interface AssistantInterfaceRepository {
    save(assistant: Conversation): Promise<Conversation>;
    getMessages(): Promise<void>;
}