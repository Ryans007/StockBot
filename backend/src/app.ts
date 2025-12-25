import express from "express";
import { AppDataSource } from "./config/dataSource";
import setupSwagger  from './swagger.ts'
import router from "./routes";

const app = express();
app.use(express.json());
setupSwagger(app);
router(app);

app.get("/", (_, res) => {
    res.send("Bem vindo a API do Bot de Estoque!");
});

if (!AppDataSource.isInitialized) {
    AppDataSource.initialize()
        .then(() => {
            console.log("Banco de dados inicializado!");
        })
        .catch((err: any) => {
            console.error("Erro ao inicializar o banco de dados:", err);
        });
}

export default app;

