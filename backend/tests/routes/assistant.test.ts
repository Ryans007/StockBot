import request from "supertest"
import app from "../../src/app"
import { AppDataSource } from "../../src/config/dataSource"

describe("Assistant API", () => {
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

    describe("POST /assistant/send_message", () => {
        it("deve enviar uma mensagem e receber resposta com sucesso", async () => {
            const message = {
                user_message: "Oi, tudo bem?"
            }

            const response = await request(app)
                .post("/assistant/send_message")
                .send(message)

            expect(response.body).toHaveProperty("thread_id")
            expect(response.body).toHaveProperty("user_message")
            expect(response.body).toHaveProperty("ai_message")
            expect(response.body.user_message).toBe("Oi, tudo bem?")
            expect(response.body.ai_message).toBeDefined()
            expect(response.body.ai_message.length).toBeGreaterThan(0)

            threadId = response.body.threadId
        }, 60000)

        it("tentar enviar mensagem sem o campo obrigatório user_message", async () => {
            const message = {
                thread_id: "test-thread"
            }

            const response = await request(app)
                .post("/assistant/send_message")
                .send(message)
                .expect(400)

            expect(response.body).toBe("Erro ao enviar mensagem para o assistente!")
        })

        it("tentar enviar mensagem com user_message vazio", async () => {
            const message = {
                user_message: ""
            }

            const response = await request(app)
                .post("/assistant/send_message")
                .send(message)
                .expect(400)

            expect(response.body).toBe("Erro ao enviar mensagem para o assistente!")
        }, 60000)

        it("tentar enviar mensagem com tipo inválido no campo user_message", async () => {
            const message = {
                user_message: 12345
            }

            const response = await request(app)
                .post("/assistant/send_message")
                .send(message)
                .expect(400)

            expect(response.body).toBe("Erro ao enviar mensagem para o assistente!")
        })

        it("tentar enviar mensagem com tipo inválido no campo thread_id", async () => {
            const message = {
                user_message: "Olá",
                thread_id: 12345
            }

            const response = await request(app)
                .post("/assistant/send_message")
                .send(message)
                .expect(400)

            expect(response.body).toBe("Erro ao enviar mensagem para o assistente!")
        })

        it("deve criar novo thread_id quando não fornecido", async () => {
            const message1 = {
                user_message: "Primeira mensagem"
            }

            const response1 = await request(app)
                .post("/assistant/send_message")
                .send(message1)
                .expect(201)

            const message2 = {
                user_message: "Segunda mensagem"
            }

            const response2 = await request(app)
                .post("/assistant/send_message")
                .send(message2)
                .expect(201)

            expect(response1.body.thread_id).toBeDefined()
            expect(response2.body.thread_id).toBeDefined()
            expect(response1.body.thread_id).not.toBe(response2.body.thread_id)
        }, 120000)
    })

    describe("GET /assistant/history", () => {
        beforeAll(async () => {
            const message = {
                user_message: "Mensagem para histórico"
            }
            await request(app).post("/assistant/send_message").send(message)
        }, 60000)

        it("deve retornar o histórico de conversas com sucesso", async () => {
            const response = await request(app)
                .get("/assistant/history")
                .expect(200)

            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })

        it("deve retornar conversas com a estrutura correta", async () => {
            const response = await request(app)
                .get("/assistant/history")
                .expect(200)

            const conversation = response.body[0]
            expect(conversation).toHaveProperty("id")
            expect(conversation).toHaveProperty("thread_id")
            expect(conversation).toHaveProperty("user_message")
            expect(conversation).toHaveProperty("ai_message")
        })
    })
})