import "reflect-metadata";

import { DataSource } from "typeorm";
import { UserModel } from "./postgres-adapter/models/user-model";
import { User } from "../../../business/entities/User";
import { CarModel } from "./postgres-adapter/models/car-model";


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
  entities: [UserModel, User, CarModel],
  migrations: ["./migrations/*.ts"],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
