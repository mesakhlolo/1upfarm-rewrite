import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

/**
 * XPBar — design-system §6.3.
 * Label "EXP" dari ui-copy §18. need(L) = 50 × L (gameplay §4).
 * Warna via token --stat-xp.
 */
export function XPBar({
  xp,
  need,
  size = "full",
  className,
}: {
  xp: number;
  need: number;
  size?: "mini" | "full";
  className?: string;
}) {
  const percentage = need > 0 ? Math.max(0, Math.min(100, (xp / need) * 100)) : 0;

  if (size === "mini") {
    return (
      <div className={cn("flex min-w-0 items-center gap-1.5", className)} aria-label={`EXP ${xp}/${need}`}>
        <Sparkles className="size-4 shrink-0 text-stat-xp" aria-hidden />
        <Progress value={percentage} className="h-2 w-16 sm:w-20" indicatorClassName="bg-stat-xp" />
        <span className="text-xs font-extrabold tabular-nums text-foreground">
          {xp}/{need}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <Sparkles className="size-4 text-stat-xp" aria-hidden />
          EXP
        </span>
        <span className="text-xs font-extrabold tabular-nums text-foreground">
          {xp}/{need}
        </span>
      </div>
      <Progress value={percentage} className="h-2.5" indicatorClassName="bg-stat-xp" />
    </div>
  );
}
