"use client";

import { useMemo, useState } from "react";

import type { CatalogCollection, CatalogProduct } from "@/sanity/types";

import ProductCard from "./ProductCard";
import ProductPanel from "./ProductPanel";
import Tabs, { type TabItem } from "./Tabs";

const ALL_KEY = "__all__";

const DEFAULT_LEDE =
  "Sélection curée pour les directions, open-spaces et espaces d'accueil. Chaque pièce testée, garantie 5 ans.";

type CollectionClientProps = {
  collections: CatalogCollection[];
};

export default function CollectionClient({
  collections,
}: CollectionClientProps) {
  const showAll = collections.length > 1;
  // Tabs are identified by the stable `_id`, not the user-defined `key`, which
  // can be null/missing on documents created via the API or before validation.
  const [activeKey, setActiveKey] = useState(
    showAll ? ALL_KEY : collections[0]?._id || "",
  );
  const [selected, setSelected] = useState<CatalogProduct | null>(null);

  const tabs = useMemo<TabItem[]>(() => {
    const collectionTabs = collections.map((collection) => ({
      key: collection._id,
      title: collection.title,
      count: collection.products.length,
    }));
    if (!showAll) return collectionTabs;
    const total = collections.reduce((sum, c) => sum + c.products.length, 0);
    return [{ key: ALL_KEY, title: "Tous", count: total }, ...collectionTabs];
  }, [collections, showAll]);

  const activeCollection = useMemo(
    () => collections.find((collection) => collection._id === activeKey),
    [activeKey, collections],
  );

  const products = useMemo(() => {
    if (activeKey === ALL_KEY) {
      return collections.flatMap((collection) => collection.products);
    }
    return activeCollection?.products ?? [];
  }, [activeKey, activeCollection, collections]);

  if (!collections.length) {
    return null;
  }

  const lede =
    activeKey !== ALL_KEY && activeCollection?.description
      ? activeCollection.description
      : DEFAULT_LEDE;

  return (
    <div className="coll-layout">
      <aside className="coll-aside">
        <span className="eyebrow">Catalogue 2026 — 2027</span>
        <h2 className="h2">
          Quelques pièces
          <br />à <em>découvrir</em>.
        </h2>
        <p className="lede" key={activeKey}>
          {lede}
        </p>
        <Tabs tabs={tabs} activeKey={activeKey} onChange={setActiveKey} />
      </aside>
      <div className="prod-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onOpen={setSelected} />
        ))}
      </div>

      <ProductPanel product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
