import { CatalogProvider } from "@/components/CatalogContext";
import CTA from "@/components/CTA";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Showroom from "@/components/Showroom";
import Stats from "@/components/Stats";
import SubNav from "@/components/SubNav";
import Value from "@/components/Value";
import Voices from "@/components/Voices";
import WhatsAppFab from "@/components/WhatsAppFab";
import { SEO_DESCRIPTION, SEO_KEYWORDS } from "@/lib/catalog";
import { EMAIL, PHONE, SHOWROOM } from "@/lib/contact";
import { getCatalog } from "@/sanity/data";

const SITE_URL = "https://oasisdeskmaroc.com";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": `${SITE_URL}/#business`,
  name: "OASIS Desk",
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS.join(", "),
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  logo: `${SITE_URL}/osis-logo.jpg`,
  priceRange: "$$",
  currenciesAccepted: "MAD",
  paymentAccepted: "Espèces, Paiement à la livraison, Virement bancaire",
  address: {
    "@type": "PostalAddress",
    // TODO: confirm exact street address before launch (must match Google Business Profile).
    streetAddress: "Av. Hassan II, Talborjt",
    postalCode: "80000",
    addressLocality: "Agadir",
    addressRegion: "Souss-Massa",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    // TODO: replace with the showroom's exact coordinates (currently Agadir centre).
    latitude: 30.4278,
    longitude: -9.5981,
  },
  hasMap: SHOWROOM.mapsLink,
  areaServed: [
    { "@type": "City", name: "Agadir" },
    { "@type": "Country", name: "Maroc" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  // TODO: add real profiles (Google Business, Facebook, Instagram) for entity trust.
  sameAs: [] as string[],
  makesOffer: [
    "Chaises de bureau",
    "Fauteuils de direction",
    "Bureaux",
    "Sièges de collectivité",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Product", name },
  })),
};

export default async function Home() {
  const collections = await getCatalog();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <CatalogProvider collections={collections}>
        <Nav />
        <SubNav />
        <main id="main">
          <Hero />
          <Stats />
          <Collection />
          <Value />
          <Process />
          <Voices />
          <Showroom />
          <CTA />
        </main>
        <Footer />
        <WhatsAppFab />
      </CatalogProvider>
    </>
  );
}
