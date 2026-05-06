"use client";

import { useEffect, useRef } from "react";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function RevealOnScroll({
  children,
  className,
  style,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.classList.add("in");
        observer.unobserve(node);
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={["r", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </div>
  );
}
