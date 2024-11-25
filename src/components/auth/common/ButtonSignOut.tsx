"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/lib/auth/hooks";

export function ButtonSignOut() {
  const { handleAuthAction, isLoading } = useAuth({
    redirectTo: '/login',
    onSuccess: () => {
      // Additional cleanup if needed
    }
  });

  return (
    <Button 
      onClick={() => handleAuthAction(() => signOut())}
      disabled={isLoading}
    >
      Sign Out
    </Button>
  );
}