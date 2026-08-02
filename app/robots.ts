import type { MetadataRoute } from "next";

import { SITE } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  if (!SITE.url) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
