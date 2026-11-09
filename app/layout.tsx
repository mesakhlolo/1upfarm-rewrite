import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";

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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={cn("font-sans", nunito.variable)}>
      <body>{children}</body>
    </html>
  );
}
