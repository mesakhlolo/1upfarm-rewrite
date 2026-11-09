"use client";

import { useMemo } from "react";
import { QUESTS, STREAK_MILESTONES } from "@/data/quests";
import { BADGES, getBadgeById } from "@/data/badges";
import { BadgeCard } from "@/components/BadgeCard";
import { Card } from "@/components/ui/card";
import { useGardenStore } from "@/store/useGardenStore";
import { Flame, Award, Sprout } from "lucide-react";

export default function QuestsPage() {
  const currentUser = useGardenStore((s) => s.currentUser);
  const myTasks = useGardenStore((s) => s.myTasks);

  const progress = useMemo(() => {
    if (!currentUser) return null;
    const tasksDone = currentUser.totalTasksDone;
    const tasksToday = myTasks.filter((t) => t.dateStr === new Date().toISOString().slice(0, 10)).length;
    const doneToday = myTasks.filter((t) => t.dateStr === new Date().toISOString().slice(0, 10) && t.status === "done").length;
    return {
      daily: tasksDone >= 1 ? Math.min(100, (doneToday / Math.max(1, tasksToday)) * 100) : 0,
      streak7: Math.min(100, (currentUser.streak / 7) * 100),
      foto: Math.min(100, (currentUser.photoCount / 1) * 100),
      panen: Math.min(100, (currentUser.harvestedCount / 1) * 100),
      misi50: Math.min(100, (tasksDone / 50) * 100),
    };
  }, [currentUser, myTasks]);

  const questProgressMap = useMemo(() => {
    if (!progress || !currentUser) return {} as Record<string, number>;
    return {
      "daily-semua-task": progress.daily,
      "weekly-streak-7": progress.streak7,
      "plant-foto-pertama": progress.foto,
      "plant-panen-pertama": progress.panen,
      "daily-50-misi": progress.misi50,
    };
  }, [progress, currentUser]);

  if (!currentUser) {
    return <p className="text-base font-semibold text-muted-foreground">Memuat kebunmu…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Quest &amp; Badge</h1>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">Milestone streak: {STREAK_MILESTONES.join(" / ")} hari.</p>
      </div>

      {/* Streak milestones */}
      <Card className="rounded-lg p-4 shadow-soft">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-foreground">
          <Flame className="size-5 text-stat-streak" aria-hidden /> Streak kamu: {currentUser.streak} hari
        </h2>
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Milestone streak">
          {STREAK_MILESTONES.map((m) => {
            const reached = currentUser.streak >= m;
            return (
              <span
                key={m}
                className={
                  reached ? "inline-flex h-8 items-center rounded-full bg-stat-streak px-3 text-xs font-extrabold text-white" : "inline-flex h-8 items-center rounded-full bg-muted px-3 text-xs font-bold text-muted-foreground"
                }
                aria-label={reached ? `Milestone ${m} hari tercapai` : `Milestone ${m} hari belum tercapai`}
              >
                {m} hari {reached ? "✓" : ""}
              </span>
            );
          })}
        </div>
      </Card>

      {/* Quests */}
      <section aria-labelledby="quests" className="flex flex-col gap-3">
        <h2 id="quests" className="flex items-center gap-2 text-lg font-extrabold text-foreground">
          <Award className="size-5 text-primary" aria-hidden /> Quest
        </h2>
        <div className="flex flex-col gap-3">
          {QUESTS.map((q) => {
            const pct = questProgressMap[q.id] ?? 0;
            const badge = q.badgeId ? getBadgeById(q.badgeId) : undefined;
            const unlocked = badge ? currentUser.badges.includes(badge.id) : pct >= 100;
            return (
              <Card key={q.id} className="rounded-lg p-4 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-foreground">
                      <span className="mr-2 inline-flex h-5 items-center rounded-full bg-muted px-2 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                        {q.category}
                      </span>
                      {q.title}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{q.description}</p>
                    <p className="mt-1 text-xs font-bold text-foreground">
                      +{q.rewardExp} EXP • +{q.rewardGold} gold • +{q.rewardHp} HP
                    </p>
                    {badge ? (
                      <p className="mt-1 text-xs font-semibold text-muted-foreground">
                        Badge: {badge.name} — {unlocked ? "Terbuka ✓" : "Terkunci"}
                      </p>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-sm font-extrabold tabular-nums text-primary">{Math.round(pct)}%</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`Progres ${q.title}`}>
                  <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Badges */}
      <section aria-labelledby="badges" className="flex flex-col gap-3">
        <h2 id="badges" className="flex items-center gap-2 text-lg font-extrabold text-foreground">
          <Sprout className="size-5 text-stat-growth" aria-hidden /> Koleksi badge ({currentUser.badges.length}/{BADGES.length})
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {BADGES.map((b) => (
            <BadgeCard key={b.id} name={b.name} description={b.description} unlocked={currentUser.badges.includes(b.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}
