"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { useGardenStore } from "@/store/useGardenStore";
import { isHpLow } from "@/lib/gamification";
import { todayString } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useGardenStore((s) => s.isAuthenticated);
  const currentUser = useGardenStore((s) => s.currentUser);
  const hydrateDefaults = useGardenStore((s) => s.hydrateDefaults);
  const applyDailyRollover = useGardenStore((s) => s.applyDailyRollover);
  const myPlants = useGardenStore((s) => s.myPlants);

  useEffect(() => {
    hydrateDefaults();
  }, [hydrateDefaults]);

  useEffect(() => {
    // Guard: belum login → /register
    // Gunakan timeout kecil agar persist ter-hydrate dulu
    const t = setTimeout(() => {
      if (!useGardenStore.getState().isAuthenticated) {
        router.replace("/register");
      } else {
        // Rollover harian sekali per mount
        applyDailyRollover(todayString());
      }
    }, 50);
    return () => clearTimeout(t);
  }, [router, applyDailyRollover, isAuthenticated]);

  if (!isAuthenticated || !currentUser) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4" aria-live="polite">
        <p className="text-base font-semibold text-muted-foreground">Memuat kebunmu…</p>
      </main>
    );
  }

  const hpLow = isHpLow(currentUser.hp);
  const greeting = hpLow ? "Tanamanmu butuh kamu hari ini." : `Hai, ${currentUser.displayName}!`;
  const stats = {
    hp: currentUser.hp,
    xp: currentUser.xp,
    need: 50 * currentUser.level,
    gold: currentUser.gold,
    streak: currentUser.streak,
  };

  // Active href untuk nav highlight — dari pathname
  let activeHref = "/app/home";
  if (pathname?.startsWith("/app/plants")) activeHref = "/app/plants";
  else if (pathname?.startsWith("/app/tasks")) activeHref = "/app/tasks";
  else if (pathname?.startsWith("/app/learn")) activeHref = "/app/learn";
  else if (pathname?.startsWith("/app/profile")) activeHref = "/app/profile";
  else if (pathname?.startsWith("/app/home")) activeHref = "/app/home";

  return (
    <AppShell activeHref={activeHref} stats={stats} greeting={`${greeting} • ${myPlants.length} tanaman`}>
      {children}
    </AppShell>
  );
}
