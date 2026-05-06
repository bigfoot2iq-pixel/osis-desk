import RevealOnScroll from "./RevealOnScroll";

function IconPlus() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M2 12h20" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12l4 4L21 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12c0 5-9 9-9 9s-9-4-9-9a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function Value() {
  return (
    <section id="value">
      <div className="wrap">
        <div className="val-head">
          <RevealOnScroll>
            <span className="eyebrow">Pourquoi OASIS Desk</span>
            <h2 className="h2">
              Du mobilier qui <em>travaille</em>
              <br />
              aussi dur que vous.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll className="right d1">
            <p className="lede">
              Nous équipons les directions, les open-spaces et les espaces
              d&apos;accueil des entreprises les plus exigeantes du Maroc. Ce
              qui suit, c&apos;est la différence que vous remarquerez.
            </p>
            <a href="#collection" className="btn btn-outline-ink">
              Découvrir les produits <span className="arr">→</span>
            </a>
          </RevealOnScroll>
        </div>

        <div className="bento">
          <RevealOnScroll className="bento-card span2 dark">
            <div className="bc-glyph">
              <IconPlus />
            </div>
            <div className="bc-num">— 01 / Sélection</div>
            <div className="bc-title">
              56 références <em>triées sur le volet</em>. Pas un catalogue, une
              curation.
            </div>
            <p className="bc-text">
              Chaque produit est testé, validé et garanti. Nous éliminons 9
              fauteuils sur 10 pour ne garder que ceux qui tiennent la promesse
              premium.
            </p>
            <div className="bc-swatches" aria-hidden="true">
              <div className="bc-swatch" style={{ background: "#1A1F1B" }} />
              <div className="bc-swatch" style={{ background: "#5B4A36" }} />
              <div className="bc-swatch" style={{ background: "#0E5F55" }} />
              <div className="bc-swatch" style={{ background: "#C8B89A" }} />
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card d1">
            <div className="bc-glyph">
              <IconCheck />
            </div>
            <div className="bc-num">— 02 / Garantie</div>
            <div className="bc-title">
              5 ans <em>de tranquillité</em>.
            </div>
            <p className="bc-text">
              Pièces détachées dispo, intervention sous 48 h, remplacement si
              défaut. Sans clauses cachées.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card teal">
            <div className="bc-glyph">
              <IconClock />
            </div>
            <div className="bc-num">— 03 / Délai</div>
            <div className="bc-title">
              Devis en <em>24 h</em>.
              <br />
              Livraison en 72 h.
            </div>
            <p className="bc-text">
              Stock permanent à Casablanca. Vos équipes assises avant la fin de
              la semaine.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card d1">
            <div className="bc-glyph">
              <IconBuilding />
            </div>
            <div className="bc-num">— 04 / Conseil</div>
            <div className="bc-title">
              Un interlocuteur, pas un <em>standard</em>.
            </div>
            <p className="bc-text">
              Abdellah Bentaleb, votre commercial dédié, du premier devis à la
              dernière livraison.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card d2">
            <div className="bc-glyph">
              <IconPin />
            </div>
            <div className="bc-num">— 05 / Local</div>
            <div className="bc-title">
              Showroom à <em>Casablanca</em>.
            </div>
            <p className="bc-text">
              Asseyez-vous, testez, comparez. Sur rendez-vous, du lundi au
              vendredi.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
