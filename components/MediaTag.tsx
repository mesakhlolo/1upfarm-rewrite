import { cn } from "@/lib/utils";

export function MediaTag({ media, className }: { media: "Polybag/Pot" | "Hidroponik"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 w-fit items-center rounded-full px-2.5 text-xs font-bold",
        media === "Polybag/Pot" ? "bg-primary-soft text-foreground" : "bg-stat-xp/10 text-foreground",
        className,
      )}
    >
      {media}
    </span>
  );
}
