import { z } from "zod";

export const emailSchema = z
  .string()
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = loginSchema;

// You can extend the signup schema if you need additional fields for signup
// export const signupSchema = loginSchema.extend({
//   name: z.string().min(2, "Name must contain at least 2 characters"),
// });
