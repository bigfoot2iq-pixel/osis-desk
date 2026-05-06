import RevealOnScroll from "./RevealOnScroll";

const steps = [
  {
    delay: "",
    num: "01",
    title: "Brief",
    text: "15 minutes. Espaces, budget, échéance.",
  },
  {
    delay: "d1",
    num: "02",
    title: "Devis",
    text: "Sous 24 h. 3 à 5 références argumentées.",
  },
  {
    delay: "d2",
    num: "03",
    title: "Showroom",
    text: "Vous testez à Agadir. On ajuste.",
  },
  {
    delay: "d3",
    num: "04",
    title: "Livraison",
    text: "72 h. Installation et briefing inclus.",
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
              Méthode rodée. Pas de surprise.
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
