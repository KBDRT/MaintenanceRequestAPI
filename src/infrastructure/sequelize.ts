import { Sequelize } from "sequelize-typescript";
import { modelsList } from "./models";
import cls from 'cls-hooked';
import dbConnectionConfig from "../config/db-connection.config";

export const namespace = cls.createNamespace('app-transactions');
Sequelize.useCLS(namespace);

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: dbConnectionConfig.host,
  port: dbConnectionConfig.port,
  username: dbConnectionConfig.user,
  password: dbConnectionConfig.password,
  database: dbConnectionConfig.name,
  pool: {
    max: dbConnectionConfig.pool.max,
    min: dbConnectionConfig.pool.min,
    acquire: dbConnectionConfig.pool.acquire,
    idle: dbConnectionConfig.pool.idle
  },
  logging: false,
  models: [...modelsList]
})

