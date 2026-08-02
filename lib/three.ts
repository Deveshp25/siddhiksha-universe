import type { ComponentType } from "react";

/** React Three Fiber components must render client-side only. */
export async function loadR3FComponent<T extends ComponentType<unknown>>(
  loader: () => Promise<{ default: T }>,
): Promise<T> {
  const loaded = await loader();
  return loaded.default;
}

export const R3F_CANVAS_ID = "r3f-canvas-root";
