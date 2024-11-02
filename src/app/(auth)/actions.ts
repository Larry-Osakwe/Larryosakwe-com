"use server";

import { createClient } from "@/lib/supabase/supabaseServer";

export async function loginUser({ email, password }: { email: string; password: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: true, message: error.message };
  }

  if (!data.user) {
    return { error: true, message: "Login failed. Please try again." };
  }

  return { success: true, message: "Login successful", user: { id: data.user.id, email: data.user.email } };
}

export async function registerUser({ email, password }: { email: string; password: string }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/callback?next=/dashboard`,
    }
  });

  if (error) {
    return { error: true, message: error.message };
  }

  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { error: true, message: "Email already in use" };
  }

  return { success: true, message: "Check your email for the confirmation link" };
}

export async function forgotPassword({ email }: { email: string }) {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_URL}/forgot-password/reset-password`,
  });

  if (error) {
    return { error: true, message: error.message };
  }

  return { success: true, message: "If an account exists, a password reset email has been sent." };
}

export async function resetPassword({ 
  password, 
  code 
}: { 
  password: string;
  code: string;
}) {
  const supabase = createClient();
  
  try {
    if (!code) {
      return { error: true, message: "Missing reset code" };
    }

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code);

    // Now update the password
    const { error } = await supabase.auth.updateUser({ 
      password 
    });

    if (error) {
      return { error: true, message: error.message };
    }

    return { success: true, message: "Password reset successful" };
  } catch (error) {
    console.error('Password reset error:', error);
    return { error: true, message: "Failed to reset password" };
  }
}
