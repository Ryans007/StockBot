import { StateGraph, MemorySaver} from "@langchain/langgraph"
import orchestratorNode from "./nodes/orchestratorNode";
import trivialNode from "./nodes/trivialNode";
import structurerNode from "./nodes/structurerNode";
import revisorNode from "./nodes/revisorNode";
import webNode from "./nodes/webNode";
import sqlNode from "./nodes/sqlNode";
import AgentState from "./state";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const workflow = new StateGraph(AgentState)
    .addNode("Orchestrator", orchestratorNode)
    .addNode("Structurer", structurerNode)
    .addNode("Trivial", trivialNode)
    .addNode("Sql", sqlNode)
    .addNode("Revisor", revisorNode)
    .addNode("Web", webNode)
    .addEdge("__start__", "Orchestrator")
    .addConditionalEdges(
        "Orchestrator",
        (state) => state.nextAgent,
        {
            "TRIVIAL": "Trivial",
            "SQL": "Sql",
            "WEB": "Web",
            "SAVE_RECIPE": "Structurer"
        }
    )
    .addEdge("Structurer", "Sql")
    .addEdge("Sql", "Revisor")
    .addConditionalEdges(
        "Revisor",
        (state) => state.nextAgent,
        {
            "FINALIZAR": "__end__",
            "WEB": "Web"
        }
    )
    .addEdge("Web", "__end__")
    .addEdge("Trivial", "__end__");

const graph = workflow.compile({checkpointer: new MemorySaver()});


// const drawableGraph = await graph.getGraphAsync();
// const image = await drawableGraph.drawMermaidPng();
// const imageBuffer = new Uint8Array(await image.arrayBuffer());
// const assetsDir = path.join("src", "assets");
// await fs.mkdir(assetsDir, { recursive: true });
// await fs.writeFile(path.join(assetsDir, "graph.png"), imageBuffer);

export default graph;