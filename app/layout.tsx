import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { PageTopOffset } from "@/components/layout/page-top-offset";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemedToaster } from "@/components/theme/themed-toaster";
import {
  APP_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
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
  keywords: DEFAULT_KEYWORDS,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    siteName: APP_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${APP_NAME}: Discover the makeup that truly suits you`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col font-sans">
        <ThemeProvider>
          <div className="glass-backdrop" aria-hidden />
          <SiteHeader />
          <main className="relative z-0 flex-1">
            <PageTopOffset>{children}</PageTopOffset>
          </main>
          <SiteFooter />
          <ThemedToaster />
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
                    logo: absoluteUrl("/logo.png"),
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
                    image: absoluteUrl("/logo.png"),
                  },
                ],
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
