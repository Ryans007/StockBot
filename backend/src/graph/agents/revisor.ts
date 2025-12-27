import { RevisorOutputSchema } from "../schemas/revisor.ts";
import getLLM from "../../config/llmProvider.ts"
import { createAgent } from "langchain";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import dotenv from "dotenv";

dotenv.config();

const promptFile = readFileSync('./src/graph/prompts/revisor.yaml', 'utf-8')
const promptData = parse(promptFile);

const llm = getLLM("HIGH", 0.3)

const revisorAgent = createAgent({
    model: llm,
    tools: [],
    systemPrompt: promptData.revisor_prompt,
    responseFormat: RevisorOutputSchema
});

export default revisorAgent;