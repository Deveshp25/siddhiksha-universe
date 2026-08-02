import type { ReactNode } from "react";

import {
  AmbientBackground,
  CustomCursor,
  LoadingExperience,
  ScrollProgress,
} from "@/components/polish";

import { LenisProvider } from "./lenis-provider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <LenisProvider>
      <AmbientBackground />
      <ScrollProgress />
      <CustomCursor />
      <LoadingExperience />
      {children}
    </LenisProvider>
  );
}
