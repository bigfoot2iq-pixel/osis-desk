import CTA from "@/components/CTA";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Value from "@/components/Value";
import Voices from "@/components/Voices";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "OASIS Desk",
  description:
    "Chaises de bureau, fauteuils ergonomiques et bureaux à Agadir.",
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
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Collection />
        <Value />
        <Process />
        <Voices />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
