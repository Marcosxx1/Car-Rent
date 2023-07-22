import "reflect-metadata";

import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "banco",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "rentx",
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});
