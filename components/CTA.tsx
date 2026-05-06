import RevealOnScroll from "./RevealOnScroll";

const checks = [
  "Devis chiffré sous 24 h ouvrées",
  "Showroom physique à Agadir",
  "Vente à l'unité ou en gros",
  "Livraison & montage inclus",
  "Garantie 5 ans, SAV réactif",
];

export default function CTA() {
  return (
    <section id="cta">
      <RevealOnScroll className="cta-card">
        <span className="cta-art" aria-hidden="true">
          Antre.
        </span>
        <div className="cta-l">
          <h2 className="cta-h">
            Prêt à équiper
            <br />
            votre bureau <em>comme
            <br />
            il le mérite</em> ?
          </h2>
          <p className="cta-sub">
            Une chaise pour vous ou des dizaines pour vos équipes — devis
            gratuit sous 24 h, sans engagement.
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
