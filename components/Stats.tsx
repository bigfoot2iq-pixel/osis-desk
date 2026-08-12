import RevealOnScroll from "./RevealOnScroll";

const stats = [
  { value: "12", label: "Entreprises équipées à Agadir" },
  { value: "300+", label: "Postes de travail livrés" },
  { value: "72 h", label: "Délai de livraison moyen" },
  { value: "5 ans", label: "Garantie pièces & main-d'œuvre" },
];

export default function Stats() {
  return (
    <section id="stats" aria-label="Chiffres clés">
      <div className="wrap">
        <RevealOnScroll className="stats">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
