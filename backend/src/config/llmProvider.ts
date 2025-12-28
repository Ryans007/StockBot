import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import "dotenv/config";

function getLLM(model: string, temperature: number): BaseChatModel {
    const provider = process.env.PROVIDER?.toUpperCase();
    switch (provider) {
        case "GOOGLE":
            return new ChatGoogleGenerativeAI({
                    model: model === "HIGH"? "gemini-2.5-pro" : "gemini-2.5-flash",
                    temperature: temperature
                }
            );
        case "OPENAI":
            return new ChatOpenAI({
                    model: model === "HIGH"? "gpt-4o" : "gpt-4o-mini",
                    temperature: temperature
                }
            );
        case "ANTHROPIC":
            return new ChatAnthropic({
                    model: model === "HIGH"? "claude-sonnet-4-5" : "claude-haiku-4-5",
                    temperature: temperature
                }
            );
        default:
            throw new Error(`Provedor '${provider}' não suportado ou não definido no .env`);
    }
}

export default getLLM;