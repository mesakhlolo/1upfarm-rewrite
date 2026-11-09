import { cn } from "@/lib/utils";
import type { PlantPhase } from "@/data/plants";

/** StageStepper — design-system §6.6. Aktif ungu, selesai hijau. */
export function StageStepper({ phases, currentDay }: { phases: PlantPhase[]; currentDay: number }) {
  return (
    <ol className="flex flex-col gap-3" aria-label="Tahapan tumbuh">
      {phases.map((phase, i) => {
        const isActive = currentDay >= phase.startDay && currentDay <= phase.endDay;
        const isDone = currentDay > phase.endDay;
        return (
          <li key={phase.id} className="flex gap-3">
            <span
              aria-hidden
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
                isDone && "bg-stat-growth text-white",
                isActive && "bg-primary text-white",
                !isDone && !isActive && "bg-muted text-foreground",
              )}
            >
              {isDone ? "✓" : i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm font-extrabold", isActive ? "text-primary" : "text-foreground")}>
                {phase.name}
                <span className="ml-2 text-xs font-semibold text-muted-foreground">
                  hari {phase.startDay}–{phase.endDay}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">{phase.description}</p>
              <p className="text-xs font-semibold text-foreground">Task: {phase.task}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
