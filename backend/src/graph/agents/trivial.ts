import getLLM from "../../config/llmProvider.ts"
import { createAgent } from "langchain";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import dotenv from "dotenv";

dotenv.config();

const promptFile = readFileSync('./src/graph/prompts/trivial.yaml', 'utf-8')
const promptData = parse(promptFile);

const llm = getLLM("LOW", 0.5)

const trivialAgent = createAgent({
    model: llm,
    tools: [],
    systemPrompt: promptData.trivial_prompt,
});

export default trivialAgent;