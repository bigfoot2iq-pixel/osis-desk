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

  // Click-drag to scroll for mouse/pen; touch keeps native momentum scroll.
  // Uses window listeners (no setPointerCapture — capture retargets the click
  // and stops product cards from opening).
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = trackRef.current;
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
        // Cancel the click that ends the drag so a card doesn't open.
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
      <div className="prod-track" ref={trackRef} onPointerDown={onPointerDown}>
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
