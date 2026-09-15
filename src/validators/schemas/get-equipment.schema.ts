import * as z from 'zod';

export const getEquipmentRequestSchema = z.object({
  id: z.uuid ({ message: "Некорректный ID" })
});