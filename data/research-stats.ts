/**
 * Statistik riset — Fase 2 (dipakai landing, Fase 3).
 * Sumber: docs/content/ui-copy.md §2 (copy landing) + docs/product/PRD-1UpFarm.md §4,
 *         diputar balik ke docs/research/raw-context-figma-canva.md §4 (arsip read-only, hanya dibaca).
 * Jumlah responden: 63.
 */

export const RESEARCH_SAMPLE_SIZE = 63;

export interface ResearchStat {
  /** Label dalam Bahasa Indonesia. */
  label: string;
  /** Persentase. */
  percent: number;
  /** Lokasi sumber di docs/. */
  source: string;
}

export const RESEARCH_STATS: ResearchStat[] = [
  {
    label: "Pemula belum paham cara mulai",
    percent: 91,
    source: "docs/content/ui-copy.md §2 · docs/product/PRD-1UpFarm.md §4",
  },
  {
    label: "Merasa belum cukup tahu untuk mulai",
    percent: 86,
    source: "docs/product/PRD-1UpFarm.md §4",
  },
  {
    label: "Kurang waktu merawat",
    percent: 64,
    source: "docs/content/ui-copy.md §2 · docs/product/PRD-1UpFarm.md §4",
  },
  {
    label: "Butuh pengingat otomatis menyiram",
    percent: 68,
    source: "docs/content/ui-copy.md §2 · docs/product/PRD-1UpFarm.md §4",
  },
  {
    label: "Termotivasi oleh hadiah virtual",
    percent: 91,
    source: "docs/content/ui-copy.md §2",
  },
  {
    label: "Tertarik fitur gamifikasi (poin, hadiah, tantangan)",
    percent: 86,
    source: "docs/research/raw-context-figma-canva.md §4",
  },
  {
    label: "Belum paham gamifikasi",
    percent: 81,
    source: "docs/research/raw-context-figma-canva.md §4",
  },
  {
    label: "Tertarik urban farming",
    percent: 57,
    source: "docs/research/raw-context-figma-canva.md §4",
  },
  {
    label: "Ingin metode hidroponik & pot/polybag",
    percent: 62,
    source: "docs/research/raw-context-figma-canva.md §4",
  },
  {
    label: "Butuh teknik & perawatan tanaman",
    percent: 40,
    source: "docs/research/raw-context-figma-canva.md §4",
  },
  {
    label: "Responden usia 19–21 tahun",
    percent: 75,
    source: "docs/research/raw-context-figma-canva.md §4",
  },
  {
    label: "Responden laki-laki",
    percent: 56,
    source: "docs/research/raw-context-figma-canva.md §4",
  },
  {
    label: "Responden mahasiswa",
    percent: 86,
    source: "docs/research/raw-context-figma-canva.md §4",
  },
];

/** Bukti ringkas untuk landing — ui-copy §2. */
export const RESEARCH_EVIDENCE =
  "Dari 63 responden: 91% termotivasi oleh hadiah virtual, 68% minta pengingat otomatis.";
