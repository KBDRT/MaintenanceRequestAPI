import * as z from 'zod';

export const idRequestSchema = z.object({
  id: z.uuid ({ message: "Некорректный ID сущности" })
});