"use client";

import { useRef } from "react";

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

  const listRef = useRef<HTMLUListElement>(null);
  // Drag-to-scroll (mouse + touch). Native touch scroll was unreliable here,
  // so JS owns panning; `touch-action: none` in CSS hands us every gesture.
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = listRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    el.classList.add("dragging");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = listRef.current;
    const d = drag.current;
    if (!el || !d.active) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    el.scrollLeft = d.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = listRef.current;
    if (!drag.current.active) return;
    drag.current.active = false;
    el?.classList.remove("dragging");
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  // Hide the "Tous" catch-all — real collections only.
  const items = categories.filter((category) => category.key !== ALL_KEY);

  if (items.length < 2) return null;

  return (
    <nav className="subnav" aria-label="Catégories de produits">
      <div className="subnav-inner">
        <ul
          className="subnav-list"
          role="tablist"
          ref={listRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {items.map((category) => {
            const thumb = categoryThumb(category);
            return (
              <li key={category.key}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={category.key === activeKey}
                  className={`subnav-item${category.key === activeKey ? " on" : ""}`}
                  onClick={() => {
                    // Swallow the click that ends a drag so it doesn't switch tab.
                    if (drag.current.moved) {
                      drag.current.moved = false;
                      return;
                    }
                    setActiveKey(category.key);
                  }}
                >
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="subnav-thumb" src={thumb} alt="" loading="lazy" draggable={false} />
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
