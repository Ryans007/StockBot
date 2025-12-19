import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {createAgent} from "langchain";
import {readFileSync} from "node:fs";
import {parse} from "yaml";
import dotenv from "dotenv";

dotenv.config();

const promptFile = readFileSync('./src/graph/prompts/trivial.yaml', 'utf-8')
const promptData = parse(promptFile);

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0.5,
})

const Trivial = createAgent({
    model: llm,
    tools: [],
    systemPrompt: promptData.trivial_prompt,
});

export default Trivial;