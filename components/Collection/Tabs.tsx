export type TabItem = {
  key: string;
  title: string;
  count?: number;
};

type TabsProps = {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
};

export default function Tabs({ tabs, activeKey, onChange }: TabsProps) {
  return (
    <div className="coll-tabs" role="tablist" aria-label="Catégories">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={activeKey === tab.key}
          className={`coll-tab${activeKey === tab.key ? " on" : ""}`}
          onClick={() => onChange(tab.key)}
          type="button"
        >
          {tab.title}
          {typeof tab.count === "number" ? (
            <span className="coll-tab-count">{tab.count}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
