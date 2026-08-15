import { EMAIL, HOURS, PHONE, PHONE_DISPLAY, SHOWROOM } from "@/lib/contact";

import Logo from "./Logo";

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
