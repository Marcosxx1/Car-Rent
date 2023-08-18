import "reflect-metadata";

import { DataSource } from "typeorm";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car";


const host = process.env.DB_HOST || "localhost";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "banco",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "rentx",
  synchronize: true,
  logging: false,
  entities: [Category, Specification, User, Car],
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
