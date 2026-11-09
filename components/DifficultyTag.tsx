import { cn } from "@/lib/utils";

/**
 * Label difficulty dari docs/content/ui-copy.md §18.
 * Mudah=hijau, Sedang=amber, Menantang=merah — soft bg + teks gelap;
 * warna HANYA via token design-system §6.7.
 */
export type Difficulty = "Mudah" | "Sedang" | "Menantang";

const difficultyStyles: Record<Difficulty, string> = {
  Mudah: "bg-stat-growth/10 text-foreground",
  Sedang: "bg-stat-gold/10 text-foreground",
  Menantang: "bg-stat-hp/10 text-foreground",
};

export function DifficultyTag({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 w-fit shrink-0 items-center rounded-full px-2.5 text-xs font-bold",
        difficultyStyles[difficulty],
        className,
      )}
    >
      {difficulty}
    </span>
  );
}
