import RevealOnScroll from "./RevealOnScroll";

const voices = [
  {
    delay: "d1",
    avatar: "av1",
    quote:
      "« Livraison en 4 jours, montage soigné, fauteuils irréprochables. C'est rare en B2B. »",
    name: "Nadia Cherif",
    role: "Resp. Facilities · Cabinet Meridian",
  },
  {
    delay: "d2",
    avatar: "av2",
    quote:
      "« Notre espace d'accueil a été transformé. Les visiteurs nous font la remarque à chaque visite. »",
    name: "Sofiane Mrad",
    role: "DRH · Technova Industries",
  },
  {
    delay: "d3",
    avatar: "av3",
    quote:
      "« Le seul fournisseur qui a pris le temps de comprendre nos enjeux avant de proposer un budget. »",
    name: "Yasmine Ouali",
    role: "COO · Nextlab Maroc",
  },
];

export default function Voices() {
  return (
    <section id="voices">
      <div className="wrap">
        <RevealOnScroll style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <span className="eyebrow">Ils nous font confiance</span>
          <h2 className="h2">
            120+ entreprises ont déjà
            <br />
            choisi <em>leurs assises</em> avec nous.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll className="voice-feat">
          <div className="voice-feat-inner">
            <p className="voice-feat-q">
              « OASIS Desk a équipé 78 postes en deux semaines. La sélection
              était juste, le SAV est <em>impeccable</em>, et nos
              collaborateurs n&apos;ont jamais eu d&apos;aussi bons retours sur
              leur poste de travail. »
            </p>
            <div className="voice-feat-meta">
              <div className="vfm-stars">★★★★★</div>
              <div>
                <div className="vfm-name">Karim Benali</div>
                <div className="vfm-role">Directeur Général</div>
              </div>
              <div className="vfm-co">Groupe Altitude · Casablanca</div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="voice-grid">
          {voices.map((voice) => (
            <RevealOnScroll key={voice.name} className={`voice ${voice.delay}`}>
              <div className="voice-stars">★★★★★</div>
              <p className="voice-q">{voice.quote}</p>
              <div className="voice-foot">
                <div className={`voice-av ${voice.avatar}`} />
                <div>
                  <div className="voice-name">{voice.name}</div>
                  <div className="voice-role">{voice.role}</div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
