import express from "express";
import { AppDataSource } from "../config/dataSource";
import Conversation from "../entities/Conversation";
import ConversationRepository from "../repositories/Conversation";
import ConversationController from "../controllers/Conversation";

const router = express.Router();

const typeOrmRepository = AppDataSource.getRepository(Conversation);
const conversationRepository = new ConversationRepository(typeOrmRepository);
const conversationController = new ConversationController(conversationRepository);

router.post("/send_message", (req, res) => conversationController.createConversation(req, res));

export default router;



