import type { Metadata } from "next";
import { Fragment_Mono, Instrument_Serif, Onest } from "next/font/google";
import { MotionConfig } from "motion/react";
import { SITE } from "@/content/site";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";
import "@/styles/tokens.css";
import "@/styles/paper.css";
import "@/styles/ink.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

const fragment = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment",
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
      className={`${onest.variable} ${fragment.variable} ${instrument.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap"
        />
      </head>
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
        <SmoothScroll />
        <CustomCursor />
      </body>
    </html>
  );
}