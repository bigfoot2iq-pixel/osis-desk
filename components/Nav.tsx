"use client";

import { useEffect, useState } from "react";

import { whatsappUrl } from "@/lib/contact";

import Logo from "./Logo";

const links = [
  { href: "#collection", label: "Collection" },
  { href: "#value", label: "Pourquoi nous" },
  { href: "#process", label: "Processus" },
  { href: "#voices", label: "Témoignages" },
  { href: "#showroom", label: "Showroom" },
];

export default function Nav() {
  const [lit, setLit] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setLit(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav id="nav" className={lit ? "lit" : undefined}>
        <a href="#" className="logo" aria-label="OASIS Desk accueil" onClick={close}>
          <Logo />
        </a>
        <div className="nav-r">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#cta" className="nav-cta nav-cta-desktop">
            Devis gratuit <span className="arr">↗</span>
          </a>
          <button
            type="button"
            className={`nav-burger${open ? " is-open" : ""}`}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <ul className="mobile-menu-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#cta" className="btn btn-primary mobile-menu-cta" onClick={close}>
          Devis gratuit en 24 h <span className="arr">↗</span>
        </a>
        <a href="tel:+212624828155" className="mobile-menu-phone" onClick={close}>
          +212 624 828 155
        </a>
        <a
          href={whatsappUrl("Bonjour OASIS Desk, j'ai une question.")}
          className="mobile-menu-phone"
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
