import "reflect-metadata";

import { DataSource } from "typeorm";

import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "banco" || "localhost", // Algo está acontecendo aqui? É localhost ou banco?
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "rentx",
  synchronize: true,
  logging: false,
  entities: [Category, Specification, User],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
