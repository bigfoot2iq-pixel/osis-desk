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
  // Desktop mouse/pen drag-to-scroll. Mobile uses native swipe. Window
  // listeners (no setPointerCapture, which would retarget the tab click).
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType === "touch") return;
    const el = listRef.current;
    if (!el) return;
    const startX = e.clientX;
    const startScroll = el.scrollLeft;
    let moved = false;
    el.classList.add("dragging");

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.classList.remove("dragging");
      if (moved) {
        const swallow = (ce: MouseEvent) => {
          ce.stopPropagation();
          ce.preventDefault();
        };
        el.addEventListener("click", swallow, { capture: true, once: true });
        setTimeout(
          () => el.removeEventListener("click", swallow, { capture: true }),
          0,
        );
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
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
                  onClick={() => setActiveKey(category.key)}
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
