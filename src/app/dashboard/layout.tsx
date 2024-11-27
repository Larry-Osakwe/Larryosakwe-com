import { protectPage } from "@/lib/auth/utils/protection";
import { LogoIcon } from "@/components/shared/icons/Icons";
import { config } from "@/config";
import Link from "next/link";
import { ButtonSignOut } from "@/components/auth/common/ButtonSignOut";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await protectPage();  // Basic auth protection at layout level

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center p-4 border-b">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition-opacity"
        >
          <LogoIcon className="h-6 w-6" />
          <span>{config.appName}</span>
        </Link>
        <ButtonSignOut />
      </div>
      {children}
    </div>
  );
}