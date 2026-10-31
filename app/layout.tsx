import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  APP_NAME,
  DEFAULT_DESCRIPTION,
  absoluteUrl,
} from "@/lib/seo/metadata";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${APP_NAME}: AI Makeup & Beauty Assistant`,
    template: `%s | ${APP_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    siteName: APP_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster
          theme="light"
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              background: "#FFFFFF",
              border: "1px solid #E6DFD6",
              color: "#292522",
            },
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: APP_NAME,
                  url: absoluteUrl("/"),
                  description: DEFAULT_DESCRIPTION,
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${absoluteUrl("/guides")}?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  name: APP_NAME,
                  url: absoluteUrl("/"),
                },
                {
                  "@type": "WebApplication",
                  name: `${APP_NAME} AI Makeup Assistant`,
                  applicationCategory: "LifestyleApplication",
                  operatingSystem: "Web",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  description: DEFAULT_DESCRIPTION,
                  url: absoluteUrl("/analyze"),
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
