import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

const MASCOT_MESSAGES = [
  "Pelan-pelan aja, yang penting konsisten 🌱",
  "Tanamanmu bangga sama kamu!",
  "Satu misi hari ini, satu langkah lebih dekat ke panen.",
  "Lupa kemarin? Nggak apa-apa, mulai lagi sekarang.",
  "Kamu udah lebih jago dari kemarin.",
] as const;

export function pickMascotMessage(seed: number): string {
  const i = Math.abs(seed) % MASCOT_MESSAGES.length;
  return MASCOT_MESSAGES[i];
}

/** MascotBubble — design-system §6.8, copy ui-copy §17 */
export function MascotBubble({ message, className }: { message: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} role="status" aria-live="polite">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary" aria-hidden>
        <Sprout className="size-5" />
      </span>
      <p className="rounded-xl bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-soft sm:text-base">{message}</p>
    </div>
  );
}
