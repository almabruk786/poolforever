import type { Metadata } from "next";
import Script from "next/script";
import { getSiteContent } from "@/lib/cms";
import "./globals.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    title: {
      default: content.metaTitle,
      template: "%s | POOL FOREVER"
    },
    description: content.metaDescription,
    keywords: ["swimming pool company", "luxury pool design", "pool construction", "jacuzzi", "rooftop pool", "resort pool"],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://poolforever.com"),
    openGraph: {
      title: "POOL FOREVER",
      description: content.metaDescription,
      siteName: "POOL FOREVER",
      images: ["/brand/og.svg"],
      type: "website"
    },
    robots: { index: true, follow: true }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "POOL FOREVER",
    description: "Luxury swimming pool design, construction, and maintenance company.",
    telephone: content.phone,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://poolforever.com",
    sameAs: [content.facebook],
    address: content.address
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
