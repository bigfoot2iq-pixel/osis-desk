"use client";

import { useCatalog } from "./CatalogContext";

export default function SubNav() {
  const { categories, activeKey, setActiveKey } = useCatalog();

  if (categories.length < 2) return null;

  return (
    <nav className="subnav" aria-label="Catégories de produits">
      <div className="subnav-inner">
        <ul className="subnav-list" role="tablist">
          {categories.map((category) => (
            <li key={category.key}>
              <button
                type="button"
                role="tab"
                aria-selected={category.key === activeKey}
                className={`subnav-item${category.key === activeKey ? " on" : ""}`}
                onClick={() => setActiveKey(category.key)}
              >
                {category.title}
                <span className="subnav-count">{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
        <a href="#collection" className="subnav-all">
          Voir le catalogue <span className="arr">→</span>
        </a>
      </div>
    </nav>
  );
}
