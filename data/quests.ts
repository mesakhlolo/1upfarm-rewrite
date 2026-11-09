/**
 * Quest & milestone — Fase 2.
 * Kategori daily/weekly/plant: build-plan Fase 9.
 * Milestone streak 3/7/14/30: gameplay §6. Reward bonus semua task selesai & foto: gameplay §12.
 * Tanpa leaderboard/league (gameplay §10).
 */
import { GAME_CONSTANTS } from "@/data/plants";

export type QuestCategory = "daily" | "weekly" | "plant";

export interface Quest {
  id: string;
  category: QuestCategory;
  title: string;
  /** Deskripsi dari docs (tanpa karangan). */
  description: string;
  /** Bonus reward — gameplay §12 (ALL_TASKS_DONE) atau §9 (kriteria badge). */
  rewardExp: number;
  rewardGold: number;
  rewardHp: number;
  /** Id badge terkait (data/badges.ts). */
  badgeId?: string;
}

export const STREAK_MILESTONES = [3, 7, 14, 30] as const;

export const QUESTS: Quest[] = [
  {
    id: "daily-semua-task",
    category: "daily",
    title: "Selesaikan semua task hari ini",
    description: "Semua task hari itu selesai → streak +1 dan HP pulih.",
    rewardExp: GAME_CONSTANTS.ALL_TASKS_DONE.exp,
    rewardGold: GAME_CONSTANTS.ALL_TASKS_DONE.gold,
    rewardHp: GAME_CONSTANTS.ALL_TASKS_DONE.hp,
  },
  {
    id: "weekly-streak-7",
    category: "weekly",
    title: "Streak 7 hari berturut-turut",
    description: "Capai streak 7 → badge Streak 7.",
    rewardExp: GAME_CONSTANTS.ALL_TASKS_DONE.exp,
    rewardGold: GAME_CONSTANTS.ALL_TASKS_DONE.gold,
    rewardHp: GAME_CONSTANTS.HP_REGEN_DAILY,
    badgeId: "streak-7",
  },
  {
    id: "plant-foto-pertama",
    category: "plant",
    title: "Isi photo checkpoint pertama",
    description: "Unggah foto bukti tumbuh pertama → +HP karena tanaman dirawat.",
    rewardExp: GAME_CONSTANTS.ALL_TASKS_DONE.exp,
    rewardGold: GAME_CONSTANTS.ALL_TASKS_DONE.gold,
    rewardHp: GAME_CONSTANTS.HP_FROM_PHOTO,
    badgeId: "foto-pertama",
  },
  {
    id: "plant-panen-pertama",
    category: "plant",
    title: "Selesaikan 1 siklus sampai panen",
    description: "Berhasil menanam sampai panen → badge Panen Pertama.",
    rewardExp: GAME_CONSTANTS.ALL_TASKS_DONE.exp,
    rewardGold: GAME_CONSTANTS.ALL_TASKS_DONE.gold,
    rewardHp: GAME_CONSTANTS.HP_REGEN_DAILY,
    badgeId: "panen-pertama",
  },
  {
    id: "daily-50-misi",
    category: "daily",
    title: "Selesaikan 50 misi",
    description: "Total 50 task selesai → badge Green Thumb.",
    rewardExp: GAME_CONSTANTS.ALL_TASKS_DONE.exp,
    rewardGold: GAME_CONSTANTS.ALL_TASKS_DONE.gold,
    rewardHp: GAME_CONSTANTS.HP_REGEN_DAILY,
    badgeId: "green-thumb",
  },
];
