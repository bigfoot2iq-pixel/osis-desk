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
  images?: CatalogImage[] | null;
  illustration?: IllustrationKey;
};

export type CatalogCollection = {
  _id: string;
  title: string;
  key: string;
  description?: string;
  products: CatalogProduct[];
};
