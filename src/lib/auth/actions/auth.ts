import { createClient } from "@/lib/supabase/supabaseClient";
import type { AuthResponse } from "@/lib/auth/types";
import type { LoginSchema, RegisterSchema } from "@/lib/auth/schemas";
import { sendPasswordChangedEmail } from "@/lib/resend/emails";
import { redirect } from "next/navigation";

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

export async function signUp({ email, password }: RegisterSchema): Promise<AuthResponse> {
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

export async function signOut(): Promise<AuthResponse> {
  const supabase = createClient();
  await supabase.auth.signOut();
  
  return {
    success: true,
    message: "Signed out successfully"
  };
}

export async function forgotPassword({ email }: { email: string }): Promise<AuthResponse> {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/forgot-password/reset-password`,
    });

    if (error) {
        return { error: true, message: error.message };
    }

    return { success: true, message: "If an account exists, a password reset email has been sent." };
}

export async function resetPassword({ password }: { password: string }): Promise<AuthResponse> {
  const supabase = createClient();
  
  try {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return { error: true, message: error.message };
    }

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