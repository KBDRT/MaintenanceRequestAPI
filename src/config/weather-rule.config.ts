import dotenv from 'dotenv';
import { parsed } from './app.config.js';
dotenv.config({ quiet: true });

const weatherRulesConfig = {
  minTemperature: parsed.data?.WEATHER_RULE_MIN_TEMPERATURE,
  maxTemperature: parsed.data?.WEATHER_RULE_MAX_TEMPERATURE,
  maxSumPrecipitation: parsed.data?.WEATHER_RULE_MAX_PRECIPITATION,
};

export default weatherRulesConfig;