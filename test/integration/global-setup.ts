import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import { PostgreSqlContainer } from "@testcontainers/postgresql";

export const AUTH_PATH = '/api/auth';

export default async function globalSetup() {
  const container = await new PostgreSqlContainer('postgres:18-alpine')
    .withDatabase('test')
    .withUsername('test')
    .withPassword('test')
    .withAutoRemove(true)
    .start();

  process.env.DB_HOST = container.getHost()
  process.env.DB_PORT = String(container.getMappedPort(5432))
  process.env.DB_NAME = "test";
  process.env.DB_USER = "test";
  process.env.DB_PASSWORD = "test";

  process.env.JWT_SALT_ROUNDS = "4";
  
  process.env.LOG_LEVEL = 'silent';

  console.log("");
  console.log("ЗАПУЩЕН ТЕСТОВЫЙ POSTGRESQL СЕРВЕР!");
}