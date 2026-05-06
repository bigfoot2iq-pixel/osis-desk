import type { CatalogCollection } from "@/sanity/types";

type TabsProps = {
  collections: CatalogCollection[];
  activeKey: string;
  onChange: (key: string) => void;
};

export default function Tabs({ collections, activeKey, onChange }: TabsProps) {
  return (
    <div className="coll-tabs">
      {collections.map((collection) => (
        <button
          key={collection._id}
          className={`coll-tab${activeKey === collection.key ? " on" : ""}`}
          onClick={() => onChange(collection.key)}
          type="button"
        >
          {collection.title}
        </button>
      ))}
    </div>
  );
}
