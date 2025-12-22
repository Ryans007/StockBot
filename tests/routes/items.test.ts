import request from "supertest"
import app from "../../src/app"
import { AppDataSource } from "../../src/config/dataSource";
import Item from "../../src/entities/Item";

describe("Items API", () => {
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
    describe("POST /items", () =>{
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
    })
})