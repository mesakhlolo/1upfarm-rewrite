import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SWRegistrar } from "@/components/SWRegistrar";
import type { ReactNode } from "react";

// docs/content/design-system.md §3 — Nunito rounded, 400–800
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "1UpFarm",
  description: "Duolingo untuk menanam makanan sendiri di lahan sempit.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/assets/logo-instance.png",
    apple: "/assets/logo-instance.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#7C3AED",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={cn("font-sans", nunito.variable)}>
      <body>
        {children}
        <Toaster richColors position="top-center" />
        <SWRegistrar />
      </body>
    </html>
  );
}
