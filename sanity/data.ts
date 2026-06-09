import { cacheLife, cacheTag } from "next/cache";

import { client } from "./client";
import { hasSanityEnv } from "./env";
import { fallbackCatalog } from "./fallbackCatalog";
import { collectionsQuery, orphanProductsQuery } from "./queries";
import type { CatalogCollection, CatalogProduct } from "./types";

export async function getCatalog(): Promise<CatalogCollection[]> {
  "use cache";

  if (process.env.NODE_ENV === "development") {
    cacheLife("seconds");
  } else {
    // `minutes` profile revalidates ~every minute so freshly published
    // products appear quickly even if the Sanity webhook is not wired up.
    cacheLife("minutes");
  }
  cacheTag("catalog", "collection", "product");

  if (!hasSanityEnv) {
    return fallbackCatalog;
  }

  try {
    const [collections, orphans] = await Promise.all([
      client.fetch<CatalogCollection[]>(collectionsQuery),
      client.fetch<CatalogProduct[]>(orphanProductsQuery),
    ]);

    // Drop empty categories so the landing never shows a barren tab.
    const grouped = (collections ?? []).filter(
      (collection) => collection.products?.length,
    );

    if (orphans?.length) {
      grouped.push({
        _id: "uncategorized",
        title: "Autres",
        key: "autres",
        description:
          "Produits récemment ajoutés, en attente de classement dans une catégorie.",
        products: orphans,
      });
    }

    return grouped.length ? grouped : fallbackCatalog;
  } catch (error) {
    console.warn("Sanity catalog fetch failed, using fallback catalog.", error);
    return fallbackCatalog;
  }
}
