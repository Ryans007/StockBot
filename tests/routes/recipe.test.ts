import request from "supertest"
import app from "../../src/app"
import { AppDataSource } from "../../src/config/dataSource";

describe("Recipes API", () => {
    let createdRecipeId: number;

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

    describe("POST /recipes", () => {
        it("deve criar uma nova receita com sucesso", async () => {
            const newRecipe = {
                name: "Bolo de Chocolate",
                ingredients: "Farinha, ovos, chocolate, açúcar, leite",
                preparationMethod: "Misture todos os ingredientes e asse por 40 minutos a 180°C"
            }

            const response = await request(app)
                .post("/recipes")
                .send(newRecipe)
                .expect(201)

            expect(response.body).toBe("Receita criada com sucesso!")
        })

        it("tentar criar uma nova receita faltando um campo obrigatório", async () => {
            const newRecipe = {
                ingredients: "Farinha, ovos, chocolate",
                preparationMethod: "Misture e asse"
            }

            const response = await request(app)
                .post("/recipes")
                .send(newRecipe)
                .expect(400)

            expect(response.body).toBe("Erro ao criar a Receita!")
        })

        it("tentar criar uma nova receita passando tipo inválido no campo name", async () => {
            const newRecipe = {
                name: 12345,
                ingredients: "Farinha, ovos, chocolate",
                preparationMethod: "Misture e asse"
            }

            const response = await request(app)
                .post("/recipes")
                .send(newRecipe)
                .expect(400)

            expect(response.body).toBe("Erro ao criar a Receita!")
        })

        it("tentar criar uma nova receita sem informar o método de preparo", async () => {
            const newRecipe = {
                name: "Torta de Limão",
                ingredients: "Limão, leite condensado, creme de leite"
            }

            const response = await request(app)
                .post("/recipes")
                .send(newRecipe)
                .expect(400)

            expect(response.body).toBe("Erro ao criar a Receita!")
        })
    })

    describe("GET /recipes", () => {
        beforeAll(async () => {
            const newRecipe = {
                name: "Arroz de Carreteiro",
                ingredients: "Arroz, charque, temperos",
                preparationMethod: "Refogue o charque e adicione o arroz cozido"
            }
            await request(app).post("/recipes").send(newRecipe)
        })

        it("deve listar todas as receitas com sucesso", async () => {
            const response = await request(app)
                .get("/recipes")
                .expect(200)

            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })

        it("deve retornar receitas com a estrutura correta", async () => {
            const response = await request(app)
                .get("/recipes")
                .expect(200)

            const recipe = response.body[0]
            expect(recipe).toHaveProperty("id")
            expect(recipe).toHaveProperty("name")
            expect(recipe).toHaveProperty("ingredients")
            expect(recipe).toHaveProperty("preparationMethod")
        })
    })

    describe("PUT /recipes/:id", () => {
        beforeAll(async () => {
            const newRecipe = {
                name: "Brigadeiro",
                ingredients: "Leite condensado, chocolate em pó, manteiga",
                preparationMethod: "Misture e cozinhe em fogo baixo até desgrudar"
            }
            const createResponse = await request(app).post("/recipes").send(newRecipe)
            const listResponse = await request(app).get("/recipes")
            const createdRecipe = listResponse.body.find((recipe: any) => recipe.name === "Brigadeiro")
            createdRecipeId = createdRecipe.id
        })

        it("deve atualizar uma receita existente com sucesso", async () => {
            const updatedRecipe = {
                name: "Brigadeiro Gourmet",
                ingredients: "Leite condensado, chocolate belga, manteiga francesa",
                preparationMethod: "Misture e cozinhe em fogo baixo até o ponto ideal"
            }

            const response = await request(app)
                .put(`/recipes/${createdRecipeId}`)
                .send(updatedRecipe)
                .expect(200)

            expect(response.body).toBe("Receita atualizada com sucesso!")
        })

        it("deve atualizar apenas alguns campos da receita", async () => {
            const partialUpdate = {
                name: "Brigadeiro Premium",
                ingredients: "Leite condensado especial, chocolate 70% cacau, manteiga ghee",
                preparationMethod: "Preparo especial em fogo baixo"
            }

            const response = await request(app)
                .put(`/recipes/${createdRecipeId}`)
                .send(partialUpdate)
                .expect(200)

            expect(response.body).toBe("Receita atualizada com sucesso!")
        })

        it("tentar atualizar uma receita com id inexistente", async () => {
            const updatedRecipe = {
                name: "Receita Inexistente",
                ingredients: "Ingredientes",
                preparationMethod: "Modo de preparo"
            }

            const response = await request(app)
                .put("/recipes/999999")
                .send(updatedRecipe)
                .expect(400)

            expect(response.body).toBe("Nenhuma Receita encontrada com esse id!")
        })

        it("tentar atualizar uma receita passando tipo inválido no campo ingredients", async () => {
            const invalidUpdate = {
                name: "Brigadeiro",
                ingredients: 123456,
                preparationMethod: "Modo de preparo"
            }

            const response = await request(app)
                .put(`/recipes/${createdRecipeId}`)
                .send(invalidUpdate)
                .expect(400)

            expect(response.body).toBe("Erro ao atualizar a Receita!")
        })
    })

    describe("DELETE /recipes/:id", () => {
        let recipeToDeleteId: number;

        beforeEach(async () => {
            const newRecipe = {
                name: "Receita Temporária",
                ingredients: "Ingredientes temporários",
                preparationMethod: "Método temporário"
            }
            await request(app).post("/recipes").send(newRecipe)

            const listResponse = await request(app).get("/recipes")
            const createdRecipe = listResponse.body.find((recipe: any) => recipe.name === "Receita Temporária")
            recipeToDeleteId = createdRecipe.id
        })

        it("deve deletar uma receita existente com sucesso", async () => {
            const response = await request(app)
                .delete(`/recipes/${recipeToDeleteId}`)
                .expect(200)

            expect(response.body).toBe("Receita deletada com sucesso!")
        })

        it("deve confirmar que a receita foi realmente deletada", async () => {
            await request(app).delete(`/recipes/${recipeToDeleteId}`)

            const listResponse = await request(app).get("/recipes")
            const deletedRecipe = listResponse.body.find((recipe: any) => recipe.id === recipeToDeleteId)

            expect(deletedRecipe).toBeUndefined()
        })

        it("tentar deletar uma receita com id inexistente", async () => {
            const response = await request(app)
                .delete("/recipes/999999")
                .expect(400)

            expect(response.body).toBe("Nenhuma Receita encontrada com esse id!")
        })

        it("tentar deletar uma receita com id inválido (string)", async () => {
            const response = await request(app)
                .delete("/recipes/invalid-id")
                .expect(400)

            expect(response.body).toBe("Erro ao deletar a Receita!")
        })
    })
})