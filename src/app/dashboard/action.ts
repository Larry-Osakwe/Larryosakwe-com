"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/supabaseServer";

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}