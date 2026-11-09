"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Award, Sprout } from "lucide-react";
import { LevelBadge } from "@/components/LevelBadge";
import { HPBar } from "@/components/HPBar";
import { XPBar } from "@/components/XPBar";
import { GoldCounter } from "@/components/GoldCounter";
import { StreakFlame } from "@/components/StreakFlame";
import { BadgeCard } from "@/components/BadgeCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BADGES } from "@/data/badges";
import { useGardenStore, useProductivity, useExpNeed } from "@/store/useGardenStore";
import { getTier } from "@/lib/gamification";

// Chart Recharts berat — lazy-load agar halaman terasa instan; chart menyusul.
const ProductivityChart = dynamic(
  () => import("@/components/ProductivityChart").then((m) => m.ProductivityChart),
  {
    ssr: false,
    loading: () => <div className="h-44 w-full animate-pulse rounded bg-muted" aria-hidden />,
  },
);

export default function ProfilePage() {
  const currentUser = useGardenStore((s) => s.currentUser);
  const expNeed = useExpNeed();
  const weekly = useProductivity(7);
  const monthly = useProductivity(30);
  const [range, setRange] = useState<7 | 30>(7);

  // Guard login terpusat di app/app/layout.tsx — tanpa loading per halaman.
  if (!currentUser) return null;

  const initial = currentUser.displayName.slice(0, 2).toUpperCase();
  const tier = getTier(currentUser.level);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold text-foreground">Profil</h1>

      <Card className="rounded-lg p-4 shadow-soft">
        <div className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-extrabold text-white" aria-hidden>
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-xl font-extrabold text-foreground">{currentUser.displayName}</p>
            <p className="text-sm font-semibold text-muted-foreground">@{currentUser.username}</p>
            <div className="mt-2">
              <LevelBadge level={currentUser.level} size="full" />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <HPBar hp={currentUser.hp} size="full" />
          <XPBar xp={currentUser.xp} need={expNeed} size="full" />
          <div className="flex flex-wrap gap-3">
            <GoldCounter gold={currentUser.gold} size="full" />
            <StreakFlame streak={currentUser.streak} size="full" />
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-soft">
              <Award className="size-5 text-primary" aria-hidden />
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-bold text-muted-foreground">Rank</span>
                <span className="text-base font-extrabold text-foreground">{tier}</span>
              </span>
            </span>
          </div>
        </div>
      </Card>

      <section aria-labelledby="produktivitas" className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h2 id="produktivitas" className="text-lg font-extrabold text-foreground">
            Produktivitas
          </h2>
          <div className="flex gap-1 rounded-full bg-muted p-1" role="tablist" aria-label="Rentang produktivitas">
            <button type="button" role="tab" aria-selected={range === 7} onClick={() => setRange(7)} className={range === 7 ? "min-h-[36px] rounded-full bg-card px-3 text-xs font-bold shadow" : "min-h-[36px] rounded-full px-3 text-xs font-bold text-muted-foreground"}>
              7 hari terakhir
            </button>
            <button type="button" role="tab" aria-selected={range === 30} onClick={() => setRange(30)} className={range === 30 ? "min-h-[36px] rounded-full bg-card px-3 text-xs font-bold shadow" : "min-h-[36px] rounded-full px-3 text-xs font-bold text-muted-foreground"}>
              30 hari terakhir
            </button>
          </div>
        </div>
        <Card className="rounded-lg p-4 shadow-soft">
          <ProductivityChart data={range === 7 ? weekly : monthly} />
          <p className="mt-2 text-xs font-semibold text-muted-foreground">
            Total misi selesai: {currentUser.totalTasksDone} • Foto: {currentUser.photoCount} • Panen: {currentUser.harvestedCount}
          </p>
        </Card>
      </section>

      <section aria-labelledby="koleksi-badge" className="flex flex-col gap-3">
        <h2 id="koleksi-badge" className="flex items-center gap-2 text-lg font-extrabold text-foreground">
          <Award className="size-5 text-primary" aria-hidden /> Koleksi badge
        </h2>
        {currentUser.badges.length === 0 ? (
          <EmptyState title="Belum ada badge. Selesaikan misi pertamamu!" icon={Sprout} />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {BADGES.map((b) => (
              <BadgeCard key={b.id} name={b.name} description={b.description} unlocked={currentUser.badges.includes(b.id)} />
            ))}
          </div>
        )}
        <Button asChild variant="outline" className="min-h-[44px]">
          <Link href="/app/quests">Lihat Quest</Link>
        </Button>
      </section>
    </div>
  );
}
