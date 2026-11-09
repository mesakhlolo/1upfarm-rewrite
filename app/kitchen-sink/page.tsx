import { AppShell } from "@/components/layout/AppShell";
import { HPBar } from "@/components/HPBar";
import { XPBar } from "@/components/XPBar";
import { GoldCounter } from "@/components/GoldCounter";
import { LevelBadge } from "@/components/LevelBadge";
import { StreakFlame } from "@/components/StreakFlame";
import { TaskCard } from "@/components/TaskCard";
import { PlantCard } from "@/components/PlantCard";
import { BadgeCard } from "@/components/BadgeCard";
import { DifficultyTag } from "@/components/DifficultyTag";
import { EmptyState } from "@/components/EmptyState";
import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const demoStats = { hp: 80, xp: 30, need: 50, gold: 25, streak: 3 };

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-extrabold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export default function KitchenSinkPage() {
  return (
    <AppShell activeHref="/app/home" stats={demoStats}>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Kitchen Sink</h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">Review komponen Fase 1 — design-system §6</p>
        </div>

        {/* Stat */}
        <Section title="Stat — HPBar · XPBar · Gold · Level · Streak">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="rounded-lg shadow-soft">
              <CardHeader>
                <CardTitle>HPBar</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <HPBar hp={80} size="full" />
                <HPBar hp={80} size="mini" />
                <HPBar hp={25} size="full" />
                <HPBar hp={25} size="mini" />
              </CardContent>
            </Card>
            <Card className="rounded-lg shadow-soft">
              <CardHeader>
                <CardTitle>XPBar / Gold / Streak / Level</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <XPBar xp={30} need={50} size="full" />
                <XPBar xp={30} need={50} size="mini" />
                <div className="flex flex-wrap items-center gap-4">
                  <GoldCounter gold={25} size="full" />
                  <GoldCounter gold={25} size="mini" />
                  <StreakFlame streak={3} size="full" />
                  <StreakFlame streak={3} size="mini" />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <LevelBadge level={5} size="full" />
                  <LevelBadge level={5} size="mini" />
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Difficulty */}
        <Section title="DifficultyTag">
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyTag difficulty="Mudah" />
            <DifficultyTag difficulty="Sedang" />
            <DifficultyTag difficulty="Menantang" />
          </div>
        </Section>

        {/* Task */}
        <Section title="TaskCard — todo / done / missed">
          <div className="flex flex-col gap-3">
            <TaskCard title="Siram" type="Siram" difficulty="Mudah" exp={10} gold={5} status="todo" plantName="Selada" />
            <TaskCard title="Pupuk" type="Pupuk" difficulty="Sedang" exp={20} gold={10} status="done" plantName="Daun Bawang" />
            <TaskCard title="Cek hama" type="Cek hama" difficulty="Menantang" exp={35} gold={18} status="missed" plantName="Cabai Rawit" />
            <TaskCard title="Pangkas" type="Pangkas" difficulty="Mudah" exp={10} gold={5} status="todo" plantName="Selada" />
            <TaskCard title="Panen" type="Panen" difficulty="Sedang" exp={20} gold={10} status="todo" plantName="Daun Bawang" />
            <TaskCard title="Foto" type="Foto" difficulty="Menantang" exp={35} gold={18} status="todo" plantName="Cabai Rawit" />
          </div>
        </Section>

        {/* Plant */}
        <Section title="PlantCard">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PlantCard name="Selada" emoji="🥬" difficulty="Mudah" harvestDays={30} media="Polybag/Pot" />
            <PlantCard name="Daun Bawang" emoji="🧄" difficulty="Sedang" harvestDays={30} media="Polybag/Pot" />
            <PlantCard name="Cabai Rawit" emoji="🌶️" difficulty="Menantang" harvestDays={30} media="Hidroponik" />
          </div>
        </Section>

        {/* Badge */}
        <Section title="BadgeCard — terbuka / terkunci">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <BadgeCard name="Tunastumbuh" description="Menanam tanaman pertamamu" unlocked />
            <BadgeCard name="Foto Pertama" description="Mengunggah bukti tumbuh pertama" unlocked={false} />
            <BadgeCard name="Streak 7" description="7 hari berturut-turut merawat tanaman" unlocked />
            <BadgeCard name="Green Thumb" description="Menyelesaikan 50 misi" unlocked={false} />
            <BadgeCard name="Panen Pertama" description="Berhasil menanam sampai panen" unlocked={false} />
            <BadgeCard name="Pemula" description="Mencapai Level 5" unlocked={false} />
          </div>
        </Section>

        {/* Empty */}
        <Section title="EmptyState">
          <EmptyState
            title="Kebunmu masih kosong"
            description="Pilih tanaman pertamamu dan mulai hari ini."
            actionLabel="Tambah Tanaman"
          />
          <EmptyState title="Belum ada task yang selesai." />
          <EmptyState title="Belum ada badge. Selesaikan misi pertamamu!" />
        </Section>

        {/* Loading */}
        <Section title="Loading — Skeleton">
          <p className="text-sm font-semibold text-muted-foreground">Memuat kebunmu…</p>
          <div className="flex flex-col gap-3" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex animate-pulse items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-soft">
                <div className="size-11 rounded-full bg-muted" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="h-4 w-2/3 rounded bg-muted" />
                  <div className="h-3 w-1/3 rounded bg-muted" />
                </div>
                <div className="size-11 rounded-full bg-muted" />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
