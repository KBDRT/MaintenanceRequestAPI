import { z } from 'zod';

export const envFileSchema = z.object({
  WEATHER_API_URL: z.string(),
  WEATHER_API_TIMEOUT: z.coerce.number(),
  WEATHER_API_DAYS: z.coerce.number(),
  WEATHER_RULE_MAX_PRECIPITATION: z.coerce.number(),
  WEATHER_RULE_MAX_TEMPERATURE: z.coerce.number(),
  WEATHER_RULE_MIN_TEMPERATURE: z.coerce.number(),
});
