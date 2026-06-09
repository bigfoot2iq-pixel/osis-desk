import { PHONE, PHONE_DISPLAY, SHOWROOM, whatsappUrl } from "@/lib/contact";

import RevealOnScroll from "./RevealOnScroll";

const badges = [
  "Livraison partout au Maroc",
  "Paiement à la livraison",
  "Garantie 5 ans",
];

export default function Showroom() {
  return (
    <section id="showroom">
      <div className="wrap">
        <div className="show-grid">
          <RevealOnScroll className="show-info">
            <span className="eyebrow">Showroom — {SHOWROOM.city}</span>
            <h2 className="h2">
              Venez l&apos;essayer
              <br />à <em>{SHOWROOM.city}</em>.
            </h2>
            <p className="lede">
              Touchez les matières, testez l&apos;assise. Notre équipe vous
              conseille — à l&apos;unité comme en gros.
            </p>

            <ul className="show-meta">
              <li>
                <span className="show-k">Adresse</span>
                <span className="show-v">{SHOWROOM.address}</span>
              </li>
              <li>
                <span className="show-k">Horaires</span>
                <span className="show-v">{SHOWROOM.hours}</span>
              </li>
              <li>
                <span className="show-k">Téléphone</span>
                <span className="show-v">
                  <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
                </span>
              </li>
            </ul>

            <div className="show-badges">
              {badges.map((badge) => (
                <span className="show-badge" key={badge}>
                  {badge}
                </span>
              ))}
            </div>

            <div className="show-actions">
              <a
                href={SHOWROOM.mapsLink}
                className="btn btn-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                Itinéraire <span className="arr">→</span>
              </a>
              <a
                href={whatsappUrl(
                  "Bonjour OASIS Desk, je souhaite passer au showroom à Agadir.",
                )}
                className="btn btn-outline-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prendre rendez-vous
              </a>
            </div>
          </RevealOnScroll>

          <div className="show-map">
            <iframe
              title="Carte du showroom OASIS Desk à Agadir"
              src={SHOWROOM.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
