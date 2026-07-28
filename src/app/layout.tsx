import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl, siteDescription } from "@/lib/seo";
import { site } from "@/data/site";
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

const description = siteDescription;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tarte — Coffee Shop & Bakes in Pelham Bay, Bronx",
    template: "%s · Tarte",
  },
  description,
  applicationName: "Tarte",
  authors: [{ name: site.fullName, url: siteUrl }],
  creator: site.fullName,
  publisher: site.fullName,
  category: "food",
  manifest: "/manifest.webmanifest",
  keywords: [
    "coffee shop",
    "coffee shop Bronx",
    "coffee shop Pelham Bay",
    "bakery",
    "bakery Bronx",
    "bakery Pelham Bay",
    "cafe near Pelham Bay Park",
    "coffee shop 10461",
    "pastry shop",
    "espresso",
    "pastries",
    "homemade pastries",
    "fresh bread",
    "croissant",
    "cold brew",
    "breakfast",
    "sandwiches",
    "Middletown Road",
    "Bronx",
    "New York",
    "Tarte",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: true },
  // Classic geo meta tags — low-cost local-relevance hints for crawlers that
  // still read them (Bing, some directories). Coordinates match the JSON-LD.
  other: {
    "geo.region": "US-NY",
    "geo.placename": "Pelham Bay, Bronx, New York",
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Tarte Coffee Shop & Bakes",
    title: "Tarte — Coffee Shop & Bakes in Pelham Bay, Bronx",
    description,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/assets/hero-storefront.png",
        width: 1733,
        height: 907,
        alt: "The Tarte coffee shop storefront on Middletown Road",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarte — Coffee Shop & Bakes in Pelham Bay, Bronx",
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
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
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
