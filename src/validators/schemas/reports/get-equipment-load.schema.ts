import * as z from 'zod';

export const getEquipmentLoadSchema = z.object({
  dateFrom: z.iso.date().default('1970-01-01'),
  dateTo: z.iso.date().default('2100-12-31'),
  minFinishedRequests: z.coerce.number().min(0).default(0)
});

