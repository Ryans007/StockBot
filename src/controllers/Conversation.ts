import type ConversationRepository from "../repositories/Conversation";
import { Request, Response } from "express";
import * as crypto from "crypto";
import graph from "../graph/graph";
import Conversation from "../entities/Conversation";
import {ConversationSchema} from "../schemas/Conversation.ts";

interface ChatRequest {
    user_message: string;
    thread_id?: string;
}

export default class ConversationController {
    constructor(private repository: ConversationRepository) { };
    async createConversation(req: Request, res: Response) {
        const { user_message, thread_id } = <ChatRequest>req.body;

        const activeThreadID = thread_id || crypto.randomUUID();

        const config = { "configurable": { "thread_id": activeThreadID } };
        const response = await graph.invoke({ "userInput": user_message }, config);
        console.log(response);

        const ai_message = response.finalAnswer;

        const conversation = new Conversation(
            activeThreadID,
            user_message,
            String(ai_message)
        )

        await this.repository.save(conversation);

        return res.status(201).json(conversation);
    }
    async getMessages(_: Request, res: Response) {
        const conversationList = await this.repository.getMessages();

        return res.status(201).json(conversationList);
    }
}