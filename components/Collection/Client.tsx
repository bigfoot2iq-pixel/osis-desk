"use client";

import { useCatalog } from "@/components/CatalogContext";

import Carousel from "./Carousel";
import ProductCard from "./ProductCard";
import Tabs, { type TabItem } from "./Tabs";

export default function CollectionClient() {
  const {
    collections,
    categories,
    activeKey,
    activeCategory,
    products,
    setActiveKey,
    setSelected,
  } = useCatalog();

  if (!collections.length) return null;

  const tabs: TabItem[] = categories.map((category) => ({
    key: category.key,
    title: category.title,
    count: category.count,
  }));

  return (
    <div className="coll">
      <header className="coll-head">
        <div className="coll-head-text">
          <span className="eyebrow">Catalogue 2026 — 2027</span>
          <h2 className="h2">
            Quelques pièces à <em>découvrir</em>.
          </h2>
          <p className="lede" key={activeKey}>
            {activeCategory.description}
          </p>
        </div>
        <div className="coll-head-tabs">
          <Tabs tabs={tabs} activeKey={activeKey} onChange={setActiveKey} />
        </div>
      </header>

      <Carousel key={activeKey}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onOpen={setSelected} />
        ))}
      </Carousel>
    </div>
  );
}
