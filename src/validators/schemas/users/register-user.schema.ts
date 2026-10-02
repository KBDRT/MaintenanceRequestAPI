import * as z from 'zod';

export const registerUserSchema = z.object({
  login: z.string().min(5).max(255),
  password: z.string().min(5).max(100).refine((v) => !/[\s<>"'`\\]/.test(v), {message: 'Пароль содержит недопустимые символы'})
});

