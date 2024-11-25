import { z } from "zod";

/**
 * Email validation schema
 * Ensures the email:
 * - Is a valid email format
 * - Includes @ symbol and domain
 */
export const emailSchema = z.string().email("Invalid email address");

/**
 * Password validation schema
 * Ensures the password:
 * - Is at least 8 characters long
 * - Can include any characters (letters, numbers, symbols)
 */
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters");

/**
 * Login form validation schema
 * 
 * Combines email and password validation for login forms
 * 
 * @example
 * ```ts
 * const result = loginSchema.safeParse({
 *   email: "user@example.com",
 *   password: "securepass123"
 * });
 * 
 * if (!result.success) {
 *   console.log(result.error.issues);
 * }
 * ```
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// TypeScript type generated from the schema
export type LoginSchema = z.infer<typeof loginSchema>;