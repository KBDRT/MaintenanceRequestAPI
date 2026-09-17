import * as z from 'zod';

export const equipmentLocationSchema = z.object({
  lat: z.number({message: "Широта должна быть числом"}),
  lon: z.number({message: "Долгота должна быть числом"}),
});
