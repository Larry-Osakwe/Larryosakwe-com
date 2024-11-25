import { createClient } from "@/lib/supabase/supabaseClient";
import type { AuthResponse } from "@/lib/auth/types";
import type { LoginSchema, RegisterSchema } from "@/lib/auth/schemas";
import { sendPasswordChangedEmail } from "@/lib/resend/emails";

/**
 * Authenticates a user with email and password
 * 
 * Uses Supabase Auth to verify credentials and create a session
 * 
 * @param email - User's email address
 * @param password - User's password
 * @returns AuthResponse with success/error status and user data if successful
 * 
 * @example
 * ```ts
 * const response = await signIn({
 *   email: "user@example.com",
 *   password: "securepassword"
 * });
 * ```
 */
export async function signIn({ email, password }: LoginSchema): Promise<AuthResponse> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: true, message: error.message };
  }

  if (!data.user) {
    return { error: true, message: "Login failed. Please try again." };
  }

  return {
    success: true,
    message: "Login successful",
    user: {
      id: data.user.id,
      email: data.user.email || null
    }
  };
}

/**
 * Registers a new user account
 * 
 * Creates a new user in Supabase Auth and sends a confirmation email
 * The email contains a link to verify the account
 * 
 * @param email - User's email address
 * @param password - User's chosen password
 * @returns AuthResponse with success/error status
 * 
 * @example
 * ```ts
 * const response = await signUp({
 *   email: "newuser@example.com",
 *   password: "securepassword"
 * });
 * ```
 */
export async function signUp({ email, password }: RegisterSchema): Promise<AuthResponse> {
  const supabase = createClient();

  // Sign up with email confirmation enabled
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Redirect to dashboard after email confirmation
      emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/callback?next=/dashboard`,
    }
  });

  if (error) {
    return { error: true, message: error.message };
  }

  // Check if email is already registered
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { error: true, message: "Email already in use" };
  }

  return { success: true, message: "Check your email for the confirmation link" };
}

/**
 * Signs out the current user
 * 
 * Removes the session and clears authentication state
 * 
 * @returns AuthResponse with success/error status
 * 
 * @example
 * ```ts
 * const response = await signOut();
 * ```
 */
export async function signOut(): Promise<AuthResponse> {
  const supabase = createClient();
  await supabase.auth.signOut();

  return {
    success: true,
    message: "Signed out successfully"
  };
}

/**
 * Initiates password reset process
 * 
 * Sends a password reset email to the user
 * The email contains a link to reset their password
 * 
 * @param email - User's email address
 * @returns AuthResponse with success/error status
 * 
 * @example
 * ```ts
 * const response = await forgotPassword({
 *   email: "user@example.com"
 * });
 * ```
 */
export async function forgotPassword({ email }: { email: string }): Promise<AuthResponse> {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_URL}/forgot-password/reset-password`,
  });

  if (error) {
    return { error: true, message: error.message };
  }

  // Generic message for security (doesn't reveal if email exists)
  return { success: true, message: "If an account exists, a password reset email has been sent." };
}

/**
 * Completes the password reset process
 * 
 * Updates the user's password and sends a confirmation email
 * 
 * @param password - User's new password
 * @returns AuthResponse with success/error status
 * 
 * @example
 * ```ts
 * const response = await resetPassword({
 *   password: "newpassword123"
 * });
 * ```
 */
export async function resetPassword({ password }: { password: string }): Promise<AuthResponse> {
  const supabase = createClient();

  try {
    // Update password in Supabase Auth
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return { error: true, message: error.message };
    }

    // Send confirmation email
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      await sendPasswordChangedEmail(user.email);
    }

    return { success: true, message: "Password reset successful" };
  } catch (error) {
    console.error('Password reset error:', error);
    return { error: true, message: "Failed to reset password" };
  }
}