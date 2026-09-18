import dotenv from 'dotenv';
import { parsed } from './app.config.js';
dotenv.config({ quiet: true });

const weatherAPIConfig = {
  baseURL: parsed.data?.WEATHER_API_URL ?? "",
  timeOut: parsed.data?.WEATHER_API_TIMEOUT ?? 5000,
  days: parsed.data?.WEATHER_API_DAYS ?? 3,
};

export default weatherAPIConfig;