import type { LucideIcon } from "lucide-react";
import { Bug, Camera, Check, Coins, Droplets, Scissors, Sparkles, Sprout, Wheat } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { DifficultyTag, type Difficulty } from "@/components/DifficultyTag";

/**
 * TaskCard — design-system §6.2.
 * Ikuti pola shadcn Card; ikon tipe + judul + tag difficulty + pill reward.
 * Tipe dari ui-copy §18; reward angka ikut gameplay §3.
 */
export type TaskType = "Siram" | "Pupuk" | "Cek hama" | "Pangkas" | "Panen" | "Foto";
export type TaskStatus = "todo" | "done" | "missed";

const typeIcons: Record<TaskType, LucideIcon> = {
  Siram: Droplets,
  Pupuk: Sprout,
  "Cek hama": Bug,
  Pangkas: Scissors,
  Panen: Wheat,
  Foto: Camera,
};

export function TaskCard({
  title,
  type,
  difficulty,
  exp,
  gold,
  status,
  plantName,
  onToggle,
  className,
}: {
  title: string;
  type: TaskType;
  difficulty?: Difficulty;
  exp: number;
  gold: number;
  status: TaskStatus;
  plantName?: string;
  onToggle?: () => void;
  className?: string;
}) {
  const Icon = typeIcons[type];
  const isDone = status === "done";
  const isMissed = status === "missed";

  return (
    <Card
      className={cn(
        "flex flex-row items-center gap-3 rounded-lg p-4 shadow-soft",
        isDone && "border-stat-growth/30 bg-stat-growth/5",
        isMissed && "border-stat-hp/20 bg-stat-hp/5 opacity-75",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-full",
          isMissed ? "bg-stat-hp/10 text-stat-hp" : "bg-primary-soft text-primary",
        )}
        aria-hidden
      >
        <Icon className="size-5" />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "min-w-0 text-sm font-bold text-foreground sm:text-base",
              isDone && "text-muted-foreground line-through",
              isMissed && "text-muted-foreground",
            )}
          >
            {plantName ? `${title} · ${plantName}` : title}
          </span>
          {difficulty ? <DifficultyTag difficulty={difficulty} /> : null}
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-6 items-center gap-1 rounded-full bg-stat-xp/10 px-2 text-xs font-bold text-stat-xp">
            <Sparkles className="size-3.5" aria-hidden />+{exp} EXP
          </span>
          <span className="inline-flex h-6 items-center gap-1 rounded-full bg-stat-gold/10 px-2 text-xs font-bold text-stat-gold">
            <Coins className="size-3.5" aria-hidden />+{gold} gold
          </span>
          <span className="text-xs font-semibold text-muted-foreground">{type}</span>
        </span>
      </span>

      <button
        type="button"
        onClick={onToggle}
        aria-label={isDone ? `${title} — selesai` : `${title} — tandai selesai`}
        aria-pressed={isDone}
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDone
            ? "border-stat-growth bg-stat-growth text-primary-foreground"
            : "border-border bg-card text-transparent hover:border-stat-growth hover:text-stat-growth",
          isMissed && "border-stat-hp/30",
        )}
      >
        <Check className={cn("size-5", isDone ? "opacity-100" : "opacity-0")} aria-hidden />
      </button>
    </Card>
  );
}
