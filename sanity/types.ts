import type { PortableTextBlock } from "@portabletext/types";

export type IllustrationKey =
  | "chair1"
  | "chair2"
  | "chair3"
  | "chair4"
  | "stool"
  | "bench";

export type CatalogImage = {
  _type?: "image";
  alt?: string;
  crop?: unknown;
  hotspot?: unknown;
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
};

export type CatalogProduct = {
  _id: string;
  name: string;
  slug?: string;
  sub?: string;
  price?: string;
  badge?: string | null;
  description?: PortableTextBlock[] | null;
  images?: CatalogImage[] | null;
  illustration?: IllustrationKey;
  categoryTitle?: string | null;
  categoryKey?: string | null;
  _createdAt?: string;
};

export type CatalogCollection = {
  _id: string;
  title: string;
  key: string;
  description?: string;
  products: CatalogProduct[];
};
