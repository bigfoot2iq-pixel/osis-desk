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
  // Click-drag to scroll for mouse/pen. Touch keeps native momentum scroll.
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

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

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // let mobile use native scroll
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.classList.add("dragging");
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const d = drag.current;
    if (!el || !d.active) return;
    e.preventDefault();
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    el.scrollLeft = d.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!drag.current.active) return;
    drag.current.active = false;
    el?.classList.remove("dragging");
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  // Swallow the click that fires after a drag so a card doesn't open.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
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
      <div
        className="prod-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
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
