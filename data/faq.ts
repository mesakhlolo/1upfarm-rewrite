/**
 * FAQ — Fase 2 (dipakai /app/learn, Fase 11).
 * Jawaban dari docs/content/plant-catalog.md & gameplay-design.md; TANPA karangan.
 * Setiap item mencatat sumbernya.
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** File sumber untuk jawaban ini. */
  source: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "media-campuran",
    question: "Media tanam apa yang dipakai?",
    answer:
      "Media seragam: tanah : kompos : arang sekam = 2 : 1 : 1. Pastikan pot berlubang drainase.",
    source: "docs/content/plant-catalog.md — Ringkasan",
  },
  {
    id: "basis-panen",
    question: "Angka hari panen di aplikasi dihitung dari apa?",
    answer:
      "Semua growDays dihitung dari semai. Sumber yang menyebut \"HST\" sering menghitung dari pindah tanam, jadi tidak bisa dibandingkan langsung.",
    source: "docs/content/plants.json — notes",
  },
  {
    id: "media-pilihan",
    question: "Bisa hidroponik atau harus polybag?",
    answer:
      "Tergantung tanaman: selada, kangkung, dan pakcoy tersedia hidroponik; bayam, bawang merah, daun bawang, tomat, dan cabai rawit polybag/pot. Lihat tag media di tiap tanaman.",
    source: "docs/content/plant-catalog.md — Ringkasan",
  },
  {
    id: "hp-turun",
    question: "Kenapa HP saya turun?",
    answer:
      "Kalau ada task yang dilewat, HP berkurang −5 (easy), −8 (medium), atau −12 (hard). Kalau semua task hari itu selesai, HP pulih +5 (maks 100).",
    source: "docs/product/gameplay-design.md §3, §5",
  },
  {
    id: "streak-reset",
    question: "Apa yang terjadi kalau bolong sehari?",
    answer:
      "Streak +1 kalau semua task hari itu selesai. Bolong 1 hari → reset, kecuali memakai Streak Freeze (50 gold, maks 2). Milestone streak: 3/7/14/30 hari.",
    source: "docs/product/gameplay-design.md §6, §12",
  },
  {
    id: "foto-manfaat",
    question: "Kenapa harus foto tanaman?",
    answer:
      "Foto adalah bukti tumbuh di milestone (mis. hari 1 tanam, hari 7 tunas). Mengisi foto memberi +EXP/+gold/+HP — mengikat progres di aplikasi ke tanaman nyata.",
    source: "docs/product/gameplay-design.md §7",
  },
];
