"use client";

import { ALL_KEY, productThumbUrl } from "@/lib/catalog";
import type { Category } from "@/lib/catalog";

import { useCatalog } from "./CatalogContext";

// First product photo of a category, used for the circular thumbnail.
function categoryThumb(category: Category): string | null {
  for (const product of category.collection?.products ?? []) {
    const url = productThumbUrl(product);
    if (url) return url;
  }
  return null;
}

export default function SubNav() {
  const { categories, activeKey, setActiveKey } = useCatalog();

  // Hide the "Tous" catch-all — real collections only.
  const items = categories.filter((category) => category.key !== ALL_KEY);

  if (items.length < 2) return null;

  return (
    <nav className="subnav" aria-label="Catégories de produits">
      <div className="subnav-inner">
        <ul className="subnav-list" role="tablist">
          {items.map((category) => {
            const thumb = categoryThumb(category);
            return (
              <li key={category.key}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={category.key === activeKey}
                  className={`subnav-item${category.key === activeKey ? " on" : ""}`}
                  onClick={() => setActiveKey(category.key)}
                >
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="subnav-thumb" src={thumb} alt="" loading="lazy" />
                  ) : (
                    <span className="subnav-thumb subnav-thumb-empty" aria-hidden="true" />
                  )}
                  <span className="subnav-label">{category.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <a href="#collection" className="subnav-all">
          Voir le catalogue <span className="arr">→</span>
        </a>
      </div>
    </nav>
  );
}
