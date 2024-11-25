import { z } from "zod";
import { emailSchema, passwordSchema } from './login';

/**
 * Registration form validation schema
 * 
 * Extends login schema to include password confirmation
 * Adds additional validation to ensure passwords match
 * 
 * Validation rules:
 * - Email must be valid
 * - Password must be at least 8 characters
 * - Password and confirmation must match
 * 
 * @example
 * ```ts
 * const result = registerSchema.safeParse({
 *   email: "newuser@example.com",
 *   password: "securepass123",
 *   passwordConfirm: "securepass123"
 * });
 * 
 * if (!result.success) {
 *   console.log(result.error.issues);
 * }
 * ```
 */
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: passwordSchema
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;