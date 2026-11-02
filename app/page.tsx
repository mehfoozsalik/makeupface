import { Hero } from "@/components/home/hero";
import { HomeSections } from "@/components/home/sections";
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { homepageFaqs } from "@/data/faqs";
import { createMetadata } from "@/lib/seo/metadata";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = createMetadata({
  title: "Discover Makeup That Suits You",
  description:
    "Makeup for eyes, lips, and face—upload a selfie, learn your features in the browser, and get tips, tutorials, and free tools that fit how you actually look.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homepageFaqs)} />
      <SpeedInsights />
      <Hero />
      <HomeSections />
    </>
  );
}
