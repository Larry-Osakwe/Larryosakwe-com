import { HomeContent } from "@/components/HomeContent/HomeContent";
import { getSEOTags } from "@/lib/seo/seo";

export const metadata = getSEOTags({
  title: "Home",
  canonicalUrlRelative: "/",
});

export default function Home() {
  return (
    <>
      <HomeContent />
    </>
  );
}


