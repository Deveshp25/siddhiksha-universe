import type { Metadata, Viewport } from "next";

import { SITE } from "@/constants/site";

const siteUrl = SITE.url || undefined;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export function createRootMetadata(): Metadata {
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: SITE.defaultTitle,
      template: `%s | ${SITE.name}`,
    },
    applicationName: SITE.name,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      title: SITE.defaultTitle,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.defaultTitle,
    },
  };
}

export function createPageMetadata(
  title: string,
  options?: Partial<Metadata>,
): Metadata {
  return {
    title,
    ...options,
  };
}
