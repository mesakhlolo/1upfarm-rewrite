"use client";

import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * CelebrationOverlay — ui-copy §12: "PANEN PERTAMA! 🎉" + CTA "Tanam Berikutnya".
 * Gradient reward. Reduced-motion hormati via media query sederhana.
 */
export function CelebrationOverlay({
  title = "PANEN PERTAMA! 🎉",
  description = "Kamu berhasil menanam sampai panen. Luar biasa!",
  ctaLabel = "Tanam Berikutnya",
  onCta,
  onClose,
  className,
}: {
  title?: string;
  description?: string;
  ctaLabel?: string;
  onCta: () => void;
  onClose?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-reward-gradient p-4",
        className,
      )}
    >
      <motion.div
        initial={{ scale: 0.92, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex max-w-md flex-col items-center gap-4 rounded-xl bg-card p-8 text-center shadow-pop"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-reward-gradient text-white" aria-hidden>
          <PartyPopper className="size-8" />
        </span>
        <h2 className="text-2xl font-extrabold text-foreground">{title}</h2>
        <p className="text-base font-semibold text-muted-foreground">{description}</p>
        <div className="flex w-full flex-col gap-2">
          <Button size="lg" className="bg-primary-gradient min-h-[44px] w-full text-white" onClick={onCta}>
            {ctaLabel}
          </Button>
          {onClose ? (
            <Button size="lg" variant="ghost" className="min-h-[44px] w-full" onClick={onClose}>
              Nanti saja
            </Button>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
