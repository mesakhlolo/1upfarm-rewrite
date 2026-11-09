import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { DifficultyTag, type Difficulty } from "@/components/DifficultyTag";

/**
 * PlantCard — design-system §6.2.
 * Foto/emoji tanaman, nama, tag difficulty, "±{hari} hari", tag media.
 * Emoji dari plants.json untuk MVP (AGENTS §7, design-system §10).
 */
export type MediaType = "Polybag/Pot" | "Hidroponik";

export function PlantCard({
  name,
  emoji,
  difficulty,
  harvestDays,
  media,
  className,
}: {
  name: string;
  emoji: string;
  difficulty: Difficulty;
  harvestDays: number;
  media: MediaType;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col gap-3 rounded-lg p-4 shadow-soft", className)}>
      <span className="flex h-20 items-center justify-center rounded-md bg-muted text-5xl" aria-hidden>
        {emoji}
      </span>
      <span className="flex flex-col gap-2">
        <span className="text-base font-extrabold text-foreground">{name}</span>
        <span className="flex flex-wrap items-center gap-2">
          <DifficultyTag difficulty={difficulty} />
          <span className="inline-flex h-6 items-center gap-1 rounded-full bg-primary-soft px-2 text-xs font-bold text-foreground">
            <Clock className="size-3.5" aria-hidden />±{harvestDays} hari
          </span>
          <span className="inline-flex h-6 items-center rounded-full bg-muted px-2 text-xs font-bold text-foreground">
            {media}
          </span>
        </span>
      </span>
    </Card>
  );
}
