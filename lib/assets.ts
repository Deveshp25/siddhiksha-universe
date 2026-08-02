import assetManifest from "@/public/assets/asset-manifest.json";

export type SiteAssetKey = keyof typeof assetManifest;

export function getAsset(key: SiteAssetKey) {
  return assetManifest[key];
}
