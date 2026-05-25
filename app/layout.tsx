import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "POOL FOREVER | Luxury Swimming Pool Design and Construction",
    template: "%s | POOL FOREVER"
  },
  description: "Premium swimming pool design, construction, renovation, Jacuzzi, fountain, resort pool, rooftop pool, and maintenance services.",
  keywords: ["swimming pool company", "luxury pool design", "pool construction", "jacuzzi", "rooftop pool", "resort pool"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://poolforever.com"),
  openGraph: {
    title: "POOL FOREVER",
    description: "Build your dream pool with a premium international-standard swimming pool company.",
    siteName: "POOL FOREVER",
    images: ["/brand/og.svg"],
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "POOL FOREVER",
    description: "Luxury swimming pool design, construction, and maintenance company.",
    telephone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880 1XXX XXXXXX",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://poolforever.com",
    sameAs: [process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/poolforever"]
  };

  return (
    <html lang="en">
      <body className="noise font-sans">
        {children}
        <Script id="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
