import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      description: "URL/tab key, e.g. direction or pause-cafe",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9-]+$/, {
            name: "lowercase letters, numbers, and hyphens",
          }),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "key",
    },
  },
});

export default collection;
