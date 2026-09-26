import { Sequelize } from "sequelize-typescript";
import { modelsList } from "./models";
import cls from 'cls-hooked';

export const namespace = cls.createNamespace('app-transactions');
Sequelize.useCLS(namespace);

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5480,
  username: "postgres",
  password: "12345",
  database: "maintenance",
  logging: false,
  models: [...modelsList]
})