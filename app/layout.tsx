import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SEO_DESCRIPTION, SEO_KEYWORDS } from "@/lib/catalog";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "OASIS Desk | Chaises, fauteuils de direction & mobilier de bureau à Agadir — détail & gros",
  description: SEO_DESCRIPTION,
  keywords: [...SEO_KEYWORDS, SITE_NAME],
  openGraph: {
    title:
      "OASIS Desk | Chaises, fauteuils de direction & mobilier de bureau au Maroc",
    description:
      "Chaises opérateur & visiteur, fauteuils de direction, armoires métalliques et accessoires. À l'unité ou en gros. Showroom à Agadir, livraison partout au Maroc.",
    url: SITE_URL,
    locale: "fr_MA",
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "OASIS Desk | Mobilier de bureau à Agadir & partout au Maroc",
    description:
      "Chaises, fauteuils de direction, mobilier métallique et accessoires. À l'unité ou en gros. Livraison partout au Maroc.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0e120f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Preload the default hero shot (LCP) so it paints without waiting on CSS. */}
        <link
          rel="preload"
          as="image"
          href="/oasis-desk-site.jpg"
          fetchPriority="high"
        />
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
