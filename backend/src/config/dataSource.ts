import {DataSource} from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    synchronize: true,
    logging: false,
    entities: ["src/entities/**/*.ts"],
});