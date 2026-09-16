import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const weatherRulesConfig = {
  minTemperature: Number(process.env.WEATHER_RULE_MIN_TEMPERATURE),
  maxTemperature: Number(process.env.WEATHER_RULE_MAX_TEMPERATURE),
  maxSumPrecipitation: Number(process.env.WEATHER_RULE_MAX_PRECIPITATION),
};

export default weatherRulesConfig;