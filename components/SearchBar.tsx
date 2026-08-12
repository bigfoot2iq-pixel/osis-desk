"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { productThumbUrl, searchCatalog } from "@/lib/catalog";
import type { CatalogCollection, CatalogProduct } from "@/sanity/types";

import { useCatalog } from "./CatalogContext";

type FlatOption =
  | { type: "product"; id: string; product: CatalogProduct }
  | { type: "collection"; id: string; collection: CatalogCollection };

const keyOf = (type: FlatOption["type"], id: string) => `${type}:${id}`;

export default function SearchBar() {
  const { collections, setActiveKey, setSelected } = useCatalog();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const results = useMemo(
    () => searchCatalog(collections, query),
    [collections, query],
  );

  // Flat, ordered list of selectable rows (mirrors render order) plus a lookup
  // from each row's key to its flat index, so keyboard navigation and
  // `aria-activedescendant` line up with what's rendered — no render-time counter.
  const { options, indexFor } = useMemo(() => {
    const flat: FlatOption[] = [];
    for (const group of results.groups) {
      for (const product of group.products) {
        flat.push({ type: "product", id: product._id, product });
      }
    }
    for (const collection of results.collections) {
      flat.push({ type: "collection", id: collection._id, collection });
    }
    const lookup = new Map<string, number>();
    flat.forEach((option, index) => lookup.set(keyOf(option.type, option.id), index));
    return {
      options: flat,
      indexFor: (type: FlatOption["type"], id: string) =>
        lookup.get(keyOf(type, id)) ?? -1,
    };
  }, [results]);

  const hasQuery = query.trim().length > 0;
  const showPanel = open && hasQuery;
  const activeIndex = Math.min(active, Math.max(0, options.length - 1));

  useEffect(() => {
    if (!showPanel) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [showPanel]);

  const optionId = (index: number) => `${listId}-opt-${index}`;

  const choose = (option: FlatOption) => {
    if (option.type === "product") {
      setSelected(option.product);
    } else {
      setActiveKey(option.collection._id);
      document
        .getElementById("collection")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      if (query) setQuery("");
      setOpen(false);
      return;
    }
    if (!showPanel || options.length === 0) {
      if (event.key === "ArrowDown") setOpen(true);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (Math.min(i, options.length - 1) + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(
        (i) =>
          (Math.min(i, options.length - 1) - 1 + options.length) %
          options.length,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) choose(option);
    }
  };

  return (
    <div className="search" ref={rootRef}>
      <div className="search-field">
        <svg
          className="search-ico"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="m20 20-3.5-3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Rechercher un fauteuil, un bureau, une catégorie…"
          value={query}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            showPanel && options[activeIndex] ? optionId(activeIndex) : undefined
          }
          autoComplete="off"
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => hasQuery && setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {hasQuery ? (
          <button
            type="button"
            className="search-clear"
            aria-label="Effacer la recherche"
            onClick={() => {
              setQuery("");
              setOpen(false);
              inputRef.current?.focus();
            }}
          >
            ×
          </button>
        ) : null}
      </div>

      {showPanel ? (
        <div className="search-panel" role="listbox" id={listId}>
          {options.length === 0 ? (
            <div className="search-empty">
              Aucun résultat pour « {query.trim()} ».
            </div>
          ) : (
            <>
              {results.groups.map((group) => (
                <div className="search-group" key={group.collection._id}>
                  <div className="search-group-head">
                    {group.collection.title}
                  </div>
                  {group.products.map((product) => {
                    const index = indexFor("product", product._id);
                    const thumb = productThumbUrl(product);
                    return (
                      <button
                        type="button"
                        key={product._id}
                        id={optionId(index)}
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`search-row${index === activeIndex ? " is-active" : ""}`}
                        onMouseEnter={() => setActive(index)}
                        onClick={() =>
                          choose({ type: "product", id: product._id, product })
                        }
                      >
                        <span className="search-thumb">
                          {thumb ? (
                            <Image
                              src={thumb}
                              alt=""
                              width={44}
                              height={44}
                              aria-hidden="true"
                            />
                          ) : (
                            <span className="search-thumb-ph" aria-hidden="true">
                              {product.name.charAt(0)}
                            </span>
                          )}
                        </span>
                        <span className="search-row-text">
                          <span className="search-row-name">{product.name}</span>
                          <span className="search-row-cat">
                            {product.categoryTitle ?? group.collection.title}
                          </span>
                        </span>
                        {product.price ? (
                          <span className="search-row-price">
                            {product.price}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ))}

              {results.collections.length ? (
                <div className="search-group">
                  <div className="search-group-head">Catégories</div>
                  {results.collections.map((collection) => {
                    const index = indexFor("collection", collection._id);
                    return (
                      <button
                        type="button"
                        key={collection._id}
                        id={optionId(index)}
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`search-row search-row-cat-item${index === activeIndex ? " is-active" : ""}`}
                        onMouseEnter={() => setActive(index)}
                        onClick={() =>
                          choose({
                            type: "collection",
                            id: collection._id,
                            collection,
                          })
                        }
                      >
                        <span
                          className="search-thumb search-thumb-cat"
                          aria-hidden="true"
                        >
                          #
                        </span>
                        <span className="search-row-text">
                          <span className="search-row-name">
                            {collection.title}
                          </span>
                          <span className="search-row-cat">
                            {collection.products.length} produits
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
