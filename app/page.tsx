import { Hero } from "@/components/home/hero";
import { HomeSections } from "@/components/home/sections";
import { createMetadata } from "@/lib/seo/metadata";
import { SpeedInsights } from "@vercel/speed-insights/next";
export const metadata = createMetadata({
  title: "Discover Makeup That Suits You",
  description:
    "Upload a selfie, learn your face shape and features right in the browser, and get makeup tips, tutorials, and free tools that fit how you actually look.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <SpeedInsights />
      <Hero />
      <HomeSections />
    </>
  );
}
