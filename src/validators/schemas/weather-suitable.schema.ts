import { z } from 'zod';
import weatherRulesConfig from '../../config/weather-rule.config.js';

export const weatherSuitableSchema = z.object({
  minTemperature: z.number().gte(weatherRulesConfig.minTemperature),
  maxTemperature: z.number().lte(weatherRulesConfig.maxTemperature),
  sumPrecipitation: z.number().lte(weatherRulesConfig.maxSumPrecipitation),
});
