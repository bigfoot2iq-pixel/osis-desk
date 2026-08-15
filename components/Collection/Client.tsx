"use client";

import { useMemo, useState } from "react";

import { useCatalog } from "@/components/CatalogContext";
import { ALL_KEY, DEFAULT_LEDE } from "@/lib/catalog";

import ProductCard from "./ProductCard";
import Tabs, { type TabItem } from "./Tabs";

// Products revealed per page. On the desktop 4-column grid this is exactly
// two rows; the "Voir plus" button then loads the next batch.
const PAGE_SIZE = 8;

export default function CollectionClient() {
  const { collections, activeKey, setActiveKey, setSelected } = useCatalog();

  // The section always browses a real collection — never the "Tous" catch-all.
  // If the shared active key is a collection (e.g. picked from the hero/subnav)
  // we follow it; otherwise we default to the first collection.
  const firstKey = collections[0]?._id ?? null;
  const selectedKey = useMemo(() => {
    if (activeKey !== ALL_KEY && collections.some((c) => c._id === activeKey)) {
      return activeKey;
    }
    return firstKey;
  }, [activeKey, collections, firstKey]);

  const selectedCollection = useMemo(
    () => collections.find((c) => c._id === selectedKey) ?? collections[0],
    [collections, selectedKey],
  );

  const products = selectedCollection?.products ?? [];

  // Reveal count resets whenever the visitor switches collections. Reset during
  // render (React's "adjust state on prop change" pattern) rather than in an
  // effect, so the grid never flashes the previous page's length.
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [prevKey, setPrevKey] = useState(selectedKey);
  if (prevKey !== selectedKey) {
    setPrevKey(selectedKey);
    setVisible(PAGE_SIZE);
  }

  if (!collections.length || !selectedCollection) return null;

  const tabs: TabItem[] = collections.map((collection) => ({
    key: collection._id,
    title: collection.title,
    count: collection.products.length,
  }));

  const shown = products.slice(0, visible);
  const remaining = products.length - shown.length;

  return (
    <div className="coll">
      <header className="coll-head">
        <div className="coll-head-text">
          <span className="eyebrow">Catalogue 2026 — 2027</span>
          <h2 className="h2">
            Quelques pièces à <em>découvrir</em>.
          </h2>
          <p className="lede" key={selectedKey}>
            {selectedCollection.description || DEFAULT_LEDE}
          </p>
        </div>
        <div className="coll-head-tabs">
          <Tabs tabs={tabs} activeKey={selectedKey ?? ""} onChange={setActiveKey} />
        </div>
      </header>

      <div className="coll-grid" key={selectedKey}>
        {shown.map((product) => (
          <ProductCard key={product._id} product={product} onOpen={setSelected} />
        ))}
      </div>

      {remaining > 0 ? (
        <div className="coll-more">
          <button
            type="button"
            className="coll-more-btn"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Voir plus de produits
            <span className="coll-more-count">
              {remaining} restant{remaining > 1 ? "s" : ""}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
