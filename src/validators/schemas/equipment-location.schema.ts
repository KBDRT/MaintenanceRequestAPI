import * as z from 'zod';

export const equipmentLocationSchema = z.strictObject({
  lat: z.number(),
  lon: z.number(),
});
