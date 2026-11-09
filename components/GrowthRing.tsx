import { cn } from "@/lib/utils";

/** GrowthRing — design-system §6.6. Ring progres + % di tengah. */
export function GrowthRing({ currentDay, maxDay, className }: { currentDay: number; maxDay: number; className?: string }) {
  const pct = maxDay > 0 ? Math.min(100, Math.round((currentDay / maxDay) * 100)) : 0;
  const r = 34;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  return (
    <div className={cn("relative inline-flex size-20 items-center justify-center", className)} role="img" aria-label={`Progres tumbuh hari ${currentDay} dari ${maxDay} hari, ${pct} persen`}>
      <svg viewBox="0 0 80 80" className="size-20 -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--stat-growth)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <span className="absolute text-sm font-extrabold tabular-nums text-foreground">{pct}%</span>
    </div>
  );
}
