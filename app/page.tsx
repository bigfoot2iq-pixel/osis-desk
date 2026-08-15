import type { Metadata } from "next";

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
import {
  buildKeywords,
  buildOfferedProducts,
  SEO_DESCRIPTION,
} from "@/lib/catalog";
import { EMAIL, PHONE, SHOWROOM, SOCIALS } from "@/lib/contact";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { CatalogCollection } from "@/sanity/types";
import { getCatalog } from "@/sanity/data";

/** Business + product structured data, built from the live catalog so the
 *  offered product types and keywords track whatever is actually in stock. */
function buildJsonLd(collections: CatalogCollection[]) {
  const catalogItems = collections.flatMap((collection) =>
    collection.products.map((product) => ({
      "@type": "Offer",
      category: collection.title.trim(),
      itemOffered: {
        "@type": "Product",
        name: product.name.trim(),
        category: collection.title.trim(),
        ...(product.price
          ? {
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: "MAD",
              },
            }
          : {}),
      },
    })),
  );

  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    description: SEO_DESCRIPTION,
    keywords: buildKeywords(collections).join(", "),
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
      streetAddress: "Rue Al Khawarezmi, Quartier El Massira",
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
    sameAs: [SOCIALS.instagram, SOCIALS.facebook, SOCIALS.tiktok],
    makesOffer: buildOfferedProducts(collections).map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catalogue mobilier de bureau",
      itemListElement: catalogItems,
    },
  };
}

// Product-driven metadata: keywords track the live catalog, so a new category
// in Sanity widens the home page's keyword footprint on the next revalidate —
// no code change needed. Catalog fetch is cached, shared with the page body.
export async function generateMetadata(): Promise<Metadata> {
  const collections = await getCatalog();
  return {
    keywords: [...buildKeywords(collections), SITE_NAME],
  };
}

export default async function Home() {
  const collections = await getCatalog();
  const jsonLd = buildJsonLd(collections);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
