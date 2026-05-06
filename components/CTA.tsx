import RevealOnScroll from "./RevealOnScroll";

const checks = [
  "Devis sous 24 h",
  "Livraison & montage inclus",
  "Garantie 5 ans",
];

export default function CTA() {
  return (
    <section id="cta">
      <RevealOnScroll className="cta-card">
        <div className="cta-l">
          <h2 className="cta-h">
            Équipez votre bureau
            <br />
            <em>comme il le mérite</em>.
          </h2>
          <p className="cta-sub">
            Devis gratuit sous 24 h. Sans engagement.
          </p>
          <div className="cta-actions">
            <a href="tel:+212624828155" className="btn cta-btn-light">
              Appeler — +212 624 828 155
            </a>
            <a href="mailto:contact@oasisdesk.ma" className="btn cta-btn-outline">
              Demander par e-mail
            </a>
          </div>
        </div>
        <div className="cta-r">
          <div className="cta-checklist">
            {checks.map((check) => (
              <div className="cta-check" key={check}>
                <span className="ck">✓</span> {check}
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
