import getLLM from "../../config/llmProvider.ts"
import webTool from "../tools/webTool";
import { createAgent } from "langchain";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import dotenv from "dotenv";

dotenv.config();

const promptFile = readFileSync('./src/graph/prompts/web.yaml', 'utf-8')
const promptData = parse(promptFile);

const llm = getLLM("HIGH", 0.2)

const webAgent = createAgent({
    model: llm,
    tools: [webTool],
    systemPrompt: promptData.web_prompt,
});

export default webAgent;