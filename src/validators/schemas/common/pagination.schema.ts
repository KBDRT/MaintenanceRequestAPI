import * as z from 'zod';

export const paginationSchema = z.object({
  size: z.coerce.number(),
  limit: z.coerce.number(),
});
