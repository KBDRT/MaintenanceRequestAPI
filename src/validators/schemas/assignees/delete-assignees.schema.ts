import * as z from 'zod';

export const deleteAssigneesSchema = z.object({
  id: z.uuid ({ message: "Некорректный ID заявки" }),
  userId: z.uuid ({ message: "Некорректный ID специалиста" })
});