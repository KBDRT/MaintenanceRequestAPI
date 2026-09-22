import { Sequelize } from "sequelize-typescript";
import { modelsList } from "./models";

export const dbConnection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5480,
  username: "postgres",
  password: "12345",
  database: "maintenance",
  logging: false,
  models: [...modelsList]
})