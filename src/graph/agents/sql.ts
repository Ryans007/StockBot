import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { sqlTools } from "../tools/sqlTools";
import { createAgent } from "langchain";
import { readFileSync } from 'fs';
import { parse } from "yaml";
import dotenv from "dotenv";

dotenv.config();

const promptFile = readFileSync('./src/graph/prompts/sql.yaml', 'utf-8');
const promptData = parse(promptFile);

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0,
});

const allTools = [
    ...sqlTools
];

const systemPrompt = promptData.sql_prompt;

const sqlAgent = createAgent({
    model: llm,
    tools: allTools,
    systemPrompt: promptData.sql_prompt,
});

export default sqlAgent;