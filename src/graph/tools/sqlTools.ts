import {SqlDatabase} from "@langchain/classic/sql_db";
import { AppDataSource } from "../../config/dataSource.js";
import { DynamicTool } from "@langchain/core/tools";
import { Tool } from "@langchain/core/tools";

export const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: AppDataSource,
});

// A. Ferramenta de leitura de esquema (Schema Tool)
export const getSchemaTool = new DynamicTool({
    name: "sql_db_schema",
    description: "Use para obter o esquema (colunas e tipos) das tabelas. A entrada deve ser o nome da(s) tabela(s) separadas por vírgula. Ex: 'produtos, receitas'",
    func: async (tables: string) => {
        return await db.getTableInfo(tables.split(',').map(t => t.trim()));
    },
}) as Tool;

// B. Ferramenta de Leitura de Dados (SELECT READ-ONLY)
export const queryDatabaseTool = new DynamicTool({
    name: "sql_db_query",
    description: "Use esta ferramenta para executar um comando SQL de LEITURA (SELECT) contra o banco de dados. A entrada deve ser um comando SQL completo. Ex: 'SELECT count(*) FROM produtos'",
    func: async (query: string) => {
        try {
            const result = await db.run(query);
            return typeof result === "string" ? result : JSON.stringify(result, null, 2);
        } catch (error) {
            return `Erro ao executar SQL (SELECT): ${error instanceof Error ? error.message : String(error)}`;
        }
    },
}) as Tool;

// C. Ferramenta de Escrita de Dados (INSERT/UPDATE/DELETE WRITE)
export const writeDatabaseTool = new DynamicTool({
    name: "sql_db_write",
    description: "Use esta ferramenta para executar comandos SQL de ESCRITA (INSERT, UPDATE, DELETE). A entrada deve ser um comando SQL completo. USE APENAS PARA SALVAR/MODIFICAR DADOS.",
    func: async (query: string) => {
        try {
            await db.run(query);
            return "Comando de escrita SQL executado com sucesso.";
        } catch (error) {
            return `Erro ao executar SQL (WRITE): ${error instanceof Error ? error.message : String(error)}`;
        }
    },
}) as Tool;

// --- 3. Exportar o Array Completo de Ferramentas ---
export const sqlTools = [
    getSchemaTool,
    queryDatabaseTool,
    writeDatabaseTool,
];