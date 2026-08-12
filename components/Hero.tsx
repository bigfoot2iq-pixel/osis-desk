"use client";

import { useMemo } from "react";
import { preload } from "react-dom";

import {
  ALL_KEY,
  DEFAULT_HERO_IMAGE,
  HERO,
  SERVICE_PROMISES,
  heroImageUrl,
} from "@/lib/catalog";
import type { CatalogProduct } from "@/sanity/types";

import { useCatalog } from "./CatalogContext";

function hasImage(product: CatalogProduct) {
  return (product.images ?? []).some((image) => image?.asset);
}

export default function Hero() {
  const {
    categories,
    activeKey,
    activeCategory,
    activeCollection,
    collections,
    setActiveKey,
    cycleCategory,
    setSelected,
  } = useCatalog();

  const images = useMemo(() => {
    const map = new Map<string, string | null>();
    for (const category of categories) {
      map.set(
        category.key,
        category.collection
          ? heroImageUrl(category.collection)
          : DEFAULT_HERO_IMAGE,
      );
    }
    return map;
  }, [categories]);

  // Warm every category background so switching is instant (no flash).
  images.forEach((url) => {
    if (url) preload(url, { as: "image" });
  });

  const activeImage = images.get(activeKey) ?? null;

  const featured = useMemo<CatalogProduct | null>(() => {
    if (activeCollection) {
      return (
        activeCollection.products.find(hasImage) ??
        activeCollection.products[0] ??
        null
      );
    }
    for (const collection of collections) {
      const withImage = collection.products.find(hasImage);
      if (withImage) return withImage;
    }
    return collections[0]?.products[0] ?? null;
  }, [activeCollection, collections]);

  const isAll = activeKey === ALL_KEY;
  const eyebrow = isAll
    ? HERO.eyebrow
    : `Collection · ${activeCategory.title}`;
  const sub = isAll
    ? HERO.sub
    : activeCollection?.description || activeCategory.description || HERO.sub;

  return (
    <section
      id="hero"
      className={activeImage ? "hero--image" : undefined}
    >
      <div className="hero-stage" aria-hidden="true">
        {categories.map((category) => {
          const url = images.get(category.key) ?? null;
          const on = category.key === activeKey;
          return (
            <div
              key={category.key}
              className={`hero-slide${on ? " is-active" : ""}${url ? "" : " hero-slide-abstract"}`}
              style={url ? { backgroundImage: `url(${url})` } : undefined}
            />
          );
        })}
        <div className="hero-scrim" />
      </div>

      {categories.length > 1 ? (
        <>
          <button
            type="button"
            className="hero-arrow prev"
            aria-label="Catégorie précédente"
            onClick={() => cycleCategory(-1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="hero-arrow next"
            aria-label="Catégorie suivante"
            onClick={() => cycleCategory(1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </>
      ) : null}

      <div className="hero-inner">
        <div className="hero-l">
          <span className="hero-tag">
            <span className="pulse" />
            {eyebrow}
          </span>
          <h1 className="hero-h1">
            <span className="lh">{HERO.titleLead}</span>{" "}
            <em className="lh">{HERO.titleEm}</em>
          </h1>
          <p className="hero-sub" key={activeKey}>
            {sub}
          </p>
          <div className="hero-actions">
            <a href="#cta" className="btn btn-primary">
              Devis gratuit en 24 h
              <span className="arr">↗</span>
            </a>
            <a href="#collection" className="btn btn-ghost">
              Voir le catalogue
            </a>
          </div>
          <ul className="hero-promises">
            {SERVICE_PROMISES.map((promise) => (
              <li key={promise}>
                <span className="hero-promise-dot" aria-hidden="true" />
                {promise}
              </li>
            ))}
          </ul>
          <div className="hero-meta">
            <div className="hero-stars" aria-label="Note cinq étoiles">
              ★★★★★
            </div>
            <div className="hero-meta-text">
              <strong>4.9/5</strong> · 12 entreprises équipées à Agadir
            </div>
          </div>
        </div>

        {featured ? (
          <button
            type="button"
            className="hero-card hero-card-main"
            onClick={() => setSelected(featured)}
            aria-label={`Voir ${featured.name}`}
          >
            <span className="hero-card-ping">
              <span className="dot" />
              En stock · Livraison 72 h
            </span>
            <span className="hero-card-meta">
              <span className="hcm-name">{featured.name}</span>
              {featured.price ? (
                <span className="hcm-price-block">
                  <span className="hcm-label">À partir de</span>
                  <span className="hcm-price">{featured.price}</span>
                </span>
              ) : null}
            </span>
          </button>
        ) : null}
      </div>

      {categories.length > 1 ? (
        <div className="hero-dots" role="tablist" aria-label="Catégories">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              role="tab"
              aria-selected={category.key === activeKey}
              aria-label={category.title}
              className={`hero-dot${category.key === activeKey ? " is-active" : ""}`}
              onClick={() => setActiveKey(category.key)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
