import { cacheLife, cacheTag } from "next/cache";

import { client } from "./client";
import { hasSanityEnv } from "./env";
import { fallbackCatalog } from "./fallbackCatalog";
import { collectionsQuery } from "./queries";
import type { CatalogCollection } from "./types";

export async function getCatalog(): Promise<CatalogCollection[]> {
  "use cache";

  cacheLife(process.env.NODE_ENV === "development" ? "seconds" : "hours");
  cacheTag("catalog");
  cacheTag("collection");
  cacheTag("product");

  if (!hasSanityEnv) {
    return fallbackCatalog;
  }

  try {
    const catalog = await client.fetch<CatalogCollection[]>(collectionsQuery);
    return catalog.length ? catalog : fallbackCatalog;
  } catch (error) {
    console.warn("Sanity catalog fetch failed, using fallback catalog.", error);
    return fallbackCatalog;
  }
}
