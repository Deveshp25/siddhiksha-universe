import type { MetadataRoute } from "next";

import { SITE } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE.url) {
    return [];
  }

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
    },
  ];
}
