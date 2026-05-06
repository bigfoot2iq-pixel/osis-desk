import { defineQuery } from "next-sanity";

export const collectionsQuery = defineQuery(`
  *[_type == "collection"] | order(order asc, title asc) {
    _id,
    title,
    key,
    description,
    "products": *[_type == "product" && references(^._id)] | order(order asc, name asc) {
      _id,
      name,
      "slug": slug.current,
      sub,
      price,
      badge,
      "image": images[0] {
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
    }
  }
`);
