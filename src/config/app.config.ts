import dotenv from 'dotenv';
import { envFileSchema } from '../validators/schemas/common/env-file.schema.js';
dotenv.config({ quiet: true });

const parsed = envFileSchema.safeParse(process.env);
if (!parsed.success) {
  console.log("Ошибка .env файла");
  process.exit(1);
}

const appConfig = {
  port: process.env.PORT,
};

export default appConfig;