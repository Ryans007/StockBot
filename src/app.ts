import express from "express";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Bem vindo a API do Bot de Estoque!");
});

AppDataSource.initialize()
    .then(() => {
        console.log("Servidor rodando na porta 3000");
    })
    .catch((err: any) => {
        console.error("Erro na aplicação:", err);
    });

export default app;

