const footerColumns = [
  {
    title: "Collections",
    links: ["Direction", "Productif", "Pause & Café", "Bureaux", "Rangements"],
  },
  {
    title: "Entreprise",
    links: ["Notre approche", "Catalogue 2026", "Références", "Showroom"],
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="ft-top">
          <div>
            <div className="ft-mark">
              <span className="logo-mark">O</span>
              OASIS Desk
            </div>
            <p className="ft-tag">
              Mobilier de bureau d&apos;exception. Direction, productif,
              accueil — pour les entreprises qui prennent leurs assises au
              sérieux.
            </p>
            <div className="ft-mini">
              <span className="ft-mini-pulse" />
              <span className="ft-mini-text">Disponible — Lun-Ven, 9 h – 18 h</span>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <div className="ft-h">{column.title}</div>
              <ul className="ft-list">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#collection">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="ft-h">Contact</div>
            <ul className="ft-list">
              <li>
                <a href="tel:+212624828155">+212 624 828 155</a>
              </li>
              <li>
                <a href="mailto:contact@oasisdesk.ma">contact@oasisdesk.ma</a>
              </li>
              <li>
                <a href="#cta">Casablanca, Maroc</a>
              </li>
              <li>
                <a href="#cta">Demander un devis</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ft-huge" aria-hidden="true">
          OASIS
        </div>
        <div className="ft-bot">
          <div className="ft-cp">© 2026 OASIS Desk · Tous droits réservés</div>
          <div className="ft-legal">
            <a href="#">Mentions légales</a>
            <a href="#">Confidentialité</a>
            <a href="#">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
