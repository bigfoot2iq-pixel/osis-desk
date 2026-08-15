import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/client";
import type {
  CatalogCollection,
  CatalogImage,
  CatalogProduct,
} from "@/sanity/types";

// Shared identifier for the default "all categories" view. Collections are
// keyed by their stable `_id`, so this sentinel can never collide with one.
export const ALL_KEY = "__all__";
export const ALL_TITLE = "Tous";

// Full-bleed background for the default "Tous" hero slide (the shot that used
// to sit in the old hero's right-hand card).
export const DEFAULT_HERO_IMAGE = "/oasis-desk-site.jpg";

export type Category = {
  key: string;
  title: string;
  count: number;
  description?: string;
  collection: CatalogCollection | null;
};

// ---------------------------------------------------------------------------
// Marketing copy — kept in one place so the SEO/professional wording stays
// consistent across the hero, submenu and structured data.
// ---------------------------------------------------------------------------

export const DEFAULT_LEDE =
  "Sélection curée pour les directions, open-spaces et espaces d'accueil. Chaque pièce testée, garantie 5 ans, livrée et installée partout au Maroc.";

export const HERO = {
  eyebrow: "Mobilier de bureau · Agadir & tout le Maroc",
  titleLead: "Asseyez votre",
  titleEm: "autorité.",
  sub: "Chaises opérateur et visiteur, fauteuils de direction, bureaux, armoires métalliques et accessoires — pour entreprises et particuliers. À l'unité ou en gros, garantie 5 ans, livraison et montage inclus partout au Maroc.",
  allTitle: "Toute la collection",
} as const;

// Trust strip shown under the hero actions. Concise, keyword-rich promises
// modeled on Moroccan office-furniture retailers.
export const SERVICE_PROMISES = [
  "Livraison partout au Maroc",
  "Montage & installation inclus",
  "Devis gratuit sous 24 h",
  "Garantie 5 ans · SAV réactif",
] as const;

export const SEO_DESCRIPTION =
  "OASIS Desk — mobilier de bureau à Agadir et partout au Maroc : chaises opérateur et visiteur, fauteuils de direction ergonomiques en mesh, armoires et classeurs métalliques, tabourets, packs bureau et accessoires (vérins à gaz, roulettes, accoudoirs). Vente à l'unité et en gros, devis gratuit, livraison, montage et garantie 5 ans.";

// Curated, high-intent French search terms for the Moroccan office-furniture
// market, aligned with what the catalog actually sells. The live categories are
// merged on top of these at render time — see `buildKeywords`.
export const SEO_KEYWORDS = [
  "mobilier de bureau Maroc",
  "mobilier de bureau Agadir",
  "chaise de bureau Maroc",
  "chaise opérateur mesh",
  "chaise visiteur bureau",
  "fauteuil de direction",
  "fauteuil président bureau",
  "chaise de bureau ergonomique",
  "chaise de bureau en maille",
  "bureau de direction",
  "bureau opérationnel Maroc",
  "bureau professionnel Agadir",
  "table de réunion bureau",
  "armoire métallique bureau",
  "classeur métallique",
  "tabouret de bar réglable",
  "pack chaises bureau",
  "accessoires chaise de bureau",
  "vérin à gaz chaise",
  "roulettes fauteuil de bureau",
  "vente mobilier de bureau gros et détail",
] as const;

// Words with no standalone search value — dropped when we turn a raw category
// title into a keyword phrase.
const KEYWORD_STOP_WORDS = new Set([
  "de",
  "des",
  "du",
  "la",
  "le",
  "les",
  "et",
  "en",
  "pour",
  "avec",
  "à",
  "au",
  "aux",
]);

/**
 * Merge the curated keyword list with the live catalog's category titles so new
 * collections widen the keyword footprint automatically, without hand-editing.
 * Result is de-duplicated (diacritic-insensitive) and localised to Morocco.
 */
export function buildKeywords(collections: CatalogCollection[]): string[] {
  const derived = collections
    .map((c) => c.title.trim())
    .filter((t) => t && normalize(t) !== "autres")
    .flatMap((title) => {
      const clean = title.replace(/\s+/g, " ").trim();
      const words = clean
        .split(" ")
        .filter((w) => !KEYWORD_STOP_WORDS.has(normalize(w)));
      const phrase = words.join(" ");
      return phrase ? [`${phrase} Maroc`] : [];
    });

  const seen = new Set<string>();
  return [...SEO_KEYWORDS, ...derived].filter((keyword) => {
    const id = normalize(keyword);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

/**
 * Product types actually stocked, derived from the catalog, for schema.org
 * `makesOffer`. Falls back to the curated category names when the catalog is
 * empty (e.g. the fallback build).
 */
export function buildOfferedProducts(collections: CatalogCollection[]): string[] {
  const titles = collections
    .map((c) => c.title.trim())
    .filter((t) => t && normalize(t) !== "autres");
  return titles.length
    ? Array.from(new Set(titles))
    : ["Chaises de bureau", "Fauteuils de direction", "Mobilier métallique"];
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

function firstImage(product: CatalogProduct): CatalogImage | null {
  return (product.images ?? []).find((image) => image?.asset) ?? null;
}

/** First usable product photo of a collection, sized for a full-bleed hero. */
export function heroImageUrl(collection: CatalogCollection): string | null {
  for (const product of collection.products) {
    const image = firstImage(product);
    if (image) {
      return urlFor(image as SanityImageSource)
        .width(1920)
        .height(1200)
        .fit("crop")
        .auto("format")
        .url();
    }
  }
  return null;
}

export function heroLqip(collection: CatalogCollection): string | undefined {
  for (const product of collection.products) {
    const image = firstImage(product);
    if (image) return image.asset?.metadata?.lqip;
  }
  return undefined;
}

/** Small square thumbnail for a product (used in search results). */
export function productThumbUrl(product: CatalogProduct): string | null {
  const image = firstImage(product);
  if (!image) return null;
  return urlFor(image as SanityImageSource)
    .width(120)
    .height(120)
    .fit("crop")
    .auto("format")
    .url();
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

/** Ordered category list: "Tous" first, then every collection. */
export function buildCategories(collections: CatalogCollection[]): Category[] {
  const total = collections.reduce((sum, c) => sum + c.products.length, 0);
  const all: Category = {
    key: ALL_KEY,
    title: ALL_TITLE,
    count: total,
    description: DEFAULT_LEDE,
    collection: null,
  };
  const rest = collections.map<Category>((collection) => ({
    key: collection._id,
    title: collection.title,
    count: collection.products.length,
    description: collection.description || DEFAULT_LEDE,
    collection,
  }));
  return [all, ...rest];
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

/** Lowercase + strip diacritics so "sieges" matches "Sièges". */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

export type SearchGroup = {
  collection: CatalogCollection;
  products: CatalogProduct[];
};

export type SearchResult = {
  groups: SearchGroup[];
  collections: CatalogCollection[];
  total: number;
};

const MAX_PER_GROUP = 5;
const MAX_PRODUCTS = 8;
const MAX_COLLECTIONS = 4;

// Default panel shown when the field is focused but empty: a taste of each
// category plus the full category list.
const SUGGEST_PER_GROUP = 2;
const SUGGEST_PRODUCTS = 6;

export function suggestCatalog(
  collections: CatalogCollection[],
): SearchResult {
  const groups: SearchGroup[] = [];
  let total = 0;

  for (const collection of collections) {
    if (total >= SUGGEST_PRODUCTS) break;
    const room = SUGGEST_PRODUCTS - total;
    const products = collection.products.slice(
      0,
      Math.min(SUGGEST_PER_GROUP, room),
    );
    if (products.length) {
      groups.push({ collection, products });
      total += products.length;
    }
  }

  return {
    groups,
    collections: collections.slice(0, MAX_COLLECTIONS),
    total,
  };
}

export function searchCatalog(
  collections: CatalogCollection[],
  query: string,
): SearchResult {
  const q = normalize(query);
  if (!q) return { groups: [], collections: [], total: 0 };

  const matchesProduct = (product: CatalogProduct, collectionTitle: string) => {
    const haystack = normalize(
      [product.name, product.sub, product.categoryTitle, collectionTitle]
        .filter(Boolean)
        .join(" "),
    );
    return haystack.includes(q);
  };

  const groups: SearchGroup[] = [];
  const matchedCollections: CatalogCollection[] = [];
  let total = 0;

  for (const collection of collections) {
    if (normalize(collection.title).includes(q)) {
      matchedCollections.push(collection);
    }

    if (total >= MAX_PRODUCTS) continue;

    const products = collection.products
      .filter((product) => matchesProduct(product, collection.title))
      .slice(0, MAX_PER_GROUP);

    if (products.length) {
      const room = MAX_PRODUCTS - total;
      const trimmed = products.slice(0, room);
      groups.push({ collection, products: trimmed });
      total += trimmed.length;
    }
  }

  return {
    groups,
    collections: matchedCollections.slice(0, MAX_COLLECTIONS),
    total,
  };
}
