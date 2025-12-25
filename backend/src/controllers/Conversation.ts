import type ConversationRepository from "../repositories/Conversation";
import { Request, Response } from "express";
import * as crypto from "crypto";
import graph from "../graph/graph";
import Conversation from "../entities/Conversation";
import { ConversationSchema } from "../schemas/Conversation.ts";

export default class ConversationController {
    constructor(private repository: ConversationRepository) { };
    async createConversation(req: Request, res: Response) {
        try {
            const validatedData = ConversationSchema.parse(req.body);
            const activeThreadID = validatedData.thread_id || crypto.randomUUID();
            const config = { "configurable": { "thread_id": activeThreadID } };
            const response = await graph.invoke({ "userInput": validatedData.user_message }, config);
            const ai_message = response.finalAnswer;
            const conversation = new Conversation(
                activeThreadID,
                validatedData.user_message,
                String(ai_message)
            )
            await this.repository.save(conversation);
            return res.status(201).json(conversation);
        } catch (error){
            return res.status(400).json("Erro ao enviar mensagem para o assistente!")
        }
    }
    async getMessages(_: Request, res: Response) {
        const conversationList = await this.repository.getMessages();
        return res.status(200).json(conversationList);
    }
}