"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#collection", label: "Collection" },
  { href: "#value", label: "Pourquoi nous" },
  { href: "#process", label: "Processus" },
  { href: "#voices", label: "Témoignages" },
];

export default function Nav() {
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const onScroll = () => setLit(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="nav" className={lit ? "lit" : undefined}>
      <a href="#" className="logo" aria-label="OASIS Desk accueil">
        <span className="logo-mark">O</span>
        <span>OASIS Desk</span>
      </a>
      <div className="nav-r">
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a href="#cta" className="nav-cta">
          Devis gratuit <span className="arr">↗</span>
        </a>
      </div>
    </nav>
  );
}
