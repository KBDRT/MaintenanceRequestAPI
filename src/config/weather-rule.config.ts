import dotenv from 'dotenv';
import { parsed } from './app.config.js';
dotenv.config({ quiet: true });

const weatherRulesConfig = {
  minTemperature: parsed.data?.WEATHER_RULE_MIN_TEMPERATURE ?? 0,
  maxTemperature: parsed.data?.WEATHER_RULE_MAX_TEMPERATURE ?? 10,
  maxSumPrecipitation: parsed.data?.WEATHER_RULE_MAX_PRECIPITATION ?? 2,
};

export default weatherRulesConfig;