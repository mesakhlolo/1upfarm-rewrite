import Link from "next/link";
import {
  AlarmClock,
  ArrowRight,
  Camera,
  CheckCircle2,
  Sprout,
  BookOpen,
  Flame,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlantCard } from "@/components/PlantCard";
import {
  DIFFICULTY_LABEL,
  MEDIA_LABEL,
  getHarvestDisplay,
  getPlantBySlug,
} from "@/data/plants";
import {
  RESEARCH_EVIDENCE,
  RESEARCH_SAMPLE_SIZE,
  RESEARCH_STATS,
} from "@/data/research-stats";

/* ------------------------------------------------------------------ */
/* Copy — docs/content/ui-copy.md §2 (jangan karang).                 */
/* ------------------------------------------------------------------ */

const HERO_H1 = "Tanam di lahan sempit, panen dalam 30 hari.";
const HERO_SUB =
  "1UpFarm memandu kamu hari demi hari merawat tanaman nyata — dengan misi harian, streak, dan reward. Cocok buat pemula yang gampang lupa.";
const CTA_PRIMARY = "Mulai Gratis";
const CTA_SECONDARY = "Lihat cara kerjanya";

const PROBLEM_TITLE = "Kenapa banyak yang gagal mulai berkebun?";
const SOLUTION_TITLE = "1UpFarm bikin kamu tetap di jalur.";
const FOOTER_COPY = "Dibuat oleh Tim Cangkul Titik Koma.";

const MASCOT_MESSAGE = "Pelan-pelan aja, yang penting konsisten 🌱";

const FEATURED_SLUGS = ["selada", "kangkung", "daun-bawang"] as const;

const STEPS = [
  { label: "Pilih tanaman" },
  { label: "Ikuti misi harian" },
  { label: "Panen pertama" },
];

const SOLUTIONS = [
  {
    icon: BookOpen,
    title: "Resep harian",
    description: "tahu persis hari ini harus apa.",
  },
  {
    icon: Camera,
    title: "Foto bukti tumbuh",
    description: "lihat tanamanmu berkembang nyata.",
  },
  {
    icon: Award,
    title: "Reward",
    description: "EXP, streak, badge — bikin semangat balik tiap hari.",
  },
];

function getStat(percent: number) {
  return RESEARCH_STATS.find((s) => s.percent === percent);
}

const PROBLEM_ITEMS = [
  {
    percent: getStat(91)?.percent ?? 91,
    text: "pemula belum paham cara mulai.",
  },
  {
    percent: getStat(64)?.percent ?? 64,
    text: "merasa nggak punya waktu merawat.",
  },
  {
    percent: getStat(68)?.percent ?? 68,
    text: "butuh pengingat biar nggak lupa menyiram.",
  },
];

export default function Home() {
  const featuredPlants = FEATURED_SLUGS.map((slug) => getPlantBySlug(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <a href="#atas" className="flex min-h-[44px] items-center gap-2" aria-label="1UpFarm — kembali ke atas">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-1upfarm.svg" alt="Logo 1UpFarm" width={36} height={36} className="h-9 w-9" />
            <span className="text-lg font-extrabold text-foreground">1UpFarm</span>
          </a>
          <nav className="flex items-center gap-1" aria-label="Navigasi landing">
            <a
              href="#cara-kerja"
              className="inline-flex min-h-[44px] items-center rounded-full px-4 text-base font-bold text-foreground hover:bg-muted"
            >
              Cara kerja
            </a>
            <Button asChild size="lg" className="min-h-[44px] rounded-full px-5 text-base font-extrabold">
              <Link href="/register">{CTA_PRIMARY}</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main id="atas" className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 md:py-20">
            <span className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-muted px-4 text-base font-bold">
              <Sprout className="size-5 text-primary" aria-hidden />
              {MASCOT_MESSAGE}
            </span>
            <h1 className="max-w-3xl text-[28px] leading-[36px] font-extrabold text-foreground sm:text-4xl sm:leading-[40px]">
              {HERO_H1}
            </h1>
            <p className="max-w-2xl text-base leading-6 font-medium text-muted-foreground sm:text-lg">
              {HERO_SUB}
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button asChild size="lg" className="bg-primary-gradient min-h-[44px] w-full rounded-full px-6 text-base font-extrabold text-white shadow-pop sm:w-auto">
                <Link href="/register">
                  {CTA_PRIMARY}
                  <ArrowRight className="ml-2 size-5" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-[44px] w-full rounded-full px-6 text-base font-extrabold sm:w-auto">
                <a href="#cara-kerja">
                  <CheckCircle2 className="mr-2 size-5" aria-hidden />
                  {CTA_SECONDARY}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="masalah" aria-labelledby="problem-title" className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
          <h2 id="problem-title" className="text-center text-2xl leading-8 font-bold text-foreground sm:text-3xl">
            {PROBLEM_TITLE}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Statistik hambatan berkebun dari riset">
            {PROBLEM_ITEMS.map((item) => (
              <li key={item.percent} className="list-none">
                <Card className="flex h-full flex-col items-center gap-2 rounded-lg p-6 text-center shadow-soft">
                  <span className="text-4xl leading-none font-extrabold text-primary tabular-nums">
                    {item.percent}%
                  </span>
                  <span className="text-base leading-6 font-semibold text-foreground">
                    {item.percent}% {item.text}
                  </span>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        {/* Solusi */}
        <section id="solusi" aria-labelledby="solution-title" className="border-y border-border bg-card">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
            <h2 id="solution-title" className="text-center text-2xl leading-8 font-bold text-foreground sm:text-3xl">
              {SOLUTION_TITLE}
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Solusi 1UpFarm">
              {SOLUTIONS.map(({ icon: Icon, title, description }) => (
                <li key={title} className="list-none">
                  <Card className="flex h-full flex-col gap-3 rounded-lg p-6 shadow-soft">
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft">
                      <Icon className="size-5 text-primary" aria-hidden />
                    </span>
                    <h3 className="text-lg leading-7 font-bold text-foreground">{title}</h3>
                    <p className="text-base leading-6 text-muted-foreground">{description}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cara kerja */}
        <section id="cara-kerja" aria-labelledby="cara-kerja-title" className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
          <h2 id="cara-kerja-title" className="text-center text-2xl leading-8 font-bold text-foreground sm:text-3xl">
            Cara kerja
          </h2>
          <p className="mt-3 text-center text-base leading-6 font-semibold text-muted-foreground">
            Pilih tanaman → Ikuti misi harian → Panen pertama.
          </p>
          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.label} className="list-none">
                <Card className="flex h-full flex-col items-center gap-3 rounded-lg p-6 text-center shadow-soft">
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary text-base font-extrabold text-white tabular-nums" aria-hidden>
                    {index + 1}
                  </span>
                  <h3 className="text-lg leading-7 font-extrabold text-foreground">{step.label}</h3>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        {/* Preview fitur */}
        <section id="preview" aria-labelledby="preview-title" className="border-y border-border bg-card">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-soft px-4 text-base font-bold text-foreground">
                <Flame className="size-5 text-stat-streak" aria-hidden />
                Preview fitur
              </span>
              <h2 id="preview-title" className="text-2xl leading-8 font-bold text-foreground sm:text-3xl">
                Tanaman yang bisa kamu mulai
              </h2>
              <p className="max-w-xl text-base leading-6 text-muted-foreground">
                Pilih tanaman pertamamu dan mulai hari ini.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPlants.map((plant) => (
                <PlantCard
                  key={plant.slug}
                  name={plant.name}
                  emoji={plant.emoji}
                  difficulty={DIFFICULTY_LABEL[plant.difficulty]}
                  harvestDays={getHarvestDisplay(plant)}
                  media={MEDIA_LABEL[plant.media[0]]}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bukti statistik */}
        <section id="bukti" aria-labelledby="bukti-title" className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 md:py-16">
          <Card className="rounded-xl p-6 text-center shadow-soft sm:p-8" aria-labelledby="bukti-title">
            <h2 id="bukti-title" className="text-2xl leading-8 font-bold text-foreground sm:text-3xl">
              Bukti dari riset
            </h2>
            <p className="mt-4 text-base leading-6 font-semibold text-foreground sm:text-lg">
              {RESEARCH_EVIDENCE}
            </p>
            <p className="mt-3 flex items-center justify-center gap-2 text-base font-medium text-muted-foreground">
              <AlarmClock className="size-5" aria-hidden />
              Berdasarkan {RESEARCH_SAMPLE_SIZE} responden.
            </p>
          </Card>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-base leading-6 text-muted-foreground">
              Satu misi hari ini, satu langkah lebih dekat ke panen.
            </p>
            <Button asChild size="lg" className="bg-primary-gradient min-h-[44px] rounded-full px-6 text-base font-extrabold text-white shadow-pop">
              <Link href="/register">
                {CTA_PRIMARY}
                <ArrowRight className="ml-2 size-5" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-2 px-4 py-6 text-center sm:px-6">
          <p className="text-base leading-6 font-semibold text-foreground">{FOOTER_COPY}</p>
          <p className="text-base leading-6 text-muted-foreground">Duolingo-nya menanam: belajar berkebun sambil main, sampai kamu panen.</p>
        </div>
      </footer>
    </div>
  );
}
