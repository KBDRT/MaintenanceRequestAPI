import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import { envFileSchema } from '../validators/schemas/common/env-file.schema.js';

export const parsed = envFileSchema.safeParse(process.env);
if (!parsed.success) {
  console.log("Ошибка .env файла");
  console.log(parsed.error.message);
  process.exit(1);
}

const appConfig = {
  port: parsed.data.PORT,
  jsonLimit: parsed.data.BODY_JSON_LIMIT,
  rateLimit: {
    windowMs: parsed.data.RATE_LIMIT_WINDOW_MS,
    maxRequests: parsed.data.RATE_LIMIT_MAX_REQUESTS,
  },
  origin: parsed.data.CORS_ORIGINS,
  nodeEnv: parsed.data.NODE_ENV,
};

export default appConfig;
