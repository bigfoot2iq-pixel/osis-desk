import { getCatalog } from "@/sanity/data";

import CollectionClient from "./Client";

export default async function Collection() {
  const collections = await getCatalog();

  return (
    <section id="collection">
      <div className="wrap">
        <CollectionClient collections={collections} />
      </div>
    </section>
  );
}
