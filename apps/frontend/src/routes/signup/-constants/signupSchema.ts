import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: 'Имя обязательно' }),
    login: z
      .string()
      .min(6, { message: 'Логин должен быть не менее 6 символов' })
      .regex(/^[a-z0-9]+$/i, {
        message: 'Логин должен содержать только латинские буквы и цифры'
      }),
    password: z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' }),
    confirmPassword: z.string().min(1, { message: 'Подтверждение пароля обязательно' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  });

export type SignupFormData = z.infer<typeof signupSchema>;
