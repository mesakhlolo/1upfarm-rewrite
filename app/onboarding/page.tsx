"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sprout, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    icon: Sprout,
    title: "Selamat datang di 1UpFarm",
    desc: "Teman berkebun yang bikin kamu konsisten.",
  },
  {
    icon: Heart,
    title: "Nggak perlu jago dulu",
    desc: "Panduan langkah demi langkah buat pemula total.",
  },
  {
    icon: Target,
    title: "Satu tanaman, satu komitmen",
    desc: "Kita mulai dari yang paling gampang dan cepat panen.",
  },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const slide = SLIDES[idx];
  const isLast = idx === SLIDES.length - 1;
  const Icon = slide.icon;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md rounded-xl p-6 text-center shadow-pop">
        <div className="flex flex-col items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary-soft text-primary" aria-hidden>
            <Icon className="size-8" />
          </span>
          <h1 className="text-2xl font-extrabold text-foreground">{slide.title}</h1>
          <p className="text-base font-semibold text-muted-foreground">{slide.desc}</p>

          <div className="flex items-center gap-1.5" aria-label={`Slide ${idx + 1} dari ${SLIDES.length}`}>
            {SLIDES.map((_, i) => (
              <span
                key={i}
                aria-hidden
                className={cn("h-2.5 rounded-full transition-all", i === idx ? "w-8 bg-primary" : "w-2.5 bg-muted")}
              />
            ))}
          </div>

          <div className="flex w-full flex-col gap-2">
            {isLast ? (
              <Button size="lg" className="min-h-[44px] bg-primary-gradient text-white" onClick={() => router.replace("/app/plants")}>
                Pilih Tanaman Pertamaku
              </Button>
            ) : (
              <Button size="lg" className="min-h-[44px] bg-primary-gradient text-white" onClick={() => setIdx((i) => i + 1)}>
                Lanjut
              </Button>
            )}
            <Button variant="ghost" className="min-h-[44px]" onClick={() => router.replace("/app/home")}>
              Lewati
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}
