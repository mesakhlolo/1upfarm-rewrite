import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * GoldCounter — design-system §6.3.
 * Label "Gold" dari ui-copy §18. Bukan bar; ikon Coins amber (token --stat-gold).
 */
export function GoldCounter({
  gold,
  size = "full",
  className,
}: {
  gold: number;
  size?: "mini" | "full";
  className?: string;
}) {
  if (size === "mini") {
    return (
      <span className={cn("inline-flex min-w-0 items-center gap-1.5", className)} aria-label={`Gold ${gold}`}>
        <Coins className="size-4 shrink-0 text-stat-gold" aria-hidden />
        <span className="text-sm font-extrabold tabular-nums text-foreground">{gold}</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-soft", className)}>
      <Coins className="size-5 text-stat-gold" aria-hidden />
      <span className="flex flex-col leading-tight">
        <span className="text-xs font-bold text-muted-foreground">Gold</span>
        <span className="text-base font-extrabold tabular-nums text-foreground">{gold}</span>
      </span>
    </span>
  );
}
