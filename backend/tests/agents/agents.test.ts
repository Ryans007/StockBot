import graph from "../../src/graph/graph"
import { AppDataSource } from "../../src/config/dataSource"
import * as crypto from "crypto"

describe("Graph Agent Routing", () => {
    let threadId: string

    beforeAll(async () => {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
        }
    })

    afterAll(async () => {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy()
        }
    })

    beforeEach(() => {
        threadId = crypto.randomUUID()
    })

    describe("Roteamento de Agentes", () => {
        it("deve rotear saudação para o agente TRIVIAL", async () => {
            const config = { "configurable": { "thread_id": threadId } }
            const response = await graph.invoke({ "userInput": "Oi, tudo bem?" }, config)

            expect(response.nextAgent).toBe("TRIVIAL")
            expect(response.finalAnswer).toBeDefined()
            expect(response.finalAnswer.length).toBeGreaterThan(0)
        }, 300000)

        it("deve rotear consulta de estoque para o agente SQL", async () => {
            const config = { "configurable": { "thread_id": threadId } }
            const response = await graph.invoke({ "userInput": "Quantos ovos tenho no estoque?" }, config)

            expect(response.nextAgent).toBe("FINALIZAR")
            expect(response.querySQL).toBeDefined()
            expect(response.querySQL.length).toBeGreaterThan(0)
            expect(response.finalAnswer).toBeDefined()
        }, 300000)

        it("deve rotear busca na internet para o agente WEB", async () => {
            const config = { "configurable": { "thread_id": threadId } }
            const response = await graph.invoke({
                "userInput": "Pesquise na internet uma receita de lasanha"
            }, config)

            expect(response.nextAgent).toBe("WEB")
            expect(response.queryWeb).toBeDefined()
            expect(response.queryWeb.length).toBeGreaterThan(0)
            expect(response.finalAnswer).toBeDefined()
        }, 300000)
    })
})