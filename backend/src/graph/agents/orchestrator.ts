import { OrchestratorOutputSchema } from "../schemas/orchestrator.ts";
import getLLM from "../../config/llmProvider.ts"
import { createAgent } from "langchain";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import dotenv from "dotenv";

dotenv.config();

const promptFile = readFileSync('./src/graph/prompts/orchestrator.yaml', 'utf-8')
const promptData = parse(promptFile);

const llm = getLLM("HIGH", 0.5)

const orchestratorAgent = createAgent({
    model: llm,
    tools: [],
    systemPrompt: promptData.orchestrator_prompt,
    responseFormat: OrchestratorOutputSchema
});

export default orchestratorAgent;