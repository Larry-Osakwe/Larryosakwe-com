import type { AuthUser } from '@/lib/auth/types';
import { Pricing } from "@/components/pricing/Pricing";

interface DashboardUpgradeProps {
    user: AuthUser;
  }

export function DashboardUpgrade({ user }: DashboardUpgradeProps) {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-8 mt-8">
        <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
        <p className="text-muted-foreground">Choose a plan to get started</p>
      </div>
      <Pricing />
    </div>
  );
}