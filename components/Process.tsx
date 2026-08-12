import RevealOnScroll from "./RevealOnScroll";

const steps = [
  {
    delay: "",
    num: "01",
    title: "Brief",
    text: "Nous cernons vos espaces, votre budget et vos délais en 15 minutes.",
  },
  {
    delay: "d1",
    num: "02",
    title: "Devis",
    text: "Sous 24 h : 3 à 5 références argumentées et chiffrées.",
  },
  {
    delay: "d2",
    num: "03",
    title: "Showroom",
    text: "Vous testez les assises à Agadir, nous ajustons la sélection.",
  },
  {
    delay: "d3",
    num: "04",
    title: "Livraison",
    text: "Sous 72 h : livraison, installation et prise en main incluses.",
  },
];

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <div className="process-head">
          <RevealOnScroll>
            <span className="eyebrow">Notre méthode</span>
            <h2 className="h2">
              Du premier appel au
              <br />
              fauteuil livré, <em>en 4 étapes</em>.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll className="d1">
            <p className="lede">
              Un processus éprouvé, transparent à chaque étape.
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
