import type { LucideIcon } from "lucide-react";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

/**
 * BadgeCard — design-system §6.5.
 * Nama & deskripsi dari ui-copy §19; terkunci=abu, terbuka=gradient reward.
 */
export function BadgeCard({
  name,
  description,
  icon: Icon = Award,
  unlocked = false,
  className,
}: {
  name: string;
  description: string;
  icon?: LucideIcon;
  unlocked?: boolean;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "flex flex-row items-center gap-3 rounded-lg p-4 shadow-soft",
        !unlocked && "opacity-80",
        className,
      )}
      aria-label={unlocked ? `Badge ${name}` : `Badge ${name} terkunci`}
    >
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full",
          unlocked ? "bg-reward-gradient text-primary-foreground" : "bg-muted text-muted-foreground",
        )}
        aria-hidden
      >
        <Icon className="size-6" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className={cn("text-sm font-extrabold sm:text-base", unlocked ? "text-foreground" : "text-muted-foreground")}>
          {name}
        </span>
        <span className="text-xs font-semibold text-muted-foreground sm:text-sm">{description}</span>
      </span>
    </Card>
  );
}
