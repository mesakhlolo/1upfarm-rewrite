"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PLANTS, DIFFICULTY_LABEL, MEDIA_LABEL, type MediaKey } from "@/data/plants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlantCard } from "@/components/PlantCard";
import { useGardenStore } from "@/store/useGardenStore";
import { DIFFICULTY_REWARDS } from "@/data/plants";
import { todayString, formatDateId } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STEPS = ["Pilih tanaman", "Pilih media tanam", "Kapan mulai?", "Ringkasan"] as const;

export default function GardenAddPage() {
  const router = useRouter();
  const search = useSearchParams();
  const preselect = search.get("plant") ?? "";

  const addGardenPlant = useGardenStore((s) => s.addGardenPlant);

  const [step, setStep] = useState(0);
  const [plantSlug, setPlantSlug] = useState(preselect);
  const [media, setMedia] = useState<MediaKey>("polybag");
  const [useToday, setUseToday] = useState(true);
  const [customDate, setCustomDate] = useState(todayString());
  const [busy, setBusy] = useState(false);

  const plant = useMemo(() => PLANTS.find((p) => p.slug === plantSlug), [plantSlug]);
  const startDate = useToday ? todayString() : customDate || todayString();

  const estimatedHarvest = useMemo(() => {
    if (!plant) return "";
    const [y, m, d] = startDate.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + plant.growDays.max - 1);
    const yy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
  }, [plant, startDate]);

  const canNext = (() => {
    if (step === 0) return !!plant;
    if (step === 1) return plant?.media.includes(media) ?? false;
    if (step === 2) return !!startDate;
    return true;
  })();

  function handleStart() {
    if (!plant) return;
    setBusy(true);
    const res = addGardenPlant(plant.slug, media, startDate);
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error ?? "Ada yang salah. Coba lagi.");
      return;
    }
    const reward = DIFFICULTY_REWARDS[plant.difficulty];
    toast.success(`Rencana dimulai! Misi hari ke-1 sudah siap. Kamu dapat +${reward.exp} EXP.`);
    // Badge Tunastumbuh toast
    toast.success("Badge baru: Tunastumbuh!");
    router.replace(`/app/plan/${res.gardenPlantId}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Tambah tanaman</h1>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">Ikuti 4 langkah untuk memulai rencana tanam.</p>
      </div>

      {/* Stepper */}
      <ol className="flex items-center gap-2" aria-label="Langkah wizard">
        {STEPS.map((label, i) => (
          <li key={label} className="flex min-w-0 flex-1 items-center gap-2">
            <span
              aria-hidden
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
                i < step ? "bg-stat-growth text-white" : i === step ? "bg-primary text-white" : "bg-muted text-foreground",
              )}
            >
              {i < step ? <Check className="size-4" /> : i + 1}
            </span>
            <span className={cn("hidden text-xs font-bold sm:block", i === step ? "text-primary" : "text-muted-foreground")}>{label}</span>
            {i < STEPS.length - 1 ? <span className="mx-1 h-px flex-1 bg-border" aria-hidden /> : null}
          </li>
        ))}
      </ol>

      {/* Step content */}
      {step === 0 && (
        <section aria-labelledby="pilih-tanaman" className="flex flex-col gap-3">
          <h2 id="pilih-tanaman" className="text-lg font-extrabold text-foreground">
            Pilih tanaman
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PLANTS.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setPlantSlug(p.slug)}
                aria-pressed={plantSlug === p.slug}
                className={cn(
                  "rounded-lg text-left focus-visible:ring-2 focus-visible:ring-ring",
                  plantSlug === p.slug && "ring-2 ring-primary",
                )}
              >
                <PlantCard
                  name={p.name}
                  emoji={p.emoji}
                  difficulty={DIFFICULTY_LABEL[p.difficulty]}
                  harvestDays={p.growDays.max}
                  media={MEDIA_LABEL[p.media[0]]}
                />
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 1 && (
        <section aria-labelledby="pilih-media" className="flex flex-col gap-3">
          <h2 id="pilih-media" className="text-lg font-extrabold text-foreground">
            Pilih media tanam
          </h2>
          <div className="flex flex-col gap-3">
            {(["polybag", "hidroponik"] as MediaKey[]).map((m) => {
              const available = plant?.media.includes(m) ?? false;
              return (
                <button
                  key={m}
                  type="button"
                  disabled={!available}
                  onClick={() => setMedia(m)}
                  aria-pressed={media === m}
                  className={cn(
                    "min-h-[56px] rounded-lg border px-4 py-3 text-left font-bold focus-visible:ring-2 focus-visible:ring-ring",
                    media === m ? "border-primary bg-primary-soft" : "border-border bg-card",
                    !available && "opacity-50",
                  )}
                >
                  {MEDIA_LABEL[m]}
                  {!available ? <span className="ml-2 text-xs text-muted-foreground">(tidak tersedia)</span> : null}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="kapan-mulai" className="flex flex-col gap-3">
          <h2 id="kapan-mulai" className="text-lg font-extrabold text-foreground">
            Kapan mulai?
          </h2>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setUseToday(true)}
              aria-pressed={useToday}
              className={cn("min-h-[56px] rounded-lg border px-4 py-3 text-left font-bold", useToday ? "border-primary bg-primary-soft" : "border-border bg-card")}
            >
              Hari ini ({formatDateId(todayString())})
            </button>
            <button
              type="button"
              onClick={() => setUseToday(false)}
              aria-pressed={!useToday}
              className={cn("min-h-[56px] rounded-lg border px-4 py-3 text-left font-bold", !useToday ? "border-primary bg-primary-soft" : "border-border bg-card")}
            >
              Pilih tanggal
            </button>
            {!useToday ? (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="custom-date" className="text-sm font-bold text-foreground">
                  Tanggal mulai
                </label>
                <input
                  id="custom-date"
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="h-11 rounded-lg border border-input bg-card px-3 text-base"
                />
              </div>
            ) : null}
            <p className="text-sm font-medium text-muted-foreground">Kami akan perkirakan tanggal panen.</p>
          </div>
        </section>
      )}

      {step === 3 && plant && (
        <section aria-labelledby="ringkasan" className="flex flex-col gap-3">
          <h2 id="ringkasan" className="text-lg font-extrabold text-foreground">
            Ringkasan
          </h2>
          <Card className="rounded-lg p-4 shadow-soft">
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-muted-foreground">Tanaman</dt>
                <dd className="font-extrabold text-foreground">
                  {plant.emoji} {plant.name}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-muted-foreground">Media</dt>
                <dd className="font-bold text-foreground">{MEDIA_LABEL[media]}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-muted-foreground">Mulai</dt>
                <dd className="font-bold text-foreground">{formatDateId(startDate)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-muted-foreground">Estimasi panen</dt>
                <dd className="font-bold text-foreground">{formatDateId(estimatedHarvest)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-muted-foreground">Perkiraan</dt>
                <dd className="text-right font-bold text-foreground">
                  ±{plant.growDays.min}–{plant.growDays.max} hari (estimasi dari semai)
                </dd>
              </div>
            </dl>
          </Card>
        </section>
      )}

      {/* Nav buttons */}
      <div className="flex gap-3">
        {step > 0 ? (
          <Button variant="outline" size="lg" className="min-h-[44px] flex-1" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft className="size-4" aria-hidden /> Kembali
          </Button>
        ) : null}
        {step < 3 ? (
          <Button size="lg" className="min-h-[44px] flex-1 bg-primary-gradient text-white" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
            Lanjut <ArrowRight className="size-4" aria-hidden />
          </Button>
        ) : (
          <Button size="lg" className="min-h-[44px] flex-1 bg-primary-gradient text-white" disabled={busy} onClick={handleStart}>
            {busy ? "Memulai…" : "Mulai Rencana"}
          </Button>
        )}
      </div>
    </div>
  );
}
