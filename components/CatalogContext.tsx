"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ALL_KEY, buildCategories, type Category } from "@/lib/catalog";
import type { CatalogCollection, CatalogProduct } from "@/sanity/types";

import ProductPanel from "./Collection/ProductPanel";

type CatalogContextValue = {
  collections: CatalogCollection[];
  categories: Category[];
  activeKey: string;
  activeCategory: Category;
  activeCollection: CatalogCollection | null;
  products: CatalogProduct[];
  setActiveKey: (key: string) => void;
  cycleCategory: (direction: 1 | -1) => void;
  selected: CatalogProduct | null;
  setSelected: (product: CatalogProduct | null) => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

type CatalogProviderProps = {
  collections: CatalogCollection[];
  children: ReactNode;
};

export function CatalogProvider({
  collections,
  children,
}: CatalogProviderProps) {
  const categories = useMemo(
    () => buildCategories(collections),
    [collections],
  );
  const [activeKey, setActiveKey] = useState(ALL_KEY);
  const [selected, setSelected] = useState<CatalogProduct | null>(null);

  const activeCategory = useMemo(
    () =>
      categories.find((category) => category.key === activeKey) ??
      categories[0],
    [categories, activeKey],
  );

  const activeCollection = activeCategory?.collection ?? null;

  const products = useMemo(() => {
    if (activeKey === ALL_KEY) {
      return collections.flatMap((collection) => collection.products);
    }
    return activeCollection?.products ?? [];
  }, [activeKey, activeCollection, collections]);

  const cycleCategory = useCallback(
    (direction: 1 | -1) => {
      if (categories.length < 2) return;
      const index = categories.findIndex((c) => c.key === activeKey);
      const next =
        (index + direction + categories.length) % categories.length;
      setActiveKey(categories[next].key);
    },
    [categories, activeKey],
  );

  const value = useMemo<CatalogContextValue>(
    () => ({
      collections,
      categories,
      activeKey,
      activeCategory,
      activeCollection,
      products,
      setActiveKey,
      cycleCategory,
      selected,
      setSelected,
    }),
    [
      collections,
      categories,
      activeKey,
      activeCategory,
      activeCollection,
      products,
      cycleCategory,
      selected,
    ],
  );

  return (
    <CatalogContext.Provider value={value}>
      {children}
      <ProductPanel product={selected} onClose={() => setSelected(null)} />
    </CatalogContext.Provider>
  );
}

export function useCatalog(): CatalogContextValue {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
}
