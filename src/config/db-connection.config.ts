import dotenv from 'dotenv';
import { parsed } from './app.config.js';
dotenv.config({ quiet: true });

const dbConnectionConfig = {
  host: parsed.data?.DB_HOST,
  port: parsed.data?.DB_PORT,
  name: parsed.data?.DB_NAME,
  user: parsed.data?.DB_USER,
  password: parsed.data?.DB_PASSWORD,
  poolMax: parsed.data?.DB_POOL_MAX,
  poolMin: parsed.data?.DB_POOL_MIN,
  poolAcquire: parsed.data?.DB_POOL_ACQUIRE,
  poolIdle: parsed.data?.DB_POOL_IDLE,
};

export default dbConnectionConfig;
