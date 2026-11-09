import { FAQ_ITEMS } from "@/data/faq";
import { getPlantBySlug } from "@/data/plants";

export interface LearnArticle {
  slug: string;
  title: string;
  excerpt: string;
  /** Paragraf terpisah — konten dari plant-catalog.md / research §11, bukan karangan. */
  paragraphs: string[];
  bullets?: string[];
  source: string;
}

const cabai = getPlantBySlug("cabai-rawit");
const selada = getPlantBySlug("selada");

function buildCabaiParagraphs() {
  if (!cabai) return [];
  const paras = cabai.phases.map((p) => `${p.name} (hari ${p.startDay}–${p.endDay}): ${p.description} Task: ${p.task}`);
  const rec = cabai.careSchedule.map((r) => `${r.label} setiap ${r.everyDays} hari (hari ${r.startDay}–${r.endDay}).`);
  return [
    "Panduan ini merangkum jadwal cabai rawit dari katalog tanaman (docs/content/plant-catalog.md §8) — estimasi panen 90–115 hari dari semai, media polybag 30–40 cm, matahari 6–8 jam.",
    ...paras,
    `Perawatan berkala: ${rec.join(" ")}`,
    `Tips: ${cabai.tips.join("; ")}.`,
    `Kalau bermasalah: ${cabai.problems.join("; ")}.`,
    "Angka hari panen dihitung dari semai. Sumber yang menyebut HST dari pindah tanam tidak bisa dibandingkan langsung — lihat FAQ.",
  ];
}

function buildHidroponikParagraphs() {
  return [
    "Hidroponik vs polybag: dua media ini ada di plants.json. Tergantung tanaman — selada, kangkung, dan pakcoy tersedia hidroponik; bayam, bawang merah, daun bawang, tomat, dan cabai rawit polybag/pot.",
    "Media polybag/pot seragam: tanah : kompos : arang sekam = 2 : 1 : 1. Pastikan pot berlubang drainase.",
    "Hidroponik cocok untuk leafy greens (selada 30–35 hari) karena akar menyerap nutrisi dari larutan; polybag lebih fleksibel untuk tanaman buah (cabai/tomat) yang butuh media kokoh dan ajir.",
    "Pilih media yang tersedia di tag tanaman di katalog — tidak semua tanaman mendukung kedua media.",
  ];
}

function buildPolybagParagraphs() {
  return [
    "Polybag adalah media paling umum untuk lahan sempit. Campuran seragam 2 : 1 : 1 (tanah : kompos : arang sekam) menjaga gembur dan drainase.",
    "Semua tanaman di katalog memakai media ini kecuali yang menyebut hidroponik. Ukuran pot mengikuti detail tiap tanaman (mis. selada 20–30 cm, cabai 30–40 cm).",
    "Jaga kelembapan: siram pagi, hindari genangan. Media yang becek membuat umbi/akar busuk (bawang merah, selada).",
  ];
}

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "cabai-rawit-mingguan",
    title: "Panduan Tanam Cabai Rawit: Jadwal Mingguan",
    excerpt: "Rencana hari 1–115 dari semai sampai panen, dari katalog tanaman.",
    paragraphs: buildCabaiParagraphs(),
    source: "docs/content/plant-catalog.md §8 · docs/content/plants.json (cabai-rawit)",
  },
  {
    slug: "hidroponik-vs-polybag",
    title: "Hidroponik vs Polybag: Pilih Media yang Tepat",
    excerpt: "Perbedaan media, tanaman yang mendukung, dan campuran media seragam.",
    paragraphs: buildHidroponikParagraphs(),
    source: "docs/content/plant-catalog.md — Ringkasan · FAQ media-pilihan",
  },
  {
    slug: "panduan-polybag",
    title: "Panduan Polybag untuk Lahan Sempit",
    excerpt: "Campuran media, drainase, dan perawatan dasar.",
    paragraphs: buildPolybagParagraphs(),
    source: "docs/content/plant-catalog.md — Ringkasan",
  },
  {
    slug: "selada-mulai",
    title: "Mulai dari Selada: Panen Cepat untuk Pemula",
    excerpt: "Selada easy, 30–45 hari dari semai — pilihan pertama yang disarankan.",
    paragraphs: selada
      ? [
          `Selada (Lactuca sativa) — ${selada.growDays.min}–${selada.growDays.max} hari dari semai, media ${selada.media.join(" & ")}, matahari ${selada.sunlight}.`,
          ...selada.phases.map((p) => `${p.name} (hari ${p.startDay}–${p.endDay}): ${p.description}`),
          `Tips: ${selada.tips.join("; ")}. Masalah umum: ${selada.problems.join("; ")}.`,
        ]
      : [],
    source: "docs/content/plant-catalog.md §1 · docs/content/plants.json (selada)",
  },
  {
    slug: "faq",
    title: "FAQ: HP, Streak, dan Foto Bukti Tumbuh",
    excerpt: "Jawaban dari gameplay & katalog — bukan karangan.",
    paragraphs: FAQ_ITEMS.map((f) => `${f.question} — ${f.answer}`),
    source: "docs/product/gameplay-design.md · docs/content/plant-catalog.md",
  },
];

export function getLearnArticle(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find((a) => a.slug === slug);
}
