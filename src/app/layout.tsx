import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Schibsted_Grotesk } from "next/font/google";
import { MotionConfig } from "motion/react";
import { SITE } from "@/content/site";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import "./globals.css";
import "@/styles/tokens.css";
import "@/styles/paper.css";
import "@/styles/ink.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL?.trim() || "http://localhost:3000"),
  title: `DAFTRIFY — ${SITE.positioning}`,
  description: SITE.description,
  keywords: [
    "document workflows",
    "workflow operations",
    "document processing",
    "AI-assisted",
    "human-reviewed",
    "business operations",
    "DAFTRIFY",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
    title: `DAFTRIFY — ${SITE.positioning}`,
    description: SITE.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE.positioning,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `DAFTRIFY — ${SITE.positioning}`,
    description: SITE.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${schibsted.variable} ${plexMono.variable} ${instrument.variable}`}
    >
      <body className="bg-paper-50 font-display text-ink-950 antialiased">
        <MotionConfig reducedMotion="user">
          <div id="top">
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <ScrollProgress />
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </div>
        </MotionConfig>
      </body>
    </html>
  );
}