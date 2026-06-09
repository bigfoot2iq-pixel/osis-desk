import Logo from "./Logo";

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
              Chaises de bureau, fauteuils et bureaux à Agadir.
            </p>
            <div className="ft-mini">
              <span className="ft-mini-pulse" />
              <span className="ft-mini-text">Disponible — Lun-Ven, 9 h – 18 h</span>
            </div>
          </div>

          <div>
            <div className="ft-h">Contact</div>
            <ul className="ft-list">
              <li>
                <a href="tel:+212624828155">+212 624 828 155</a>
              </li>
              <li>
                <a href="mailto:contact@oasisdesk.ma">contact@oasisdesk.ma</a>
              </li>
              <li>Agadir, Maroc</li>
            </ul>
          </div>
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
