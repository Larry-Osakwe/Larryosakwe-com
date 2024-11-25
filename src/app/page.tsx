import { HomeContent } from "@/components/home/HomeContent";
import { getSEOTags } from "@/lib/seo/seo";
import Link from "next/link";
import tw, { styled } from 'twin.macro';

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

// Styled components
const DocsLink = styled(Link)`
  ${tw`fixed bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors z-50`}
`;

export default function HomePage() {
  return (
    <>
      <HomeContent />
      <DocsLink 
        href="https://flarestack.io/docs" 
        target="_blank"
        rel="noopener noreferrer"
      >
        View Documentation
      </DocsLink>
    </>
  );
}


