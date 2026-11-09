/**
 * Katalog tanaman — Fase 2.
 * Sumber: docs/content/plants.json (8 tanaman) + docs/content/plant-catalog.md.
 * Angka panen = dari semai (bukan dari pindah tanam) — plants.json `notes`.
 * Jangan hardcode dari ingatan; ubah plants.json dulu jika angka berubah.
 */
import plantsData from "../docs/content/plants.json";

/** Kunci difficulty mentah di plants.json. */
export type DifficultyKey = "easy" | "medium" | "hard";

/** Kunci media mentah di plants.json. */
export type MediaKey = "polybag" | "hidroponik";

/** Label difficulty UI — ui-copy §18. */
export const DIFFICULTY_LABEL: Record<DifficultyKey, "Mudah" | "Sedang" | "Menantang"> = {
  easy: "Mudah",
  medium: "Sedang",
  hard: "Menantang",
};

/** Label media UI — ui-copy §18. */
export const MEDIA_LABEL: Record<MediaKey, "Polybag/Pot" | "Hidroponik"> = {
  polybag: "Polybag/Pot",
  hidroponik: "Hidroponik",
};

/** Target tahap tumbuh — plans.json `phases` (disebut "stages" di PRD §9). */
export interface PlantPhase {
  id: string;
  name: string;
  startDay: number;
  endDay: number;
  task: string;
  description: string;
}

/** Tugas berkala — plants.json `recurring` (disebut "careSchedule"). */
export interface CareScheduleItem {
  type: string;
  label: string;
  everyDays: number;
  startDay: number;
  endDay: number;
}

export interface PhotoCheckpoint {
  day: number;
  stage: string;
}

export interface Plant {
  slug: string;
  name: string;
  latin: string;
  emoji: string;
  difficulty: DifficultyKey;
  media: MediaKey[];
  /** Rentang hari panen DARI SEMAI. */
  growDays: { min: number; max: number };
  sunlight: string;
  potSize: string;
  spacing: string;
  ph: string;
  /** Tahap tumbuh (semai → panen). */
  phases: PlantPhase[];
  /** Jadwal perawatan berkala (siram/pupuk/cek hama/pangkas). */
  careSchedule: CareScheduleItem[];
  photoCheckpoints: PhotoCheckpoint[];
  tips: string[];
  problems: string[];
  harvestBasis: string;
  confidence: string;
  varietyNotes: string[];
  sources: string[];
}

interface RawPlant {
  slug: string;
  name: string;
  latin: string;
  emoji: string;
  difficulty: DifficultyKey;
  media: MediaKey[];
  growDays: { min: number; max: number };
  sunlight: string;
  potSize: string;
  spacing: string;
  ph: string;
  phases: PlantPhase[];
  recurring: CareScheduleItem[];
  photoCheckpoints: PhotoCheckpoint[];
  tips: string[];
  problems: string[];
  harvestBasis: string;
  confidence: string;
  varietyNotes: string[];
  sources: string[];
}

const rawPlants = (plantsData as unknown as { plants: RawPlant[] }).plants;

/** 8 tanaman sesuai plants.json: selada, kangkung, bayam, pakcoy, bawang-merah, daun-bawang, tomat, cabai-rawit. */
export const PLANTS: Plant[] = rawPlants.map((p) => ({
  slug: p.slug,
  name: p.name,
  latin: p.latin,
  emoji: p.emoji,
  difficulty: p.difficulty,
  media: p.media,
  growDays: p.growDays,
  sunlight: p.sunlight,
  potSize: p.potSize,
  spacing: p.spacing,
  ph: p.ph,
  phases: p.phases,
  careSchedule: p.recurring,
  photoCheckpoints: p.photoCheckpoints,
  tips: p.tips,
  problems: p.problems,
  harvestBasis: p.harvestBasis,
  confidence: p.confidence,
  varietyNotes: p.varietyNotes,
  sources: p.sources,
}));

/** Reward per difficulty — plants.json `difficultyRewards` (gameplay §3). */
export interface DifficultyReward {
  exp: number;
  gold: number;
  hpPenalty: number;
}

export const DIFFICULTY_REWARDS = (plantsData as unknown as { difficultyRewards: Record<DifficultyKey, DifficultyReward> })
  .difficultyRewards;

/** Konstanta tuning — gameplay §12. */
export const GAME_CONSTANTS = {
  HP_MAX: 100,
  HP_REGEN_DAILY: 5,
  HP_FROM_PHOTO: 5,
  EXP_NEED_PER_LEVEL: 50,
  STREAK_FREEZE_COST: 50,
  STREAK_FREEZE_MAX: 2,
  ALL_TASKS_DONE: { exp: 10, gold: 5, hp: 5 },
} as const;

/** Cari tanaman dari slug (`/app/plants/[slug]`). */
export function getPlantBySlug(slug: string): Plant | undefined {
  return PLANTS.find((p) => p.slug === slug);
}

/** Estimasi panen siap tampil ("±{max} hari"). */
export function getHarvestDisplay(plant: Plant): number {
  return plant.growDays.max;
}
