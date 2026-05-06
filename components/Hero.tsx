export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg-noise" />

      <div className="hero-inner">
        <div className="hero-l">
          <span className="hero-tag">
            <span className="pulse" />
            Collection 2026
          </span>
          <h1 className="hero-h1">
            <span className="lh">Asseyez votre</span>{" "}
            <em className="lh">autorité.</em>
          </h1>
          <p className="hero-sub">
            Chaises, fauteuils et bureaux pour entreprises et particuliers à
            Agadir. À l&apos;unité ou en gros — chaque pièce pensée pour durer
            dix ans, avec garantie et SAV.
          </p>
          <div className="hero-actions">
            <a href="#cta" className="btn btn-primary">
              Devis gratuit en 24 h
              <span className="arr">↗</span>
            </a>
            <a href="#collection" className="btn btn-ghost">
              Voir le catalogue
            </a>
          </div>
          <div className="hero-meta">
            <div className="hero-stars" aria-label="Note cinq étoiles">
              ★★★★★
            </div>
            <div className="hero-meta-text">
              <strong>4.9/5</strong> · 12 entreprises équipées à Agadir
            </div>
          </div>
        </div>

        <div className="hero-r">
          <div className="hero-card-stage">
            <div className="hero-stat-bg">
              10<sup>ans</sup>
            </div>

            <div className="hero-card hero-card-main">
              <div className="hero-card-meta">
                <div className="hcm-name">
                  Fauteuil Président
                  <br />
                  Exécutif
                </div>
                <div className="hcm-price-block">
                  <div className="hcm-label">À partir de</div>
                  <div className="hcm-price">7 200 MAD</div>
                </div>
              </div>
            </div>

            <div className="hero-card hero-card-ping">
              <span className="dot" />
              En stock · Livraison 72 h
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
