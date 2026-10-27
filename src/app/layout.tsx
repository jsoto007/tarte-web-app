import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import { homeTitle, pageMetadata, siteUrl, siteDescription } from "@/lib/seo";
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

// Site-wide defaults (OG/Twitter fallbacks), the same as the homepage's.
const homeMetadata = pageMetadata({
  title: homeTitle,
  description: siteDescription,
  path: "/",
});
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  ...homeMetadata,
  // The canonical lives on each page, so a page that forgets one never
  // canonicalizes to the homepage.
  alternates: undefined,
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: `%s | ${site.name}`,
  },
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
    "Pelham Bay bakery",
    "custom cakes Bronx",
    "birthday cakes Bronx",
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
  // Google Search Console HTML-tag verification — set the token in Netlify.
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
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
        <Analytics />
      </body>
    </html>
  );
}
