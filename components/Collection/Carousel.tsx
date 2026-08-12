"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const EDGE = 8;

type CarouselProps = {
  children: ReactNode;
};

export default function Carousel({ children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > EDGE);
    setCanNext(scrollLeft + clientWidth < scrollWidth - EDGE);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync, children]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".prod");
    const gap = 16;
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    const perPage = Math.max(1, Math.floor(el.clientWidth / amount));
    el.scrollBy({ left: dir * amount * perPage, behavior: "smooth" });
  };

  return (
    <div className="coll-carousel">
      <button
        type="button"
        className="coll-arrow prev"
        aria-label="Produits précédents"
        onClick={() => step(-1)}
        disabled={!canPrev}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <div className="prod-track" ref={trackRef}>
        {children}
      </div>
      <button
        type="button"
        className="coll-arrow next"
        aria-label="Produits suivants"
        onClick={() => step(1)}
        disabled={!canNext}
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
