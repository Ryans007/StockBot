import {DataSource} from "typeorm";
import path from "path";
import Item from "../entities/Item.ts";
import Recipe from "../entities/Recipe.ts";
import Conversation from "../entities/Conversation.ts";
import dotenv from "dotenv";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Item, Recipe, Conversation],
});