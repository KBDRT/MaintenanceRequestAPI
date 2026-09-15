import * as z from 'zod';

export const getEquipmentRequestSchema = z.strictObject({
  id: z.uuid ({ message: "Некорректный ID" })
});