import RevealOnScroll from "./RevealOnScroll";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const voices = [
  {
    delay: "",
    tone: "av1",
    quote:
      "« Livraison en 4 jours, montage soigné. Un vrai partenaire, pas un simple fournisseur. »",
    name: "Nadia Cherif",
    role: "Office Manager",
    company: "Cabinet Meridian",
    metric: "9 bureaux · 4 jours",
  },
  {
    delay: "d1",
    tone: "av2",
    quote:
      "« Notre accueil a changé de standing. Les visiteurs le remarquent dès l'entrée. »",
    name: "Sofiane Mrad",
    role: "Responsable achats",
    company: "Technova Industries",
    metric: "Espace accueil rénové",
  },
  {
    delay: "d2",
    tone: "av3",
    quote:
      "« Conseil précis, devis clair, aucune mauvaise surprise à la livraison. »",
    name: "Yasmine Alaoui",
    role: "Directrice administrative",
    company: "Atlas Conseil",
    metric: "24 postes équipés",
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
              <div className="voice-metric">18 postes livrés en 5 jours</div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="voice-grid">
          {voices.map((voice) => (
            <RevealOnScroll
              key={voice.name}
              className={["voice", voice.delay].filter(Boolean).join(" ")}
            >
              <div className="voice-stars">★★★★★</div>
              <p className="voice-q">{voice.quote}</p>
              <div className="voice-metric">{voice.metric}</div>
              <div className="voice-foot">
                <div className={`voice-av ${voice.tone}`} aria-hidden="true">
                  {initials(voice.name)}
                </div>
                <div>
                  <div className="voice-name">{voice.name}</div>
                  <div className="voice-role">
                    {voice.role} · {voice.company}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
