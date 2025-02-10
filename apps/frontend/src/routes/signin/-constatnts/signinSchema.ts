import { z } from 'zod';

export const signinSchema = z.object({
  login: z.string().min(1, { message: 'Логин обязателен' }),
  password: z.string().min(1, { message: 'Пароль обязателен' })
});

export type SigninFormData = z.infer<typeof signinSchema>;
