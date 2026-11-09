"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CalendarDays, Award } from "lucide-react";
import { getPlantBySlug, MEDIA_LABEL } from "@/data/plants";
import { StageStepper } from "@/components/StageStepper";
import { GrowthRing } from "@/components/GrowthRing";
import { TaskCard } from "@/components/TaskCard";
import { PhotoCheckpointUpload } from "@/components/PhotoCheckpointUpload";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { useGardenStore } from "@/store/useGardenStore";
import { todayString, formatDateId } from "@/lib/utils";
import { currentDayFor } from "@/lib/plant-engine";
import { toast } from "sonner";

export default function PlanPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const plantId = params.id;
  const myPlants = useGardenStore((s) => s.myPlants);
  const myTasks = useGardenStore((s) => s.myTasks);
  const addPhoto = useGardenStore((s) => s.addPhoto);
  const harvestPlant = useGardenStore((s) => s.harvestPlant);
  const completeTask = useGardenStore((s) => s.completeTask);

  const plant = myPlants.find((p) => p.id === plantId);
  const catalog = plant ? getPlantBySlug(plant.plantSlug) : undefined;
  const [showCelebration, setShowCelebration] = useState(false);
  const [photoDismissed, setPhotoDismissed] = useState<Record<number, boolean>>({});

  const today = todayString();
  const currentDay = plant ? currentDayFor(plant.startedAt, today) : 1;

  const tasksForPlant = useMemo(() => myTasks.filter((t) => t.gardenPlantId === plantId), [myTasks, plantId]);

  // Kelompokkan per tanggal untuk timeline (7 hari berikutnya)
  const timeline = useMemo(() => {
    const groups = new Map<string, typeof tasksForPlant>();
    for (const t of tasksForPlant) {
      const arr = groups.get(t.dateStr) ?? [];
      arr.push(t);
      groups.set(t.dateStr, arr);
    }
    return [...groups.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(0, 14);
  }, [tasksForPlant]);

  // Checkpoint foto hari ini
  const todaysCheckpoint = plant?.photos.find((p) => p.day === currentDay);

  if (!plant || !catalog) {
    return (
      <div className="flex flex-col gap-4">
        <EmptyState title="Halaman nggak ditemukan." description="Rencana tanaman ini tidak ada." />
        <Button asChild className="min-h-[44px]">
          <Link href="/app/home">Kembali ke Beranda</Link>
        </Button>
      </div>
    );
  }

  const isHarvested = plant.status === "harvested";
  const isReadyToHarvest = currentDay >= plant.growDaysMax && !isHarvested;

  function handleUpload(dataUrl: string) {
    if (!todaysCheckpoint) return;
    const res = addPhoto(plantId, todaysCheckpoint.day, todaysCheckpoint.stage, dataUrl);
    if (res.ok) {
      toast.success("Keren! +5 HP, +10 EXP.");
      const hasFotoPertama = useGardenStore.getState().currentUser?.badges.includes("foto-pertama");
      if (hasFotoPertama) toast.success("Badge baru: Foto Pertama!");
    } else {
      toast.error(res.error ?? "Ada yang salah. Coba lagi.");
    }
  }

  function handleHarvest() {
    const res = harvestPlant(plantId);
    if (res.ok) {
      setShowCelebration(true);
      toast.success("Badge baru: Panen Pertama!");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {showCelebration ? (
        <CelebrationOverlay
          onCta={() => {
            setShowCelebration(false);
            router.push("/app/plants");
          }}
          onClose={() => setShowCelebration(false)}
        />
      ) : null}

      {/* Header tanaman */}
      <div className="flex items-center gap-4">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-muted text-4xl" aria-hidden>
          {plant.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-extrabold text-foreground">{plant.plantName}</h1>
          <p className="text-sm font-semibold text-muted-foreground">{MEDIA_LABEL[plant.media]}</p>
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <CalendarDays className="size-4" aria-hidden />
            Mulai {formatDateId(plant.startedAt)} • Panen {formatDateId(plant.estimatedHarvest)}
          </p>
          <p className="text-xs font-semibold text-muted-foreground">
            Hari ke-{currentDay} dari {plant.growDaysMax} • Status: {isHarvested ? "Panen" : "Tumbuh"}
          </p>
        </div>
        <GrowthRing currentDay={currentDay} maxDay={plant.growDaysMax} />
      </div>

      <StageStepper phases={catalog.phases} currentDay={currentDay} />

      {/* Photo checkpoint hari ini */}
      {todaysCheckpoint && !photoDismissed[todaysCheckpoint.day] ? (
        <PhotoCheckpointUpload
          plantName={plant.plantName}
          stage={todaysCheckpoint.stage}
          day={todaysCheckpoint.day}
          existingImage={todaysCheckpoint.imageDataUrl}
          onUpload={handleUpload}
          onDismiss={() => setPhotoDismissed((m) => ({ ...m, [todaysCheckpoint.day]: true }))}
        />
      ) : null}

      {/* Timeline */}
      <section aria-labelledby="timeline" className="flex flex-col gap-3">
        <h2 id="timeline" className="text-lg font-extrabold text-foreground">
          Rencana hari ke hari
        </h2>
        {timeline.length === 0 ? (
          <EmptyState title="Belum ada task." description="Task akan muncul saat rencana dimulai." />
        ) : (
          timeline.map(([dateStr, tasks]) => (
            <div key={dateStr} className="flex flex-col gap-2">
              <p className="text-xs font-bold text-muted-foreground">{formatDateId(dateStr)}</p>
              <div className="flex flex-col gap-2">
                {tasks.map((t) => (
                  <TaskCard
                    key={t.id}
                    title={t.title}
                    type={t.type as "Siram" | "Pupuk" | "Cek hama" | "Pangkas" | "Panen" | "Foto"}
                    difficulty={t.difficulty === "easy" ? "Mudah" : t.difficulty === "medium" ? "Sedang" : "Menantang"}
                    exp={t.exp}
                    gold={t.gold}
                    status={t.status}
                    plantName={t.plantName}
                    onToggle={() => {
                      const r = completeTask(t.id);
                      if (r.ok) toast.success(`Selesai! +${t.exp} EXP, +${t.gold} gold.`);
                    }}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Progress foto */}
      <section aria-labelledby="progress-foto" className="flex flex-col gap-3">
        <h2 id="progress-foto" className="text-lg font-extrabold text-foreground">
          Bukti tumbuh
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {plant.photos.map((ph) => (
            <div key={ph.day} className="flex flex-col gap-1">
              {ph.imageDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ph.imageDataUrl} alt={`Hari ${ph.day} ${ph.stage}`} className="h-24 w-full rounded-md object-cover" />
              ) : (
                <span className="flex h-24 items-center justify-center rounded-md border border-dashed border-border bg-muted/50 text-xs font-semibold text-muted-foreground">
                  Hari {ph.day}
                </span>
              )}
              <span className="text-xs font-semibold text-muted-foreground">
                Hari {ph.day} • {ph.stage}
              </span>
            </div>
          ))}
        </div>
      </section>

      {isReadyToHarvest ? (
        <Card className="rounded-lg border-stat-growth/40 bg-stat-growth/5 p-4">
          <p className="flex items-center gap-2 text-base font-extrabold text-foreground">
            <Award className="size-5 text-stat-growth" aria-hidden /> Siap panen!
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Selesaikan siklus sampai panen untuk badge.</p>
          <Button size="lg" className="mt-3 min-h-[44px] bg-primary-gradient text-white" onClick={handleHarvest}>
            Panen Sekarang
          </Button>
        </Card>
      ) : null}
      {isHarvested ? (
        <Card className="rounded-lg p-4">
          <p className="text-base font-extrabold text-foreground">PANEN PERTAMA! 🎉</p>
          <p className="text-sm text-muted-foreground">Kamu berhasil menanam sampai panen. Luar biasa!</p>
          <Button asChild variant="outline" className="mt-3 min-h-[44px]">
            <Link href="/app/plants">Tanam Berikutnya</Link>
          </Button>
        </Card>
      ) : null}
    </div>
  );
}
