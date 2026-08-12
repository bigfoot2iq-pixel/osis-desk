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
import { getCatalog } from "@/sanity/data";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "OASIS Desk",
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS.join(", "),
  url: "https://oasisdesk.ma",
  telephone: "+212624828155",
  email: "contact@oasisdesk.ma",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Agadir",
    addressCountry: "MA",
  },
  areaServed: "MA",
  priceRange: "$$",
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
        <main>
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
