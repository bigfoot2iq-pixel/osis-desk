import { PHONE, PHONE_DISPLAY } from "@/lib/contact";

import QuoteForm from "./QuoteForm";
import RevealOnScroll from "./RevealOnScroll";

const checks = [
  "Devis sous 24 h",
  "Livraison & montage inclus",
  "Paiement à la livraison",
  "Garantie 5 ans",
];

export default function CTA() {
  return (
    <section id="cta">
      <RevealOnScroll className="cta-card">
        <div className="cta-l">
          <span className="cta-eyebrow">Devis gratuit</span>
          <h2 className="cta-h">
            Équipez votre bureau
            <br />
            <em>comme il le mérite</em>.
          </h2>
          <p className="cta-sub">
            Détail ou gros — dites-nous ce qu&apos;il vous faut, on répond sous
            24 h sans engagement.
          </p>
          <div className="cta-checklist">
            {checks.map((check) => (
              <div className="cta-check" key={check}>
                <span className="ck">✓</span> {check}
              </div>
            ))}
          </div>
          <a href={`tel:${PHONE}`} className="cta-call">
            Ou appelez-nous — {PHONE_DISPLAY}
          </a>
        </div>
        <div className="cta-r">
          <QuoteForm />
        </div>
      </RevealOnScroll>
    </section>
  );
}
