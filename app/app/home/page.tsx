"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sprout, CalendarCheck, ChevronRight } from "lucide-react";
import { HPBar } from "@/components/HPBar";
import { XPBar } from "@/components/XPBar";
import { GoldCounter } from "@/components/GoldCounter";
import { LevelBadge } from "@/components/LevelBadge";
import { StreakFlame } from "@/components/StreakFlame";
import { TaskCard } from "@/components/TaskCard";
import { EmptyState } from "@/components/EmptyState";
import { GrowthRing } from "@/components/GrowthRing";
import { MascotBubble, pickMascotMessage } from "@/components/MascotBubble";
import { ProductivityChart } from "@/components/ProductivityChart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGardenStore, useProductivity, useExpNeed } from "@/store/useGardenStore";
import { isHpLow, getTier } from "@/lib/gamification";
import { tasksForDate } from "@/lib/plant-engine";
import { todayString } from "@/lib/utils";
import { toast } from "sonner";

export default function AppHomePage() {
  const router = useRouter();
  const currentUser = useGardenStore((s) => s.currentUser);
  const myPlants = useGardenStore((s) => s.myPlants);
  const myTasks = useGardenStore((s) => s.myTasks);
  const completeTask = useGardenStore((s) => s.completeTask);
  const expNeed = useExpNeed();
  const productivity = useProductivity(7);
  const today = todayString();

  if (!currentUser) {
    return (
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
    );
  }

  const hpLow = isHpLow(currentUser.hp);
  const todayTasks = tasksForDate(myTasks, today);
  const doneToday = todayTasks.filter((t) => t.status === "done").length;
  const todoToday = todayTasks.filter((t) => t.status !== "done");
  const allDone = todayTasks.length > 0 && doneToday === todayTasks.length;

  const greeting = hpLow ? "Tanamanmu butuh kamu hari ini." : `Hai, ${currentUser.displayName}!`;
  const mascot = pickMascotMessage(currentUser.totalTasksDone);

  function handleToggle(id: string) {
    const res = completeTask(id);
    if (res.ok) {
      // cari task untuk toast
      const t = myTasks.find((x) => x.id === id);
      if (t) {
        toast.success(`Selesai! +${t.exp} EXP, +${t.gold} gold.`);
      }
      if (res.newBadges && res.newBadges.length > 0) {
        toast.success(`Badge baru: ${res.newBadges.length} badge!`);
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Sapaan */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold text-foreground">{greeting}</h1>
        <p className="text-sm font-semibold text-muted-foreground">
          {hpLow
            ? "Tanamanmu mulai layu — siram & rawat hari ini biar pulih."
            : "Satu misi hari ini, satu langkah lebih dekat ke panen."}
        </p>
        <MascotBubble message={mascot} />
        {hpLow && (
          <p role="alert" className="rounded-lg bg-stat-hp/10 px-4 py-3 text-sm font-bold text-foreground">
            Tanamanmu mulai layu — Siram &amp; rawat hari ini biar pulih.
          </p>
        )}
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="rounded-lg p-4 shadow-soft">
          <HPBar hp={currentUser.hp} size="full" />
          <div className="mt-4">
            <XPBar xp={currentUser.xp} need={expNeed} size="full" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <LevelBadge level={currentUser.level} size="full" />
            <GoldCounter gold={currentUser.gold} size="full" />
            <StreakFlame streak={currentUser.streak} size="full" />
          </div>
          <p className="mt-3 text-xs font-semibold text-muted-foreground">Tier: {getTier(currentUser.level)}</p>
        </Card>

        <Card className="rounded-lg p-4 shadow-soft">
          <h2 className="text-base font-extrabold text-foreground">Produktivitas</h2>
          <p className="text-xs font-semibold text-muted-foreground">7 hari terakhir — misi selesai per hari</p>
          <ProductivityChart data={productivity} />
        </Card>
      </div>

      {/* Misi hari ini */}
      <section aria-labelledby="misi-hari-ini" className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h2 id="misi-hari-ini" className="text-lg font-extrabold text-foreground">
            Misi hari ini
          </h2>
          <Link
            href="/app/tasks"
            className="inline-flex min-h-[44px] items-center gap-1 rounded-full px-3 text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            Buka To-do <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>

        {myPlants.length === 0 ? (
          <EmptyState
            title="Kebunmu masih kosong"
            description="Pilih tanaman pertamamu dan mulai hari ini."
            icon={Sprout}
            actionLabel="Tambah Tanaman"
            onAction={() => router.push("/app/plants")}
          />
        ) : todayTasks.length === 0 ? (
          <EmptyState
            title="Mantap! Semua misi hari ini beres 🎉"
            description="Streak kamu bertambah."
            icon={CalendarCheck}
            actionLabel="Buka To-do"
            onAction={() => router.push("/app/tasks")}
          />
        ) : allDone ? (
          <Card className="rounded-lg border-stat-growth/30 bg-stat-growth/5 p-4 shadow-soft">
            <p className="text-base font-extrabold text-foreground">Mantap! Semua misi hari ini beres 🎉</p>
            <p className="text-sm font-semibold text-muted-foreground">Streak kamu bertambah.</p>
            <Button asChild size="lg" className="mt-3 bg-primary-gradient text-white">
              <Link href="/app/tasks">Buka To-do</Link>
            </Button>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {todoToday.slice(0, 5).map((t) => {
              const type = t.type as "Siram" | "Pupuk" | "Cek hama" | "Pangkas" | "Panen" | "Foto";
              return (
                <motion.div key={t.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <TaskCard
                    title={t.title}
                    type={type}
                    difficulty={t.difficulty === "easy" ? "Mudah" : t.difficulty === "medium" ? "Sedang" : "Menantang"}
                    exp={t.exp}
                    gold={t.gold}
                    status={t.status}
                    plantName={t.plantName}
                    onToggle={() => handleToggle(t.id)}
                  />
                </motion.div>
              );
            })}
            {todayTasks.length > 5 ? (
              <Button asChild variant="outline" className="min-h-[44px]">
                <Link href="/app/tasks">Lihat semua {todayTasks.length} misi</Link>
              </Button>
            ) : null}
          </div>
        )}
      </section>

      {/* Tanaman aktif */}
      <section aria-labelledby="tanaman-aktif" className="flex flex-col gap-3">
        <h2 id="tanaman-aktif" className="text-lg font-extrabold text-foreground">
          Tanaman aktif
        </h2>
        {myPlants.length === 0 ? (
          <p className="text-sm font-medium text-muted-foreground">Belum ada tanaman. Mulai dari katalog!</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {myPlants.map((p) => {
              const days = Math.max(1, Math.round((new Date(today).getTime() - new Date(p.startedAt).getTime()) / 86400000) + 1);
              const lastPhoto = [...p.photos].reverse().find((ph) => ph.filled && ph.imageDataUrl);
              return (
                <Link key={p.id} href={`/app/plan/${p.id}`} className="focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
                  <Card className="flex flex-row items-center gap-4 rounded-lg p-4 shadow-soft">
                    {lastPhoto?.imageDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={lastPhoto.imageDataUrl} alt={`Foto ${p.plantName}`} className="size-16 shrink-0 rounded-md object-cover" />
                    ) : (
                      <span className="flex size-16 shrink-0 items-center justify-center rounded-md bg-muted text-3xl" aria-hidden>
                        {p.emoji}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-extrabold text-foreground">{p.plantName}</span>
                      <span className="block text-xs font-semibold text-muted-foreground">
                        Hari {days}/{p.growDaysMax} • {p.status === "harvested" ? "Panen" : "Tumbuh"}
                      </span>
                    </span>
                    <GrowthRing currentDay={days} maxDay={p.growDaysMax} />
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
