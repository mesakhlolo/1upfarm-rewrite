import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

/**
 * HPBar — design-system §6.3.
 * Label "Darah" dari ui-copy §18. HP max 100 (gameplay §12).
 * Warna via token --stat-hp / --warning; ≤30 = state bahaya.
 */
export function HPBar({
  hp,
  max = 100,
  size = "full",
  className,
}: {
  hp: number;
  max?: number;
  size?: "mini" | "full";
  className?: string;
}) {
  const percentage = max > 0 ? Math.max(0, Math.min(100, (hp / max) * 100)) : 0;
  const isDanger = hp <= 30;

  if (size === "mini") {
    return (
      <div className={cn("flex min-w-0 items-center gap-1.5", className)} aria-label={`Darah ${hp}/${max}`}>
        <Heart className={cn("size-4 shrink-0", isDanger ? "text-warning" : "text-stat-hp")} aria-hidden />
        <Progress
          value={percentage}
          className="h-2 w-16 sm:w-20"
          indicatorClassName={isDanger ? "bg-warning" : "bg-stat-hp"}
        />
        <span className="text-xs font-extrabold tabular-nums text-foreground">{hp}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <Heart className={cn("size-4", isDanger ? "text-warning" : "text-stat-hp")} aria-hidden />
          Darah
        </span>
        <span className="text-xs font-extrabold tabular-nums text-foreground">
          {hp}/{max}
        </span>
      </div>
      <Progress
        value={percentage}
        className="h-2.5"
        indicatorClassName={isDanger ? "bg-warning" : "bg-stat-hp"}
      />
    </div>
  );
}
