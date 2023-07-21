import "reflect-metadata";
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/model/Category";
import { Specification } from "../modules/cars/model/Specification";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [Category, Specification],
  migrations: [],
  subscribers: [],
});
