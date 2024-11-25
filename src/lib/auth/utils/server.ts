import { createClient } from "@/lib/supabase/supabaseServer";
import type { AuthUser } from "../types";

export async function requireAuth(): Promise<AuthUser> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('has_access, is_admin, name, image')
    .eq('id', user.id)
    .single();

  return {
    id: user.id,
    email: user.email || null,
    hasAccess: !!profile?.has_access,
    isAdmin: !!profile?.is_admin,
    profile: {
      name: profile?.name || null,
      image: profile?.image || null
    }
  };
}

export async function requirePaidUser(): Promise<AuthUser> {
  const user = await requireAuth();
  
  if (!user.hasAccess) {
    throw new Error('Subscription required');
  }

  return user;
}