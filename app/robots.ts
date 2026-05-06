import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: "https://oasisdesk.ma/sitemap.xml",
    host: "https://oasisdesk.ma",
  };
}
