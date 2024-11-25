import { HomeContent } from "@/components/home/HomeContent";
import { getSEOTags } from "@/lib/seo/seo";
import Link from "next/link";
import tw, { styled } from 'twin.macro';

// SEO metadata for the home page
export const metadata = getSEOTags({
  title: "Home",
  canonicalUrlRelative: "/",
});

// Styled components
const DocsLink = styled(Link)`
  ${tw`fixed bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors`}
`;

/**
 * Home Page Component
 * 
 * This is the main landing page of your application.
 * It uses the HomeContent component which contains all the sections
 * (Hero, Features, Pricing, etc.)
 * 
 * You can:
 * 1. Modify the HomeContent component to change the landing page sections
 * 2. Add additional components or sections here
 * 3. Customize the SEO metadata above
 */
export default function Home() {
  return (
    <>
      <HomeContent />
      <DocsLink href="https://flarestack.io/docs" target="_blank">
        View Documentation
      </DocsLink>
    </>
  );
}


