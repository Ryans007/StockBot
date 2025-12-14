import {StructurerOutputSchema} from "../schemas/structurerSquema";
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {createAgent} from "langchain";
import {readFileSync} from "node:fs";
import {parse} from "yaml";
import dotenv from "dotenv";

dotenv.config();

const promptFile = readFileSync('./src/graph/prompts/structurer.yaml', 'utf-8')
const promptData = parse(promptFile);

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0.3,
})

const StructurerAgent = createAgent({
    model: llm,
    tools: [],
    systemPrompt: promptData.structurer_prompt,
    responseFormat: StructurerOutputSchema
});

export default StructurerAgent;