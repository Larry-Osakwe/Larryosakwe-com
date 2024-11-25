import { HomeContent } from "@/components/home/HomeContent";
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


