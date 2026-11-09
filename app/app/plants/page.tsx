"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PlantCard } from "@/components/PlantCard";
import { EmptyState } from "@/components/EmptyState";
import { PLANTS, DIFFICULTY_LABEL, MEDIA_LABEL, getHarvestDisplay } from "@/data/plants";
import { cn } from "@/lib/utils";

type Filter = "Semua" | "Cepat panen" | "Mudah" | "Menantang";

const FILTERS: Filter[] = ["Semua", "Cepat panen", "Mudah", "Menantang"];

export default function PlantsPage() {
  const [filter, setFilter] = useState<Filter>("Semua");

  const filtered = useMemo(() => {
    if (filter === "Semua") return PLANTS;
    if (filter === "Mudah") return PLANTS.filter((p) => p.difficulty === "easy");
    if (filter === "Menantang") return PLANTS.filter((p) => p.difficulty === "hard");
    if (filter === "Cepat panen") return PLANTS.filter((p) => p.growDays.max <= 45);
    return PLANTS;
  }, [filter]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Pilih tanamanmu</h1>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">Semua angka panen adalah estimasi dari semai.</p>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter tanaman">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "min-h-[44px] rounded-full px-4 text-sm font-bold focus-visible:ring-2 focus-visible:ring-ring",
              filter === f ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary-soft",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Belum ada tanaman di filter ini." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plant) => (
            <Link key={plant.slug} href={`/app/plants/${plant.slug}`} className="focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
              <PlantCard
                name={plant.name}
                emoji={plant.emoji}
                difficulty={DIFFICULTY_LABEL[plant.difficulty]}
                harvestDays={getHarvestDisplay(plant)}
                media={MEDIA_LABEL[plant.media[0]]}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
