import * as z from 'zod';

export const getEquipmentsRequestSchema = z.object({
  sort: z.array(z.string()).optional(),
  status: z.array(z.string()).optional(),
  type: z.array(z.string()).optional(),
});
