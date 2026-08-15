import type { ReactNode } from "react";

import {
  EMAIL,
  HOURS,
  PHONE,
  PHONE_DISPLAY,
  SHOWROOM,
  SOCIAL_LINKS,
} from "@/lib/contact";

import Logo from "./Logo";

const socialIcon: Record<string, ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9V7.2c0-.8.2-1.2 1.3-1.2H17V3.1C16.6 3 15.6 3 14.5 3 12 3 10.5 4.5 10.5 7v2H8v3h2.5v9H14v-9h2.6l.4-3H14z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v2.5c-1.3.1-2.5-.3-3.6-1v6.3c0 3.2-2.4 5.6-5.5 5.6-3 0-5.4-2.3-5.4-5.3 0-3.2 2.7-5.5 6-5.1v2.7c-.4-.1-.8-.2-1.2-.2-1.4 0-2.4 1-2.4 2.5 0 1.5 1.1 2.5 2.5 2.5 1.5 0 2.5-1.1 2.5-2.9V3h3.6z" />
    </svg>
  ),
};

const catalogue = [
  { href: "#collection", label: "Fauteuils de direction" },
  { href: "#collection", label: "Chaises opérateur & visiteur" },
  { href: "#collection", label: "Bureaux & mobilier métallique" },
  { href: "#collection", label: "Accessoires & pièces détachées" },
  { href: "#collection", label: "Tout le catalogue" },
];

const company = [
  { href: "#value", label: "Pourquoi nous" },
  { href: "#process", label: "Notre méthode" },
  { href: "#voices", label: "Témoignages" },
  { href: "#showroom", label: "Showroom Agadir" },
];

const badges = [
  "Paiement à la livraison",
  "Livraison partout au Maroc",
  "Garantie 5 ans",
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="ft-top">
          <div>
            <div className="ft-mark">
              <Logo />
            </div>
            <p className="ft-tag">
              Mobilier de bureau à Agadir : chaises opérateur et visiteur,
              fauteuils de direction ergonomiques, bureaux, armoires et
              classeurs métalliques, tabourets et accessoires. Vente à
              l&apos;unité et en gros. Livraison partout au Maroc — Agadir,
              Casablanca, Rabat, Marrakech, Tanger, Fès.
            </p>
            <div className="ft-mini">
              <span className="ft-mini-pulse" />
              <span className="ft-mini-text">Ouvert — {HOURS}</span>
            </div>
          </div>

          <div>
            <div className="ft-h">Catalogue</div>
            <ul className="ft-list">
              {catalogue.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="ft-h">Entreprise</div>
            <ul className="ft-list">
              {company.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="ft-h">Contact</div>
            <ul className="ft-list">
              <li>
                <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li className="ft-list-plain">{SHOWROOM.address}</li>
            </ul>
            <div className="ft-social">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                >
                  {socialIcon[s.key]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ft-badges">
          {badges.map((badge) => (
            <span className="ft-badge" key={badge}>
              <span className="ft-badge-tick" aria-hidden="true">
                ✓
              </span>
              {badge}
            </span>
          ))}
        </div>

        <div className="ft-huge" aria-hidden="true">
          OASIS
        </div>
        <div className="ft-bot">
          <div className="ft-cp">© 2026 OASIS Desk · Tous droits réservés</div>
          <div className="ft-legal">
            <a href="/mentions-legales">Mentions légales</a>
            <a href="/confidentialite">Confidentialité</a>
            <a href="/cgv">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
