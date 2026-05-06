import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL("https://oasisdesk.ma"),
  title:
    "OASIS Desk | Chaises de bureau, fauteuils & bureaux à Agadir — détail & gros",
  description:
    "Vente de chaises de bureau, fauteuils ergonomiques et bureaux à Agadir. À l'unité pour particuliers ou en gros pour entreprises. Showroom à Agadir, livraison au Maroc, garantie 5 ans.",
  keywords: [
    "chaise de bureau Agadir",
    "fauteuil de bureau Maroc",
    "bureau Agadir",
    "mobilier de bureau Agadir",
    "chaise ergonomique Maroc",
    "fauteuil président",
    "vente en gros mobilier bureau",
    "chaise bureau pas cher Maroc",
    "bureau pour entreprise",
    "chaise de bureau particulier",
    "OASIS Desk",
  ],
  openGraph: {
    title:
      "OASIS Desk | Chaises, fauteuils & bureaux à Agadir — détail & gros",
    description:
      "Chaises de bureau, fauteuils et bureaux à Agadir. À l'unité ou en gros, pour particuliers et entreprises. Showroom à Agadir.",
    locale: "fr_MA",
    type: "website",
  },
  alternates: {
    canonical: "https://oasisdesk.ma",
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
