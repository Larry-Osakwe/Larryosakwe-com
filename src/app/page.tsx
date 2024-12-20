import { HomeContent } from "@/components/home/HomeContent";
import { getSEOTags } from "@/lib/seo/seo";
import Link from "next/link";

/**
 * Home Page - Server Component
 * 
 * This is the main landing page of your application.
 * It's a server component that:
 * 1. Sets SEO metadata
 * 2. Renders the landing page content
 * 3. Provides quick access to documentation
 * 
 * Note: Keep this component simple and move complex logic
 * to client components within HomeContent
 */

// SEO metadata configuration
export const metadata = getSEOTags({
  title: "Home",
  canonicalUrlRelative: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeContent />
    </>
  );
}


