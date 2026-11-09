import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/components/layout/BottomNav";
import { HPBar } from "@/components/HPBar";
import { XPBar } from "@/components/XPBar";
import { GoldCounter } from "@/components/GoldCounter";
import { StreakFlame } from "@/components/StreakFlame";

/**
 * SideNav — design-system §5 (desktop ≥1024px).
 * Sidebar kiri 240px + stat panel di atas (HP/EXP/Gold/Level/Streak).
 * Belum di-mount ke route produksi (hanya preview di /kitchen-sink).
 */
export interface SidebarStats {
  hp: number;
  xp: number;
  need: number;
  gold: number;
  streak: number;
}

export function SideNav({
  activeHref,
  stats,
  className,
}: {
  activeHref?: string;
  stats?: SidebarStats;
  className?: string;
}) {
  return (
    <aside
      aria-label="Navigasi utama"
      className={cn(
        "fixed inset-y-0 left-0 z-50 hidden w-60 flex-col gap-4 border-r border-border bg-card p-4 lg:flex",
        className,
      )}
    >
      <p className="px-2 pt-2 text-xl font-extrabold tracking-tight text-primary">1UpFarm</p>

      {stats ? (
        <div className="flex flex-col gap-3 rounded-lg bg-muted/60 p-3">
          <HPBar hp={stats.hp} size="full" />
          <XPBar xp={stats.xp} need={stats.need} size="full" />
          <div className="flex items-center justify-between gap-2">
            <GoldCounter gold={stats.gold} size="mini" />
            <StreakFlame streak={stats.streak} size="mini" />
          </div>
        </div>
      ) : null}

      <nav className="flex-1">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeHref === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={true}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-lg border-l-2 px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "border-primary bg-primary-soft font-extrabold text-primary"
                      : "border-transparent font-bold text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-5 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
