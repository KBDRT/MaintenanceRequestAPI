import * as z from 'zod';

export const equipmentLocationSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});
