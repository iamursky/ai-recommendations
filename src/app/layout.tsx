import "@mantine/core/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "AI Recommendations",
  description: "AI Recommendations",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
