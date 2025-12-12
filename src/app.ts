import {AppDataSource} from "./config/dataSource";


AppDataSource.initialize().then(() => {
    console.log("Banco de dados inicializado!");
}).catch((err) => {
    console.error("Erro durante a inicialização do banco de dados!", err);
});