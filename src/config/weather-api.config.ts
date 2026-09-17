import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const weatherAPIConfig = {
  baseURL: process.env.WEATHER_API_URL || "",
  timeOut: Number(process.env.WEATHER_API_TIMEOUT),
  days: process.env.WEATHER_API_DAYS || "3",
};

export default weatherAPIConfig;