import type { LucideIcon } from "lucide-react";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * EmptyState — design-system §6.9.
 * Ikon + judul + deskripsi + CTA. Teks dari ui-copy (di-pass dari halaman).
 */
export function EmptyState({
  title,
  description,
  icon: Icon = Sprout,
  actionLabel,
  onAction,
  className,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card/60 px-6 py-10 text-center shadow-soft", className)}>
      <span className="flex size-16 items-center justify-center rounded-full bg-primary-soft text-primary" aria-hidden>
        <Icon className="size-8" />
      </span>
      <p className="text-base font-extrabold text-foreground">{title}</p>
      {description ? <p className="max-w-sm text-sm font-medium text-muted-foreground">{description}</p> : null}
      {actionLabel ? (
        <Button type="button" size="lg" className="mt-1 bg-primary-gradient text-primary-foreground hover:opacity-90" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
