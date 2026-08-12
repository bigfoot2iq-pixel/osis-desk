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
  sub: "Chaises, fauteuils de direction et bureaux pour entreprises et particuliers. À l'unité ou en gros — fabrication robuste, garantie 5 ans, livraison et montage inclus partout au Maroc.",
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
  "OASIS Desk — spécialiste du mobilier de bureau à Agadir : chaises de bureau, fauteuils de direction ergonomiques, bureaux et sièges de collectivité. Vente à l'unité et en gros, devis gratuit, livraison, montage et garantie 5 ans partout au Maroc.";

export const SEO_KEYWORDS = [
  "mobilier de bureau Maroc",
  "chaise de bureau Agadir",
  "fauteuil de direction",
  "bureau de direction",
  "siège ergonomique",
  "mobilier professionnel Agadir",
] as const;

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
