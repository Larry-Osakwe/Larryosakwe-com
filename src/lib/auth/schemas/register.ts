import { z } from "zod";
import { emailSchema, passwordSchema } from './login';

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: passwordSchema
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;