"use client";

import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { urlFor } from "@/sanity/client";
import type { CatalogImage, CatalogProduct } from "@/sanity/types";

import PortableText from "./PortableText";
import ProductIllustration from "./ProductIllustrations";

const WHATSAPP_NUMBER = "212624828155";

type ProductPanelProps = {
  product: CatalogProduct | null;
  onClose: () => void;
};

function buildImageUrl(image: CatalogImage, width: number, height: number) {
  return urlFor(image as SanityImageSource)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url();
}

function getFocusable(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null);
}

export default function ProductPanel({ product, onClose }: ProductPanelProps) {
  const [mounted, setMounted] = useState(false);
  // Keep the last product mounted through the slide-out animation.
  const [shown, setShown] = useState<CatalogProduct | null>(product);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Drive enter/exit transitions.
  useEffect(() => {
    if (product) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      setShown(product);
      setActive(0);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
  }, [product]);

  // Lock body scroll while a product is open.
  useEffect(() => {
    if (!product) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [product]);

  // Focus the panel on open, restore focus on close.
  useEffect(() => {
    if (visible && panelRef.current) {
      const focusables = getFocusable(panelRef.current);
      (focusables[0] ?? panelRef.current).focus();
    }
    if (!product && lastFocused.current) {
      lastFocused.current.focus?.();
    }
  }, [visible, product]);

  const images = (shown?.images ?? []).filter((img) => img?.asset);
  const total = images.length;

  const go = useCallback(
    (dir: number) => {
      if (total <= 1) return;
      setActive((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "Tab" && panelRef.current) {
        const focusables = getFocusable(panelRef.current);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [go, onClose],
  );

  const handleTransitionEnd = useCallback(
    (event: React.TransitionEvent) => {
      if (
        event.target === event.currentTarget &&
        event.propertyName === "transform" &&
        !product
      ) {
        setShown(null);
      }
    },
    [product],
  );

  if (!mounted || !shown) return null;

  const current = images[active] ?? null;
  const category = shown.categoryTitle;
  const specs = (shown.sub ?? "")
    .split(/[·•|]/)
    .map((part) => part.trim())
    .filter(Boolean);
  const waMessage = encodeURIComponent(
    `Bonjour OASIS Desk, je souhaite un devis pour : ${shown.name}.`,
  );
  const hasDescription = Array.isArray(shown.description)
    ? shown.description.length > 0
    : false;

  return createPortal(
    <div
      className={`pdp-root${visible ? " is-open" : ""}`}
      aria-hidden={!visible}
    >
      <button
        type="button"
        className="pdp-backdrop"
        aria-label="Fermer le panneau"
        tabIndex={-1}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className="pdp"
        role="dialog"
        aria-modal="true"
        aria-label={`Détails — ${shown.name}`}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        onTransitionEnd={handleTransitionEnd}
      >
        <button
          type="button"
          className="pdp-close"
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="pdp-scroll">
          <div className="pdp-gallery">
            <div className="pdp-stage">
              {shown.badge ? (
                <span
                  className={`prod-badge${shown.badge === "Premium" ? " gold" : ""}`}
                >
                  {shown.badge}
                </span>
              ) : null}
              {current ? (
                <Image
                  key={active}
                  className="pdp-img"
                  src={buildImageUrl(current, 1240, 1550)}
                  alt={current.alt || shown.name}
                  width={1240}
                  height={1550}
                  sizes="(max-width: 900px) 100vw, 560px"
                  placeholder={current.asset?.metadata?.lqip ? "blur" : "empty"}
                  blurDataURL={current.asset?.metadata?.lqip}
                  priority
                />
              ) : (
                <div className="pdp-illu">
                  <ProductIllustration type={shown.illustration} />
                </div>
              )}
              {total > 1 ? (
                <>
                  <button
                    type="button"
                    className="pdp-arrow pdp-arrow-prev"
                    aria-label="Image précédente"
                    onClick={() => go(-1)}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="pdp-arrow pdp-arrow-next"
                    aria-label="Image suivante"
                    onClick={() => go(1)}
                  >
                    ›
                  </button>
                  <div className="pdp-counter">
                    {active + 1} / {total}
                  </div>
                </>
              ) : null}
            </div>
            {total > 1 ? (
              <div className="pdp-thumbs" role="tablist" aria-label="Galerie">
                {images.map((image, index) => (
                  <button
                    key={image.asset?._id ?? index}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    aria-label={`Image ${index + 1}`}
                    className={`pdp-thumb${index === active ? " is-active" : ""}`}
                    onClick={() => setActive(index)}
                  >
                    <Image
                      src={buildImageUrl(image, 200, 250)}
                      alt={image.alt || `${shown.name} ${index + 1}`}
                      width={200}
                      height={250}
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="pdp-body">
            {category ? <span className="pdp-cat">{category}</span> : null}
            <h2 className="pdp-title">{shown.name}</h2>

            <div className="pdp-pricerow">
              {shown.price ? (
                <span className="pdp-price">{shown.price}</span>
              ) : (
                <span className="pdp-price pdp-price-quote">Sur devis</span>
              )}
              <span className="pdp-guarantee">Garantie 5 ans</span>
            </div>

            {specs.length ? (
              <ul className="pdp-specs">
                {specs.map((spec) => (
                  <li key={spec} className="pdp-spec">
                    {spec}
                  </li>
                ))}
              </ul>
            ) : null}

            {hasDescription ? (
              <div className="pdp-desc">
                <PortableText value={shown.description!} />
              </div>
            ) : (
              <p className="pdp-desc pdp-desc-empty">
                Pièce sélectionnée par OASIS Desk. Contactez-nous pour la fiche
                technique complète, les coloris disponibles et un devis adapté à
                votre volume.
              </p>
            )}

            <ul className="pdp-trust">
              <li>Livraison partout au Maroc</li>
              <li>Tarifs détail &amp; gros</li>
              <li>Showroom à Agadir</li>
            </ul>
          </div>
        </div>

        <div className="pdp-actions">
          <a href="#cta" className="btn btn-dark pdp-cta-main" onClick={onClose}>
            Demander un devis <span className="arr">→</span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
            className="btn btn-outline-ink pdp-cta-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
