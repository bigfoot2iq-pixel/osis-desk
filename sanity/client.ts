import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Caching is handled by `'use cache'` + tag revalidation, so we read fresh
  // from the API (the CDN adds its own staleness on top, which made newly
  // published products take longer to appear).
  useCdn: false,
  // Only ever serve published documents on the public site — keeps catalog
  // output deterministic and never leaks drafts.
  perspective: "published",
});

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
