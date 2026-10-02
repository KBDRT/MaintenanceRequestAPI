import { z } from 'zod';
import NODE_ENV_VALUES from '../../../config/node_env.enum.js';

export const envFileSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV_VALUES).default(NODE_ENV_VALUES.DEVELOPMENT),
  PORT: z.coerce.number().default(3000),
  WEATHER_API_URL: z.url(),
  WEATHER_API_TIMEOUT: z.coerce.number().default(5000),
  WEATHER_API_DAYS: z.coerce.number().int().default(3),
  WEATHER_RULE_MAX_PRECIPITATION: z.coerce.number().default(10),
  WEATHER_RULE_MAX_TEMPERATURE: z.coerce.number().default(-10),
  WEATHER_RULE_MIN_TEMPERATURE: z.coerce.number().default(2.5),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
  JWT_REFRESH_TOKEN_KEY: z.string().min(5).default("REF_SECRET_KEY"),
  JWT_ACCESS_TOKEN_KEY: z.string().min(5).default("ACC_SECRET_KEY"),
  JWT_SALT_ROUNDS: z.coerce.number().min(1).default(10),
  JWT_MAX_AGE_MS: z.coerce.number().min(60).default(60 * 60 * 1000),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default('info'),
  CORS_ORIGINS: z.string()
    .transform((s) => s.split(',').map((o) => o.trim()).filter(Boolean))
    .pipe(z.array(z.string().url())),
  BODY_JSON_LIMIT: z.string()
    .regex(/^\d+(\.\d+)?\s?(b|kb|mb|gb)$/i, {
      message: 'Ожидается размер вида 100b, 100kb, 1mb, 2gb',
    })
    .transform((s) => s.toLowerCase().replace(/\s+/g, ''))
    .default("100kb"),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().min(4),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_POOL_MAX: z.coerce.number().min(1).default(10),
  DB_POOL_MIN: z.coerce.number().default(0),
  DB_POOL_ACQUIRE: z.coerce.number().default(30000),
  DB_POOL_IDLE: z.coerce.number().default(10000),
});

