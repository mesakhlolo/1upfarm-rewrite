import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StreakFlame — design-system §6.3.
 * Ikon Flame orange (token --stat-streak) + angka.
 * Label "Streak" dari ui-copy §18.
 */
export function StreakFlame({
  streak,
  size = "full",
  className,
}: {
  streak: number;
  size?: "mini" | "full";
  className?: string;
}) {
  if (size === "mini") {
    return (
      <span className={cn("inline-flex min-w-0 items-center gap-1.5", className)} aria-label={`Streak ${streak}`}>
        <Flame className="size-4 shrink-0 text-stat-streak" aria-hidden />
        <span className="text-sm font-extrabold tabular-nums text-foreground">{streak}</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-soft", className)}>
      <Flame className="size-5 text-stat-streak" aria-hidden />
      <span className="flex flex-col leading-tight">
        <span className="text-xs font-bold text-muted-foreground">Streak</span>
        <span className="text-base font-extrabold tabular-nums text-foreground">{streak}</span>
      </span>
    </span>
  );
}
