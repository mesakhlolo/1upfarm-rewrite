/**
 * Badge — Fase 2.
 * Nama & deskripsi: docs/content/ui-copy.md §19.
 * Kriteria: docs/product/gameplay-design.md §9 (+ tier §2 untuk Pemula/Berkelanjutan/Professional).
 * Tanpa leaderboard (gameplay §10).
 */

export interface Badge {
  id: string;
  name: string;
  /** Deskripsi dari ui-copy §19. */
  description: string;
  /** Kriteria dari gameplay §9. */
  criteria: string;
  /** Tier level — gameplay §2 (Pemula 1–9 · Berkelanjutan 10–24 · Professional 25+). */
  tier?: "Pemula" | "Berkelanjutan" | "Professional";
}

export const BADGES: Badge[] = [
  {
    id: "tunastumbuh",
    name: "Tunastumbuh",
    description: "Menanam tanaman pertamamu",
    criteria: "Menambah tanaman pertama",
  },
  {
    id: "foto-pertama",
    name: "Foto Pertama",
    description: "Mengunggah bukti tumbuh pertama",
    criteria: "Isi photo checkpoint pertama",
  },
  {
    id: "streak-7",
    name: "Streak 7",
    description: "7 hari berturut-turut merawat tanaman",
    criteria: "7 hari berturut",
  },
  {
    id: "green-thumb",
    name: "Green Thumb",
    description: "Menyelesaikan 50 misi",
    criteria: "50 task selesai",
  },
  {
    id: "panen-pertama",
    name: "Panen Pertama",
    description: "Berhasil menanam sampai panen",
    criteria: "Menyelesaikan 1 siklus tanaman",
  },
  {
    id: "pemula",
    name: "Pemula",
    description: "Mencapai Level 5",
    criteria: "Capai Level 5",
    tier: "Pemula",
  },
  {
    id: "berkelanjutan",
    name: "Berkelanjutan",
    description: "Mencapai Level 15",
    criteria: "Capai Level 15",
    tier: "Berkelanjutan",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Mencapai Level 30",
    criteria: "Capai Level 30",
    tier: "Professional",
  },
];

/** Cari badge dari id. */
export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}
