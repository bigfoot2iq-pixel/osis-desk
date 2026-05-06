"use client";

import { useMemo, useState } from "react";

import type { CatalogCollection } from "@/sanity/types";

import ProductCard from "./ProductCard";
import Tabs from "./Tabs";

type CollectionClientProps = {
  collections: CatalogCollection[];
};

export default function CollectionClient({
  collections,
}: CollectionClientProps) {
  const firstKey = collections[0]?.key || "";
  const [activeKey, setActiveKey] = useState(firstKey);

  const activeCollection = useMemo(
    () =>
      collections.find((collection) => collection.key === activeKey) ||
      collections[0],
    [activeKey, collections],
  );

  if (!collections.length || !activeCollection) {
    return null;
  }

  return (
    <div className="coll-layout">
      <aside className="coll-aside">
        <span className="eyebrow">Catalogue 2026 — 2027</span>
        <h2 className="h2">
          Quelques pièces
          <br />à <em>découvrir</em>.
        </h2>
        <p className="lede">
          Sélection curée pour les directions, open-spaces et espaces
          d&apos;accueil. Chaque pièce testée, garantie 5 ans.
        </p>
        <Tabs
          collections={collections}
          activeKey={activeCollection.key}
          onChange={setActiveKey}
        />
        <a
          href="#cta"
          className="btn btn-outline-ink"
          style={{ alignSelf: "flex-start", marginTop: ".5rem" }}
        >
          Demander un devis <span className="arr">→</span>
        </a>
      </aside>
      <div className="prod-grid">
        {activeCollection.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
