import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import { PostgreSqlContainer } from "@testcontainers/postgresql";

export const DEFAULT_PATHS = {
  auth: "/api/auth",
  equipment: "/api/equipments",
  requests: "/api/requests",
}

const TEST_DB_NAME = 'test'
const TEST_DB_USER =  'test'
const TEST_DB_PASSWORD = 'test'

export default async function globalSetup() {
  const container = await new PostgreSqlContainer('postgres:18-alpine')
    .withDatabase(TEST_DB_NAME)
    .withUsername(TEST_DB_USER)
    .withPassword(TEST_DB_PASSWORD)
    .withAutoRemove(true)
    .start();

  process.env.DB_HOST = container.getHost()
  process.env.DB_PORT = String(container.getMappedPort(5432))
  process.env.DB_NAME = TEST_DB_NAME;
  process.env.DB_USER = TEST_DB_USER;
  process.env.DB_PASSWORD = TEST_DB_PASSWORD;

  process.env.JWT_SALT_ROUNDS = "4";
  
  process.env.LOG_LEVEL = 'silent';

  console.log("");
  console.log("ЗАПУЩЕН ТЕСТОВЫЙ POSTGRESQL СЕРВЕР!");
}