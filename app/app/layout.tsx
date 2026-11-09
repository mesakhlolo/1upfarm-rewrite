"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { useGardenStore } from "@/store/useGardenStore";
import { isHpLow } from "@/lib/gamification";
import { todayString } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const hasHydrated = useGardenStore((s) => s._hasHydrated);
  const isAuthenticated = useGardenStore((s) => s.isAuthenticated);
  const currentUser = useGardenStore((s) => s.currentUser);
  const hydrateDefaults = useGardenStore((s) => s.hydrateDefaults);
  const applyDailyRollover = useGardenStore((s) => s.applyDailyRollover);
  const myPlantsCount = useGardenStore((s) => s.myPlants.length);
  const rolledRef = useRef(false);

  // Sinkronkan derived state (currentUser/myPlants/myTasks) sekali setelah
  // persist selesai rehydrate. Data kebun lokal sinkron — tidak perlu loading
  // di tiap pindah halaman (navigasi SPA instan via <Link>).
  useEffect(() => {
    if (hasHydrated) hydrateDefaults();
  }, [hasHydrated, hydrateDefaults]);

  // Guard: belum login → /register. Rollover harian sekali per mount
  // (tidak jalan tiap navigasi).
  useEffect(() => {
    if (!hasHydrated) return;
    if (!useGardenStore.getState().isAuthenticated) {
      router.replace("/register");
      return;
    }
    if (!rolledRef.current) {
      rolledRef.current = true;
      applyDailyRollover(todayString());
    }
  }, [hasHydrated, isAuthenticated, router, applyDailyRollover]);

  // Pemanasan router cache: prefetch semua tujuan nav setelah hydrate agar klik
  // pertama langsung instan (prefetch bawaan <Link> hanya saat masuk viewport,
  // dan hanya di production — warmup ini memastikan chunk + RSC ikut dimuat
  // di background sebelum user mengetuk).
  useEffect(() => {
    if (!hasHydrated || !isAuthenticated) return;
    const t = setTimeout(() => {
      for (const href of ["/app/home", "/app/plants", "/app/tasks", "/app/learn", "/app/profile"]) {
        router.prefetch(href);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [hasHydrated, isAuthenticated, router]);

  // Active href untuk nav highlight — dari pathname
  let activeHref = "/app/home";
  if (pathname?.startsWith("/app/plants")) activeHref = "/app/plants";
  else if (pathname?.startsWith("/app/tasks")) activeHref = "/app/tasks";
  else if (pathname?.startsWith("/app/learn")) activeHref = "/app/learn";
  else if (pathname?.startsWith("/app/profile")) activeHref = "/app/profile";
  else if (pathname?.startsWith("/app/home")) activeHref = "/app/home";

  // Boot pertama saja (belum hydrate): shell tetap + skeleton.
  // Pindah halaman setelah ini tidak pernah masuk branch ini.
  if (!hasHydrated) {
    return (
      <AppShell activeHref={activeHref} greeting="1UpFarm">
        <div aria-live="polite" className="flex flex-col gap-3">
          <p className="text-base font-semibold text-muted-foreground">Memuat kebunmu…</p>
          <div className="flex animate-pulse flex-col gap-3" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                <div className="size-11 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/3 rounded bg-muted" />
                  <div className="h-3 w-1/3 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  // Sudah hydrate tapi belum login → redirect (effect di atas). Jangan tampilkan shell.
  if (!isAuthenticated || !currentUser) {
    return null;
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

  return (
    <AppShell activeHref={activeHref} stats={stats} greeting={`${greeting} • ${myPlantsCount} tanaman`}>
      {children}
    </AppShell>
  );
}
