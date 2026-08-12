"use client";

import { useCatalog } from "./CatalogContext";
import RevealOnScroll from "./RevealOnScroll";

function IconPlus() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M2 12h20" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12l4 4L21 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12c0 5-9 9-9 9s-9-4-9-9a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function Value() {
  const { collections } = useCatalog();
  const total = collections.reduce(
    (sum, collection) => sum + collection.products.length,
    0,
  );

  return (
    <section id="value">
      <div className="wrap">
        <div className="val-head">
          <RevealOnScroll>
            <span className="eyebrow">Pourquoi OASIS Desk</span>
            <h2 className="h2">
              Du mobilier pensé pour <em>durer</em>,
              <br />
              aussi exigeant que vos équipes.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll className="right d1">
            <p className="lede">
              Cinq engagements concrets, du premier devis au service
              après-vente.
            </p>
            <a href="#collection" className="btn btn-outline-ink">
              Voir le catalogue <span className="arr">→</span>
            </a>
          </RevealOnScroll>
        </div>

        <div className="bento">
          <RevealOnScroll className="bento-card span2 dark">
            <div className="bc-glyph">
              <IconPlus />
            </div>
            <div className="bc-title">
              {total > 0 ? `${total} références` : "Des références"}{" "}
              <em>sélectionnées</em>.
            </div>
            <p className="bc-text">
              Chaque modèle éprouvé pour un usage intensif — une sélection, pas
              un catalogue de revendeur.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card d1">
            <div className="bc-glyph">
              <IconCheck />
            </div>
            <div className="bc-title">
              Garantie <em>5 ans</em>.
            </div>
            <p className="bc-text">
              Pièces et main-d&apos;œuvre couvertes, intervention sous 48 h.
              Sans clause cachée.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card teal">
            <div className="bc-glyph">
              <IconClock />
            </div>
            <div className="bc-title">
              Devis <em>24 h</em>, livraison <em>72 h</em>.
            </div>
            <p className="bc-text">
              Stock permanent à Agadir, expédition partout au Maroc.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card d1">
            <div className="bc-glyph">
              <IconBuilding />
            </div>
            <div className="bc-title">
              À l&apos;unité ou en <em>gros</em>.
            </div>
            <p className="bc-text">
              D&apos;une chaise à 80 postes, un seul interlocuteur dédié.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card d2">
            <div className="bc-glyph">
              <IconPin />
            </div>
            <div className="bc-title">
              Showroom à <em>Agadir</em>.
            </div>
            <p className="bc-text">
              Essayez chaque assise avant de commander, sur rendez-vous.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
