import { TavilySearch } from "@langchain/tavily";
import dotenv from "dotenv";

dotenv.config();

const webTool = new TavilySearch({
    maxResults: 5,
    searchDepth: "basic",
});

export default webTool;