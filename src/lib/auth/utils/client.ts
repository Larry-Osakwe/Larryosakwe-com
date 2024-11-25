import { createClient } from "@/lib/supabase/supabaseClient";
import type { AuthUser } from "../types";

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('has_access, name, image')
    .eq('id', user.id)
    .single();

  return {
    id: user.id,
    email: user.email || null,
    hasAccess: !!profile?.has_access,
    isAdmin: false,
    profile: {
      name: profile?.name || null,
      image: profile?.image || null
    }
  };
}