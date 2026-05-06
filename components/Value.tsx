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
              Cinq raisons. Lisez en dix secondes.
            </p>
            <a href="#collection" className="btn btn-outline-ink">
              Voir le catalogue <span className="arr">→</span>
            </a>
          </RevealOnScroll>
        </div>

        <div className="bento">
          <RevealOnScroll className="bento-card span2 dark">
            <div className="bc-glyph">
              <IconPlus />
            </div>
            <div className="bc-title">
              56 références <em>triées</em>.
            </div>
            <p className="bc-text">
              Pas un catalogue. Une curation.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card d1">
            <div className="bc-glyph">
              <IconCheck />
            </div>
            <div className="bc-title">
              Garantie <em>5 ans</em>.
            </div>
            <p className="bc-text">
              Pièces, intervention 48 h. Sans clauses cachées.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card teal">
            <div className="bc-glyph">
              <IconClock />
            </div>
            <div className="bc-title">
              Devis <em>24 h</em>, livraison <em>72 h</em>.
            </div>
            <p className="bc-text">
              Stock permanent à Agadir.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card d1">
            <div className="bc-glyph">
              <IconBuilding />
            </div>
            <div className="bc-title">
              Unité ou <em>gros</em>.
            </div>
            <p className="bc-text">
              Une chaise ou 80 postes. Même interlocuteur.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="bento-card d2">
            <div className="bc-glyph">
              <IconPin />
            </div>
            <div className="bc-title">
              Showroom <em>Agadir</em>.
            </div>
            <p className="bc-text">
              Asseyez-vous, testez. Sur rendez-vous.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
