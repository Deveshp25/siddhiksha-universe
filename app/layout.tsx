import type { Metadata } from "next";

import { fontVariables } from "@/lib/fonts";
import { createRootMetadata, viewport } from "@/lib/seo";
import { AppProviders } from "@/providers";
import { Footer } from "@/components/navigation";
import "@/styles/globals.css";

export const metadata: Metadata = createRootMetadata();

export { viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full">
        <AppProviders>
          {children}
          <Footer brand="Siddhiksha Universe" />
        </AppProviders>
      </body>
    </html>
  );
}
