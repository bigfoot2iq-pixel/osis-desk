import RevealOnScroll from "./RevealOnScroll";

const voices = [
  {
    delay: "d1",
    avatar: "av1",
    quote:
      "« Livraison en 4 jours, montage soigné. Rare en B2B. »",
    name: "Nadia Cherif",
    role: "Cabinet Meridian",
  },
  {
    delay: "d2",
    avatar: "av2",
    quote:
      "« Notre accueil transformé. Les visiteurs le remarquent. »",
    name: "Sofiane Mrad",
    role: "Technova Industries",
  },
];

export default function Voices() {
  return (
    <section id="voices">
      <div className="wrap">
        <RevealOnScroll style={{ marginBottom: "clamp(28px, 3.5vw, 44px)" }}>
          <span className="eyebrow">Témoignages</span>
          <h2 className="h2">
            Choisi par <em>douze</em>
            <br />
            entreprises à Agadir.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll className="voice-feat">
          <div className="voice-feat-inner">
            <p className="voice-feat-q">
              « 18 postes équipés en une semaine. Sélection juste, SAV{" "}
              <em>impeccable</em>. »
            </p>
            <div className="voice-feat-meta">
              <div className="vfm-stars">★★★★★</div>
              <div>
                <div className="vfm-name">Karim Benali</div>
                <div className="vfm-role">Directeur Général</div>
              </div>
              <div className="vfm-co">Groupe Altitude · Agadir</div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="voice-grid">
          {voices.map((voice) => (
            <RevealOnScroll key={voice.name} className={`voice ${voice.delay}`}>
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
