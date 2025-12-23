import request from "supertest"
import app from "../../src/app"
import { AppDataSource } from "../../src/config/dataSource";

describe("Items API", () => {
    let createdItemId: number;

    beforeAll(async () => {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
    })
    afterAll(async () => {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    })

    describe("POST /items", () => {
        it("deve criar um novo item com sucesso", async () => {
            const newItem = {
                name: "Milho verde",
                description: "Descrição do Milho Verde",
                price: 26.75,
                amount: 100
            }

            const response = await request(app)
                .post("/items")
                .send(newItem)
                .expect(201)

            expect(response.body).toBe("Item criado com sucesso!")
        })

        it("tentar criar um novo item faltando um campo obrigatório", async () => {
            const newItem = {
                description: "Descrição do Milho Verde",
                price: 26.75,
                amount: 100
            }

            const response = await request(app)
                .post("/items")
                .send(newItem)
                .expect(401)

            expect(response.body).toBe("Erro ao criar um Item!")
        })

        it("tentar criar um novo item passando uma string ao invés de number no campo amount", async () => {
            const newItem = {
                description: "Descrição do Milho Verde",
                price: 26.75,
                amount: "100"
            }

            const response = await request(app)
                .post("/items")
                .send(newItem)
                .expect(401)

            expect(response.body).toBe("Erro ao criar um Item!")
        })

        it("tentar criar um novo item passando uma string ao invés de number no campo price", async () => {
            const newItem = {
                name: "Arroz",
                description: "Descrição do Arroz",
                price: "Quinze e Cinquenta",
                amount: 50
            }

            const response = await request(app)
                .post("/items")
                .send(newItem)
                .expect(401)

            expect(response.body).toBe("Erro ao criar um Item!")
        })
    })

    describe("GET /items", () => {
        beforeAll(async () => {
            const newItem = {
                name: "Feijão",
                description: "Descrição do Feijão",
                price: 8.50,
                amount: 200
            }
            await request(app).post("/items").send(newItem)
        })

        it("deve listar todos os items com sucesso", async () => {
            const response = await request(app)
                .get("/items")
                .expect(201)

            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })

        it("deve retornar items com a estrutura correta", async () => {
            const response = await request(app)
                .get("/items")
                .expect(201)

            const item = response.body[0]
            expect(item).toHaveProperty("id")
            expect(item).toHaveProperty("name")
            expect(item).toHaveProperty("description")
            expect(item).toHaveProperty("price")
            expect(item).toHaveProperty("amount")
        })
    })

    describe("PUT /items/:id", () => {
        beforeAll(async () => {
            const newItem = {
                name: "Açúcar",
                description: "Descrição do Açúcar",
                price: 5.00,
                amount: 150
            }
            const createResponse = await request(app).post("/items").send(newItem)
            const listResponse = await request(app).get("/items")
            const createdItem = listResponse.body.find((item: any) => item.name === "Açúcar")
            createdItemId = createdItem.id
        })

        it("deve atualizar um item existente com sucesso", async () => {
            const updatedItem = {
                name: "Açúcar Refinado",
                description: "Descrição do Açúcar Refinado",
                price: 6.50,
                amount: 180
            }

            const response = await request(app)
                .put(`/items/${createdItemId}`)
                .send(updatedItem)
                .expect(201)

            expect(response.body).toBe("Item atualizado com sucesso!")
        })

        it("deve atualizar apenas alguns campos do item", async () => {
            const partialUpdate = {
                name: "Açúcar Cristal",
                description: "Descrição do Açúcar Cristal",
                price: 7.00,
                amount: 200
            }

            const response = await request(app)
                .put(`/items/${createdItemId}`)
                .send(partialUpdate)
                .expect(201)

            expect(response.body).toBe("Item atualizado com sucesso!")
        })

        it("tentar atualizar um item com id inexistente", async () => {
            const updatedItem = {
                name: "Item Inexistente",
                description: "Descrição",
                price: 10.00,
                amount: 50
            }

            const response = await request(app)
                .put("/items/999999")
                .send(updatedItem)
                .expect(401)

            expect(response.body).toBe("Nenhum Item encontrado com esse id!")
        })

        it("tentar atualizar um item passando tipo inválido no campo price", async () => {
            const invalidUpdate = {
                name: "Açúcar",
                description: "Descrição",
                price: "preço inválido",
                amount: 100
            }

            const response = await request(app)
                .put(`/items/${createdItemId}`)
                .send(invalidUpdate)
                .expect(401)

            expect(response.body).toBe("Erro ao atualizar o Item!")
        })
    })

    describe("DELETE /items/:id", () => {
        let itemToDeleteId: number;

        beforeEach(async () => {
            const newItem = {
                name: "Item Temporário",
                description: "Descrição do Item Temporário",
                price: 3.00,
                amount: 10
            }
            await request(app).post("/items").send(newItem)

            const listResponse = await request(app).get("/items")
            const createdItem = listResponse.body.find((item: any) => item.name === "Item Temporário")
            itemToDeleteId = createdItem.id
        })

        it("deve deletar um item existente com sucesso", async () => {
            const response = await request(app)
                .delete(`/items/${itemToDeleteId}`)
                .expect(201)

            expect(response.body).toBe("Item deletado com sucesso!")
        })

        it("deve confirmar que o item foi realmente deletado", async () => {
            await request(app).delete(`/items/${itemToDeleteId}`)

            const listResponse = await request(app).get("/items")
            const deletedItem = listResponse.body.find((item: any) => item.id === itemToDeleteId)

            expect(deletedItem).toBeUndefined()
        })

        it("tentar deletar um item com id inexistente", async () => {
            const response = await request(app)
                .delete("/items/999999")
                .expect(201)

            expect(response.body).toBe("Item deletado com sucesso!")
        })

        it("tentar deletar um item com id inválido (string)", async () => {
            const response = await request(app)
                .delete("/items/invalid-id")
                .expect(201)

            expect(response.body).toBe("Item deletado com sucesso!")
        })
    })
})