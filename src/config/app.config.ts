import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import { envFileSchema } from '../validators/schemas/common/env-file.schema.js';

const parsed = envFileSchema.safeParse(process.env);
if (!parsed.success) {
  console.log("Ошибка .env файла");
  process.exit(1);
}

const appConfig = {
  port: process.env.PORT,
  jsonLimit: process.env.BODY_JSON_LIMIT
};

export default appConfig;