import { cn } from "@/lib/utils";

/**
 * LevelBadge — design-system §6.3.
 * Lingkaran ungu "Lv. {n}" + tier gameplay §2:
 * Pemula (1–9), Berkelanjutan (10–24), Professional (25+).
 * Label "Level" dari ui-copy §18.
 */
function getTier(level: number): "Pemula" | "Berkelanjutan" | "Professional" {
  if (level >= 25) return "Professional";
  if (level >= 10) return "Berkelanjutan";
  return "Pemula";
}

export function LevelBadge({
  level,
  size = "full",
  className,
}: {
  level: number;
  size?: "mini" | "full";
  className?: string;
}) {
  const tier = getTier(level);

  if (size === "mini") {
    return (
      <span
        className={cn(
          "inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-primary px-2 text-xs font-extrabold tabular-nums text-primary-foreground",
          className,
        )}
        aria-label={`Level ${level} ${tier}`}
      >
        Lv. {level}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-extrabold tabular-nums text-primary-foreground shadow-soft">
        Lv. {level}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-xs font-bold text-muted-foreground">Level</span>
        <span className="text-sm font-extrabold text-foreground">{tier}</span>
      </span>
    </span>
  );
}
