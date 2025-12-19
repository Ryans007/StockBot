import type ConversationRepository from "../repositories/Conversation";
import { Request, Response } from "express";
import * as crypto from "crypto";
import graph from "../graph/graph";
import Conversation from "../entities/Conversation";

interface ChatRequest {
    user_message: string;
    thread_id?: string;
}

export default class ConversationController {
    constructor(private repository: ConversationRepository) { }

    async createConversation(res: Response, req: Request) {
        const { user_message, thread_id } = <ChatRequest>req.body;

        const activeThreadID = thread_id || crypto.randomUUID();

        const config = { "configurable": { "thread_id": activeThreadID } };
        const response = await graph.invoke({ "userInput": user_message }, config);

        const ai_message = response.messages[response.messages.length - 1].content;

        const conversation = new Conversation(
            activeThreadID,
            user_message,
            String(ai_message)
        )

        await this.repository.save(conversation);

        return res.status(201).json(conversation);
    }
}