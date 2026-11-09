"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Clock, Sun, Ruler, MoveHorizontal, Droplets } from "lucide-react";
import { getPlantBySlug, DIFFICULTY_LABEL, MEDIA_LABEL } from "@/data/plants";
import { StageStepper } from "@/components/StageStepper";
import { MediaTag } from "@/components/MediaTag";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGardenStore } from "@/store/useGardenStore";
import { todayString } from "@/lib/utils";

export default function PlantDetailPage() {
  const params = useParams<{ slug: string }>();
  const plant = getPlantBySlug(params.slug);
  const currentUser = useGardenStore((s) => s.currentUser);
  if (!plant) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-xl font-extrabold text-foreground">Halaman nggak ditemukan.</p>
        <Button asChild>
          <Link href="/app/plants">Kembali ke Beranda</Link>
        </Button>
      </div>
    );
  }

  const today = todayString();
  // currentDay dummy = 1 untuk preview detail (belum ada tanaman)
  const previewDay = 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex h-28 items-center justify-center rounded-xl bg-muted text-6xl" aria-hidden>
          {plant.emoji}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">{plant.name}</h1>
          <p className="text-sm font-semibold italic text-muted-foreground">{plant.latin}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <MediaTag media={MEDIA_LABEL[plant.media[0]]} />
            {plant.media.length > 1 ? <MediaTag media={MEDIA_LABEL[plant.media[1]]} /> : null}
            <span className="inline-flex h-6 items-center gap-1 rounded-full bg-primary-soft px-2.5 text-xs font-bold text-foreground">
              {DIFFICULTY_LABEL[plant.difficulty]}
            </span>
          </div>
        </div>
      </div>

      <Card className="rounded-lg p-4 shadow-soft">
        <h2 className="text-base font-extrabold text-foreground">Info tanaman</h2>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <Clock className="size-4" aria-hidden /> Perkiraan panen
            </dt>
            <dd className="mt-1 font-extrabold text-foreground">
              ±{plant.growDays.min}–{plant.growDays.max} hari (estimasi dari semai)
            </dd>
            <dd className="text-xs text-muted-foreground">Bisa beda tergantung varietas, dataran, dan media.</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <Sun className="size-4" aria-hidden /> Matahari
            </dt>
            <dd className="mt-1 font-bold text-foreground">{plant.sunlight}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <Ruler className="size-4" aria-hidden /> Ukuran pot
            </dt>
            <dd className="mt-1 font-bold text-foreground">{plant.potSize}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <MoveHorizontal className="size-4" aria-hidden /> Jarak tanam
            </dt>
            <dd className="mt-1 font-bold text-foreground">{plant.spacing}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <Droplets className="size-4" aria-hidden /> pH
            </dt>
            <dd className="mt-1 font-bold text-foreground">{plant.ph}</dd>
          </div>
        </dl>
        {currentUser ? (
          <p className="mt-3 text-xs text-muted-foreground">Hari ini: {today} • Preview hari ke-{previewDay}</p>
        ) : null}
      </Card>

      <section aria-labelledby="tahapan" className="flex flex-col gap-3">
        <h2 id="tahapan" className="text-lg font-extrabold text-foreground">
          Tahapan tumbuh
        </h2>
        <StageStepper phases={plant.phases} currentDay={previewDay} />
      </section>

      <section aria-labelledby="tips" className="flex flex-col gap-3">
        <h2 id="tips" className="text-lg font-extrabold text-foreground">
          Tips penting
        </h2>
        <ul className="flex flex-col gap-2">
          {plant.tips.map((tip) => (
            <li key={tip} className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-soft">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="masalah" className="flex flex-col gap-3">
        <h2 id="masalah" className="text-lg font-extrabold text-foreground">
          Kalau bermasalah
        </h2>
        <ul className="flex flex-col gap-2">
          {plant.problems.map((p) => (
            <li key={p} className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-soft">
              {p}
            </li>
          ))}
        </ul>
      </section>

      <Button asChild size="lg" className="min-h-[44px] bg-primary-gradient text-white">
        <Link href={`/app/garden/add?plant=${plant.slug}`}>Tanam ini</Link>
      </Button>
    </div>
  );
}
