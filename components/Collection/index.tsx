import { Suspense } from "react";

import { getCatalog } from "@/sanity/data";

import CollectionClient from "./Client";

export default function Collection() {
  return (
    <Suspense fallback={<CollectionFallback />}>
      <CollectionContent />
    </Suspense>
  );
}

async function CollectionContent() {
  const collections = await getCatalog();

  return (
    <section id="collection">
      <div className="wrap">
        <CollectionClient collections={collections} />
      </div>
    </section>
  );
}

function CollectionFallback() {
  return (
    <section id="collection" aria-busy="true">
      <div className="wrap">
        <div className="coll-layout coll-skeleton" aria-hidden="true">
          <aside className="coll-aside">
            <div className="sk sk-eyebrow" />
            <div className="sk sk-title" />
            <div className="sk sk-title sk-title-short" />
            <div className="sk sk-copy" />
            <div className="sk sk-copy sk-copy-short" />
            <div className="sk-tabs">
              <div className="sk sk-pill" />
              <div className="sk sk-pill" />
              <div className="sk sk-pill" />
            </div>
            <div className="sk sk-button" />
          </aside>
          <div className="prod-grid">
            {Array.from({ length: 6 }, (_, index) => (
              <div className="prod prod-skeleton" key={index}>
                <div className="prod-fig sk" />
                <div className="prod-info">
                  <div className="sk sk-product-title" />
                  <div className="sk sk-product-copy" />
                  <div className="sk sk-product-link" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
