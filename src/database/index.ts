import "reflect-metadata";

import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "rentx",
  synchronize: true,
  logging: false,
  entities: [Category],
  migrations: ["src/database/migrations/*.ts"], // Correct the path to migrations
  subscribers: [],
});
