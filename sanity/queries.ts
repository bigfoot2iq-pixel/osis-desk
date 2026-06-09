import { defineQuery } from "next-sanity";

const productProjection = `
  _id,
  name,
  "slug": slug.current,
  sub,
  price,
  badge,
  description,
  _createdAt,
  "categoryTitle": collection->title,
  "categoryKey": collection->key,
  "images": images[] {
    ...,
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions {
          width,
          height
        }
      }
    }
  }
`;

// Collections with every published product that references them.
export const collectionsQuery = defineQuery(`
  *[_type == "collection"] | order(order asc, title asc) {
    _id,
    title,
    key,
    description,
    "products": *[_type == "product" && references(^._id)] | order(order asc, _createdAt asc) {
      ${productProjection}
    }
  }
`);

// Products that have no resolvable (published) collection reference. These
// would otherwise silently vanish from the catalog — admins add a product but
// forget to assign a category, so we surface them in an "Autres" bucket.
export const orphanProductsQuery = defineQuery(`
  *[_type == "product" && !defined(collection->_id)] | order(order asc, _createdAt asc) {
    ${productProjection}
  }
`);
