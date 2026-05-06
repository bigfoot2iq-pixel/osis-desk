import type { CatalogCollection } from "./types";

export const fallbackCatalog: CatalogCollection[] = [
  {
    _id: "fallback-direction",
    title: "Direction",
    key: "direction",
    products: [
      {
        _id: "fallback-president-executif",
        name: "Président Exécutif",
        sub: "Cuir PU · Base chromée",
        price: "7 200 MAD",
        badge: "Premium",
        illustration: "chair1",
      },
      {
        _id: "fallback-direction-mesh",
        name: "Direction Mesh",
        sub: "Maille respirante · Appui-tête",
        price: "5 400 MAD",
        illustration: "chair2",
      },
      {
        _id: "fallback-senior-manager",
        name: "Senior Manager",
        sub: "Cuir grainé · Roulettes silence",
        price: "6 100 MAD",
        badge: "Nouveauté",
        illustration: "chair1",
      },
      {
        _id: "fallback-operator-pro",
        name: "Operator Pro",
        sub: "Mesh noir · Finition chrome",
        price: "3 900 MAD",
        illustration: "chair2",
      },
    ],
  },
  {
    _id: "fallback-productif",
    title: "Productif",
    key: "productif",
    products: [
      {
        _id: "fallback-manager-confort",
        name: "Manager Confort",
        sub: "Mesh · Inclinaison 130°",
        price: "3 400 MAD",
        illustration: "chair2",
      },
      {
        _id: "fallback-visiteur-cantilever",
        name: "Visiteur Cantilever",
        sub: "Cantilever chromé · Cuir",
        price: "2 200 MAD",
        illustration: "chair3",
      },
      {
        _id: "fallback-reunion-empilable",
        name: "Réunion Empilable",
        sub: "Résille · 4 pieds",
        price: "1 800 MAD",
        badge: "Best-seller",
        illustration: "chair4",
      },
      {
        _id: "fallback-formation-tablette",
        name: "Formation Tablette",
        sub: "Écritoire rabattable",
        price: "2 100 MAD",
        illustration: "chair4",
      },
    ],
  },
  {
    _id: "fallback-pause",
    title: "Pause & Café",
    key: "pause",
    products: [
      {
        _id: "fallback-tabouret-bar",
        name: "Tabouret Bar",
        sub: "Simili-cuir · Hauteur réglable",
        price: "2 900 MAD",
        illustration: "stool",
      },
      {
        _id: "fallback-banquette-reception",
        name: "Banquette Réception",
        sub: "Cuir PU · 3 places",
        price: "4 100 MAD",
        badge: "Nouveauté",
        illustration: "bench",
      },
      {
        _id: "fallback-lounge-client",
        name: "Lounge Client",
        sub: "Coussin extra-ferme · Cuir",
        price: "3 500 MAD",
        illustration: "chair3",
      },
      {
        _id: "fallback-bar-stool-slim",
        name: "Bar Stool Slim",
        sub: "Métal noir mat · Pivot",
        price: "2 200 MAD",
        illustration: "stool",
      },
    ],
  },
];
