import { DIFFICULTY_REWARDS, GAME_CONSTANTS, type DifficultyKey } from "@/data/plants";

/**
 * Gamifikasi murni — gameplay-design.md §2-§6 & §12.
 * Tanpa side-effect; diuji di lib/gamification.test.ts.
 */

export type Tier = "Pemula" | "Berkelanjutan" | "Professional";

export function getTier(level: number): Tier {
  if (level >= 25) return "Professional";
  if (level >= 10) return "Berkelanjutan";
  return "Pemula";
}

/** EXP_NEED(L) = 50 × L — gameplay §4/§12 */
export function expNeed(level: number): number {
  return GAME_CONSTANTS.EXP_NEED_PER_LEVEL * level;
}

export interface LevelState {
  level: number;
  xp: number;
}

export interface AddExpResult extends LevelState {
  leveledUp: boolean;
}

/** Tambah EXP dengan overflow ke level berikutnya. */
export function addExp(state: LevelState, gain: number): AddExpResult {
  let { level, xp } = state;
  xp += Math.max(0, gain);
  let leveledUp = false;
  while (xp >= expNeed(level)) {
    xp -= expNeed(level);
    level += 1;
    leveledUp = true;
  }
  return { level, xp, leveledUp };
}

export function clampHp(hp: number): number {
  return Math.max(0, Math.min(GAME_CONSTANTS.HP_MAX, hp));
}

export function applyDamage(hp: number, penalty: number): number {
  return clampHp(hp - Math.max(0, penalty));
}

export function applyHeal(hp: number, amount: number): number {
  return clampHp(hp + Math.max(0, amount));
}

export function rewardForDifficulty(difficulty: DifficultyKey) {
  return DIFFICULTY_REWARDS[difficulty];
}

/** HP rendah ≤30 — ui-copy §11 */
export function isHpLow(hp: number): boolean {
  return hp <= 30;
}

/** Layu — HP 0 → revive ke 50 tanpa penalti level/gold (gameplay §5, MVP lembut). */
export function reviveHp(): number {
  return 50;
}

export function isLayu(hp: number): boolean {
  return hp <= 0;
}

/**
 * Streak check.
 * - +1 jika semua task hari itu selesai (allDoneToday)
 * - Bolong 1 hari → reset ke 0, kecuali pakai freeze (jika freeze tersedia, konsumsi 1)
 */
export interface StreakCheckInput {
  streak: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
  today: string;
  allDoneToday: boolean;
  streakFreeze: number;
}

export interface StreakCheckResult {
  streak: number;
  lastCompletedDate: string | null;
  streakFreeze: number;
  streakGained: boolean;
  freezeUsed: boolean;
}

function diffDays(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const ms = new Date(by, bm - 1, bd).getTime() - new Date(ay, am - 1, ad).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function checkStreak(input: StreakCheckInput): StreakCheckResult {
  const { streak, lastCompletedDate, today, allDoneToday, streakFreeze } = input;
  if (allDoneToday) {
    // Sudah selesai hari ini → jangan double count
    if (lastCompletedDate === today) {
      return { streak, lastCompletedDate, streakFreeze, streakGained: false, freezeUsed: false };
    }
    // Lanjutan dari kemarin atau streak awal 0
    if (lastCompletedDate === null) {
      return { streak: 1, lastCompletedDate: today, streakFreeze, streakGained: true, freezeUsed: false };
    }
    const gap = diffDays(lastCompletedDate, today);
    if (gap === 1) {
      return { streak: streak + 1, lastCompletedDate: today, streakFreeze, streakGained: true, freezeUsed: false };
    }
    if (gap > 1) {
      // Bolong >1 hari → freeze tidak cukup untuk gap besar; reset ke 1 hari baru
      // Jika ada freeze untuk 1 hari bolong, sehari gap=2 bisa pakai freeze
      if (gap === 2 && streakFreeze > 0) {
        return { streak: streak + 1, lastCompletedDate: today, streakFreeze: streakFreeze - 1, streakGained: true, freezeUsed: true };
      }
      return { streak: 1, lastCompletedDate: today, streakFreeze, streakGained: true, freezeUsed: false };
    }
    // gap === 0 (sudah selesai) handled above; gap <0 tidak mungkin
    return { streak, lastCompletedDate, streakFreeze, streakGained: false, freezeUsed: false };
  }
  // Tidak semua selesai: jika hari ini lewat dan belum selesai, bolong
  // Penanganan reset dilakukan di rollover; di sini kembalikan tanpa perubahan
  // kecuali jika tidak ada progres hari ini dan ada gap hari
  if (lastCompletedDate !== null) {
    const gap = diffDays(lastCompletedDate, today);
    if (gap >= 2) {
      if (gap === 2 && streakFreeze > 0 && !allDoneToday) {
        // Hari kemarin bolong tapi hari ini belum selesai — tetap pakai freeze utk menyelamatkan?
        // MVP: freeze menyelamatkan 1 hari bolong, jadi jangan reset dulu
        return { streak, lastCompletedDate, streakFreeze, streakGained: false, freezeUsed: false };
      }
      // Bolong ≥2 hari tanpa freeze → reset
      if (gap > 2 || (gap === 2 && streakFreeze <= 0)) {
        return { streak: 0, lastCompletedDate, streakFreeze, streakGained: false, freezeUsed: false };
      }
    }
  }
  return { streak, lastCompletedDate, streakFreeze, streakGained: false, freezeUsed: false };
}

/** Apakah streak mencapai milestone 3/7/14/30 — gameplay §6 */
export function isStreakMilestone(streak: number): boolean {
  return ( [3, 7, 14, 30] as number[] ).includes(streak);
}
