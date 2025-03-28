// providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <SessionProvider>
      <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    </SessionProvider>
  );
}
