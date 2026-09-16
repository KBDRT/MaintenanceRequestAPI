import dotenv from 'dotenv';
import { envFileSchema } from '../validators/schemas/common/env-file.schema.js';
dotenv.config({ quiet: true });

function validateEnvFile() {
  const parsed = envFileSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error("ОШИБКА ENV FILE!");
  }
}

validateEnvFile();

const weatherAPIConfig = {
  baseURL: process.env.WEATHER_API_URL || "",
  timeOut: Number(process.env.WEATHER_API_TIMEOUT),
  days: process.env.WEATHER_API_DAYS || "3",
};

export default weatherAPIConfig;