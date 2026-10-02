import * as z from 'zod';

export const loginUserSchema = z.object({
  login: z.string().min(1).max(255),
  password: z.string().min(1).max(101)
});

