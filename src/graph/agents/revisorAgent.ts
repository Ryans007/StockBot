import {RevisorOutputSchema} from "../schemas/revisorSquema.js";
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {createAgent} from "langchain";
import {readFileSync} from "node:fs";
import {parse} from "yaml";
import dotenv from "dotenv";

dotenv.config();

const promptFile = readFileSync('./src/prompts/revisor.yaml', 'utf-8')
const promptData = parse(promptFile);

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0.3,
})

const StructurerAgent = createAgent({
    model: llm,
    tools: [],
    systemPrompt: promptData.revisor_prompt,
    responseFormat: RevisorOutputSchema
});

export default StructurerAgent;