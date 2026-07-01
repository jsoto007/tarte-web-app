import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * AI assistant / answer-engine crawlers we explicitly welcome, so Tarte can be
 * surfaced and recommended by ChatGPT, Claude, Perplexity, Gemini, Google AI
 * Overviews, Bing Copilot, Apple Intelligence, etc. They inherit the "*" rule
 * anyway, but naming them makes the intent explicit and future-proof.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "Bingbot",
  "DuckDuckBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/__forms.html" },
      // Explicitly allow the full site (except the Netlify forms shim) to every
      // AI crawler, so nothing accidentally blocks assistant discovery.
      { userAgent: aiCrawlers, allow: "/", disallow: "/__forms.html" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
