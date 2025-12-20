import express from "express";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Bem vindo a API do Bot de Estoque!");
});

AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados inicializado!");
    })
    .catch((err: any) => {
        console.error("Erro ao inicializar o banco de dados:", err);
    });

export default app;

