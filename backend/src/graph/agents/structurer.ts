import { StructurerOutputSchema } from "../schemas/structurer.ts";
import getLLM from "../../config/llmProvider.ts"
import { createAgent } from "langchain";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import dotenv from "dotenv";

dotenv.config();

const promptFile = readFileSync('./src/graph/prompts/structurer.yaml', 'utf-8')
const promptData = parse(promptFile);

const llm = getLLM("HIGH", 0.3)

const structurerAgent = createAgent({
    model: llm,
    tools: [],
    systemPrompt: promptData.structurer_prompt,
    responseFormat: StructurerOutputSchema
});

export default structurerAgent;