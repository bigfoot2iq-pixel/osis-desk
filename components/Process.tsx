import RevealOnScroll from "./RevealOnScroll";

const steps = [
  {
    delay: "",
    num: "— 01",
    title: "Brief express",
    text: "15 minutes au téléphone. On comprend vos espaces, votre budget, votre échéance.",
  },
  {
    delay: "d1",
    num: "— 02",
    title: "Devis chiffré",
    text: "Sous 24 h, une sélection de 3 à 5 références argumentées. Tout est transparent.",
  },
  {
    delay: "d2",
    num: "— 03",
    title: "Validation showroom",
    text: "Vous testez les modèles à Casablanca. On ajuste avant de commander.",
  },
  {
    delay: "d3",
    num: "— 04",
    title: "Livraison montée",
    text: "72 h après. Nos équipes installent, briefent vos collaborateurs, repartent.",
  },
];

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <div className="process-head">
          <RevealOnScroll>
            <span className="eyebrow">Comment on travaille</span>
            <h2 className="h2">
              De l&apos;appel au
              <br />
              fauteuil <em>en 4 étapes</em>.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll className="d1">
            <p className="lede">
              Une méthode rodée sur 120+ projets. Pas de surprise, pas de
              retard, pas de SAV qui s&apos;éternise.
            </p>
          </RevealOnScroll>
        </div>

        <div className="steps">
          {steps.map((step) => (
            <RevealOnScroll key={step.num} className={["step", step.delay].filter(Boolean).join(" ")}>
              <div className="step-num">{step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-text">{step.text}</div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
