import "reflect-metadata";

import { DataSource } from "typeorm";
import { UserModel } from "./postgres-adapter/models/user-model";
import { CarModel } from "./postgres-adapter/models/car-model";
import { SpecificationModel } from "./postgres-adapter/models/specification-model";
import { CategoryModel } from "./postgres-adapter/models/category-model";


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
  entities: [UserModel, CarModel, SpecificationModel, CategoryModel],
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
