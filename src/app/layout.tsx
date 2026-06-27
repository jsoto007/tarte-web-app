import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const description =
  "Crafted coffee & cozy moments on the corner of Maple Row. Artisan espresso, handcrafted drinks, and fresh-baked pastries served slow — roasted, pulled, and baked in-house since 2014.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tarte — Coffee Shop & Bakes",
    template: "%s · Tarte",
  },
  description,
  applicationName: "Tarte",
  keywords: [
    "coffee shop",
    "bakery",
    "espresso",
    "pastries",
    "croissant",
    "cold brew",
    "Maple Row",
    "Tarte",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Tarte Coffee Shop & Bakes",
    title: "Tarte — Coffee Shop & Bakes",
    description,
    url: siteUrl,
    images: [
      {
        url: "/assets/hero-storefront.png",
        width: 1733,
        height: 907,
        alt: "The Tarte coffee shop storefront on Maple Row",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarte — Coffee Shop & Bakes",
    description,
    images: ["/assets/hero-storefront.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
