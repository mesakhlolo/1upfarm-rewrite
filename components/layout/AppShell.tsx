import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { SideNav, type SidebarStats } from "@/components/layout/SideNav";
import { HPBar } from "@/components/HPBar";
import { StreakFlame } from "@/components/StreakFlame";

/**
 * AppShell — design-system §5.
 * Mobile: header tipis + BottomNav fixed.
 * Desktop (≥1024px): SideNav fixed kiri 240px + area konten.
 * Belum di-mount ke route produksi; hanya dipakai /kitchen-sink.
 */
export function AppShell({
  activeHref,
  stats,
  greeting,
  children,
}: {
  activeHref?: string;
  stats?: SidebarStats;
  greeting?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <SideNav activeHref={activeHref} stats={stats} />

      <div className="lg:pl-60">
        <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur">
          <div className="mx-auto flex min-h-14 w-full max-w-[1200px] items-center justify-between gap-3 px-4 lg:px-6">
            <p className="min-w-0 truncate text-sm font-extrabold text-foreground sm:text-base">
              {greeting ?? "1UpFarm"}
            </p>
            {stats ? (
              <div className="flex shrink-0 items-center gap-3">
                <HPBar hp={stats.hp} size="mini" />
                <StreakFlame streak={stats.streak} size="mini" />
              </div>
            ) : null}
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-4 lg:px-6 lg:pb-10">{children}</main>
      </div>

      <BottomNav activeHref={activeHref} />
    </div>
  );
}
