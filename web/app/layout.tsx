// layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./providers";
import { DashboardHeader } from "@/components/dashboard-header";
// import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JetCall",
  description: "NextGen AI powered ai business leads manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <DashboardHeader />
          {children}
          {/* <Toaster /> */}
        </Provider>
      </body>
    </html>
  );
}
