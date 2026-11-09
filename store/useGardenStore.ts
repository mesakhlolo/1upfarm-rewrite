"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPlantBySlug, DIFFICULTY_REWARDS, GAME_CONSTANTS, type MediaKey } from "@/data/plants";
import { evaluateBadges } from "@/lib/badge-evaluator";
import {
  addExp,
  applyDamage,
  applyHeal,
  checkStreak,
  expNeed,
} from "@/lib/gamification";
import { currentDayFor, generateTasks, type EngineTask } from "@/lib/plant-engine";
import { hashPassword } from "@/lib/auth-hash";
import { todayString, diffDaysStr } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Akun demo (untuk test cepat)                                        */
/* ------------------------------------------------------------------ */

export const DEMO_USERNAME = "demo";
export const DEMO_PASSWORD = "demo123";

/* ------------------------------------------------------------------ */
/* Tipos — PRD §9 model data                                           */
/* ------------------------------------------------------------------ */

export type GardenPlantStatus = "growing" | "harvested";

export interface StoredPhoto {
  day: number;
  stage: string;
  imageDataUrl?: string;
  createdAt?: string;
  filled: boolean;
}

export interface GardenPlant {
  id: string;
  plantSlug: string;
  plantName: string;
  emoji: string;
  difficulty: "easy" | "medium" | "hard";
  media: MediaKey;
  startedAt: string; // YYYY-MM-DD
  estimatedHarvest: string; // YYYY-MM-DD
  growDaysMax: number;
  status: GardenPlantStatus;
  photos: StoredPhoto[];
  createdAt: string; // ISO
}

export interface StoredTask extends EngineTask {
  /** tanggal selesai (YYYY-MM-DD) untuk produktivitas */
  completedAt?: string;
}

export interface StoredUser {
  id: string;
  username: string;
  passwordHash: string;
  displayName: string;
  level: number;
  xp: number;
  hp: number;
  gold: number;
  streak: number;
  streakFreeze: number;
  badges: string[];
  joinedAt: string; // ISO
  lastActiveDate: string; // YYYY-MM-DD
  lastCompletedDate: string | null;
  lastRolloverDate: string | null;
  totalTasksDone: number;
  photoCount: number;
  harvestedCount: number;
  notificationEnabled: boolean;
  tasksDoneByDate: Record<string, number>;
}

interface GardenState {
  users: StoredUser[];
  currentUserId: string | null;
  gardenPlants: Record<string, GardenPlant[]>; // userId -> plants
  tasks: Record<string, StoredTask[]>; // userId -> tasks

  /* selectors */
  currentUser: StoredUser | null;
  myPlants: GardenPlant[];
  myTasks: StoredTask[];
  isAuthenticated: boolean;

  /* actions */
  register: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginWithDemo: () => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  addGardenPlant: (
    slug: string,
    media: MediaKey,
    startedAt: string,
  ) => { ok: boolean; gardenPlantId?: string; error?: string; startingExp?: number };
  completeTask: (taskId: string) => {
    ok: boolean;
    exp?: number;
    gold?: number;
    leveledUp?: boolean;
    newBadges?: string[];
    streakGained?: boolean;
  };
  toggleTaskBack: (taskId: string) => void;
  applyDailyRollover: (todayDateStr?: string) => void;
  addPhoto: (
    gardenPlantId: string,
    day: number,
    stage: string,
    imageDataUrl: string,
  ) => { ok: boolean; error?: string };
  harvestPlant: (gardenPlantId: string) => { ok: boolean };
  setNotificationEnabled: (enabled: boolean) => void;
  exportData: () => string;
  importData: (json: string) => { ok: boolean; error?: string };
  hydrateDefaults: () => void;
}

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeUsername(u: string): string {
  return u.trim().toLowerCase();
}

function defaultUser(
  id: string,
  username: string,
  passwordHash: string,
  displayName: string,
): StoredUser {
  const now = new Date();
  const today = todayString(now);
  return {
    id,
    username,
    passwordHash,
    displayName,
    level: 1,
    xp: 0,
    hp: GAME_CONSTANTS.HP_MAX,
    gold: 0,
    streak: 0,
    streakFreeze: 0,
    badges: [],
    joinedAt: now.toISOString(),
    lastActiveDate: today,
    lastCompletedDate: null,
    lastRolloverDate: null,
    totalTasksDone: 0,
    photoCount: 0,
    harvestedCount: 0,
    notificationEnabled: false,
    tasksDoneByDate: {},
  };
}

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

export const useGardenStore = create<GardenState>()(
  persist(
    (set, get) => {
      const syncDerived = (partial: Partial<GardenState>) => {
        const state = get();
        const users = partial.users ?? state.users;
        const currentUserId = partial.currentUserId !== undefined ? partial.currentUserId : state.currentUserId;
        const currentUser = users.find((u) => u.id === currentUserId) ?? null;
        const myPlants = currentUser ? (partial as { gardenPlants?: Record<string, GardenPlant[]> }).gardenPlants?.[currentUser.id] ?? state.gardenPlants[currentUser.id] ?? [] : [];
        const myTasks = currentUser ? (partial as { tasks?: Record<string, StoredTask[]> }).tasks?.[currentUser.id] ?? state.tasks[currentUser.id] ?? [] : [];
        set({
          ...partial,
          users,
          currentUserId,
          currentUser,
          myPlants,
          myTasks,
          isAuthenticated: !!currentUser,
        } as GardenState);
      };

      return {
        users: [],
        currentUserId: null,
        gardenPlants: {},
        tasks: {},
        currentUser: null,
        myPlants: [],
        myTasks: [],
        isAuthenticated: false,

        hydrateDefaults: () => {
          const state = get();
          const users = state.users;
          const currentUserId = state.currentUserId;
          const currentUser = users.find((u) => u.id === currentUserId) ?? null;
          const myPlants = currentUser ? state.gardenPlants[currentUser.id] ?? [] : [];
          const myTasks = currentUser ? state.tasks[currentUser.id] ?? [] : [];
          set({ users, currentUserId, currentUser, myPlants, myTasks, isAuthenticated: !!currentUser });
        },

        register: async (usernameRaw, password) => {
          const username = normalizeUsername(usernameRaw);
          if (!username) return { ok: false, error: "Username atau password salah." };
          if (password.length < 6) return { ok: false, error: "Password minimal 6 karakter." };
          const state = get();
          const exists = state.users.some((u) => normalizeUsername(u.username) === username);
          if (exists) return { ok: false, error: "Username sudah dipakai." };
          const passwordHash = await hashPassword(password);
          const user = defaultUser(uid(), username, passwordHash, usernameRaw.trim());
          syncDerived({
            users: [...state.users, user],
            currentUserId: user.id,
          } as Partial<GardenState>);
          return { ok: true };
        },

        login: async (usernameRaw, password) => {
          const username = normalizeUsername(usernameRaw);
          const state = get();
          const user = state.users.find((u) => normalizeUsername(u.username) === username);
          if (!user) return { ok: false, error: "Username atau password salah." };
          const hash = await hashPassword(password);
          if (hash !== user.passwordHash) return { ok: false, error: "Username atau password salah." };
          const today = todayString();
          const updated = { ...user, lastActiveDate: today };
          const users = state.users.map((u) => (u.id === user.id ? updated : u));
          syncDerived({ users, currentUserId: user.id } as Partial<GardenState>);
          return { ok: true };
        },

        loginWithDemo: async () => {
          const state = get();
          const existing = state.users.find((u) => normalizeUsername(u.username) === DEMO_USERNAME);
          if (!existing) {
            const passwordHash = await hashPassword(DEMO_PASSWORD);
            const demoUser = defaultUser(uid(), DEMO_USERNAME, passwordHash, "Demo");
            syncDerived({
              users: [...state.users, demoUser],
              currentUserId: demoUser.id,
            } as Partial<GardenState>);
            // Seed 1 tanaman Selada polybag agar demo langsung bisa test task
            get().addGardenPlant("selada", "polybag", todayString());
            return { ok: true };
          }
          const today = todayString();
          const updated = { ...existing, lastActiveDate: today };
          const users = state.users.map((u) => (u.id === existing.id ? updated : u));
          syncDerived({ users, currentUserId: existing.id } as Partial<GardenState>);
          // Kalau demo belum punya tanaman (mis. dibuat sebelum seed), seed sekarang
          const plantsForDemo = (get().gardenPlants[existing.id] ?? []) as GardenPlant[];
          if (plantsForDemo.length === 0) {
            get().addGardenPlant("selada", "polybag", todayString());
          }
          return { ok: true };
        },

        logout: () => {
          syncDerived({ currentUserId: null } as Partial<GardenState>);
        },

        addGardenPlant: (slug, media, startedAt) => {
          const state = get();
          const user = state.currentUser;
          if (!user) return { ok: false, error: "Belum masuk." };
          const plant = getPlantBySlug(slug);
          if (!plant) return { ok: false, error: "Tanaman tidak ditemukan." };
          if (!plant.media.includes(media)) {
            return { ok: false, error: "Media tidak tersedia untuk tanaman ini." };
          }
          const gardenPlantId = uid();
          const generated = generateTasks(plant, gardenPlantId, startedAt);
          // estimasi panen = startedAt + growDays.max -1 hari
          const harvestDayOffset = plant.growDays.max - 1;
          const estimatedHarvest = (() => {
            const [y, m, d] = startedAt.split("-").map(Number);
            const date = new Date(y, m - 1, d);
            date.setDate(date.getDate() + harvestDayOffset);
            const yy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            return `${yy}-${mm}-${dd}`;
          })();

          const newPlant: GardenPlant = {
            id: gardenPlantId,
            plantSlug: plant.slug,
            plantName: plant.name,
            emoji: plant.emoji,
            difficulty: plant.difficulty,
            media,
            startedAt,
            estimatedHarvest,
            growDaysMax: plant.growDays.max,
            status: "growing",
            photos: plant.photoCheckpoints.map((cp) => ({
              day: cp.day,
              stage: cp.stage,
              filled: false,
            })),
            createdAt: new Date().toISOString(),
          };

          const existingPlants = state.gardenPlants[user.id] ?? [];
          const existingTasks = state.tasks[user.id] ?? [];
          const nextPlants = [...existingPlants, newPlant];
          const nextTasks = [...existingTasks, ...generated];

          // +EXP mulai rencana — ui-copy §8 "+{exp} EXP" pakai reward difficulty
          const reward = DIFFICULTY_REWARDS[plant.difficulty];
          const afterExp = addExp({ level: user.level, xp: user.xp }, reward.exp);

          let updatedUser: StoredUser = {
            ...user,
            level: afterExp.level,
            xp: afterExp.xp,
            lastActiveDate: todayString(),
          };

          // badge evaluator — Tunastumbuh + level tier bila naik
          const evalRes = evaluateBadges({
            gardenPlantCount: existingPlants.length + 1,
            photoCount: updatedUser.photoCount,
            streak: updatedUser.streak,
            totalTasksDone: updatedUser.totalTasksDone,
            harvestedCount: updatedUser.harvestedCount,
            level: afterExp.level,
            existingBadgeIds: updatedUser.badges,
          });
          if (evalRes.newlyEarned.length > 0) {
            updatedUser = { ...updatedUser, badges: [...updatedUser.badges, ...evalRes.newlyEarned.map((b) => b.id)] };
          }

          const users = state.users.map((u) => (u.id === user.id ? updatedUser : u));
          set({
            users,
            currentUser: updatedUser,
            gardenPlants: { ...state.gardenPlants, [user.id]: nextPlants },
            tasks: { ...state.tasks, [user.id]: nextTasks },
            myPlants: nextPlants,
            myTasks: nextTasks,
          });

          return { ok: true, gardenPlantId, startingExp: reward.exp };
        },

        completeTask: (taskId) => {
          const state = get();
          const user = state.currentUser;
          if (!user) return { ok: false };
          const userTasks = state.tasks[user.id] ?? [];
          const task = userTasks.find((t) => t.id === taskId);
          if (!task || task.status === "done") return { ok: false };

          const today = todayString();
          const updatedTasks = userTasks.map((t) =>
            t.id === taskId ? { ...t, status: "done" as const, completedAt: today } : t,
          );

          let updatedUser: StoredUser = {
            ...user,
            totalTasksDone: user.totalTasksDone + 1,
            tasksDoneByDate: {
              ...user.tasksDoneByDate,
              [today]: (user.tasksDoneByDate[today] ?? 0) + 1,
            },
            lastActiveDate: today,
          };

          // +EXP / +gold task
          const afterExp = addExp({ level: updatedUser.level, xp: updatedUser.xp }, task.exp);
          updatedUser = { ...updatedUser, level: afterExp.level, xp: afterExp.xp, gold: updatedUser.gold + task.gold };

          // cek apakah semua task hari ini selesai → bonus + streak + HP
          const todayTasks = updatedTasks.filter((t) => t.dateStr === today);
          // Jika task yang baru selesai bukan hari ini, cek hari task itu
          const referenceDate = task.dateStr === today ? today : task.dateStr;
          const refTasks = updatedTasks.filter((t) => t.dateStr === referenceDate);
          const allDoneRef = refTasks.length > 0 && refTasks.every((t) => t.status === "done");

          let streakGained = false;
          if (allDoneRef && referenceDate === today) {
            const streakRes = checkStreak({
              streak: updatedUser.streak,
              lastCompletedDate: updatedUser.lastCompletedDate,
              today,
              allDoneToday: true,
              streakFreeze: updatedUser.streakFreeze,
            });
            if (streakRes.streakGained) streakGained = true;
            updatedUser = {
              ...updatedUser,
              streak: streakRes.streak,
              lastCompletedDate: streakRes.lastCompletedDate,
              streakFreeze: streakRes.streakFreeze,
              // bonus semua selesai — gameplay §12 ALL_TASKS_DONE
              xp: updatedUser.xp + 0, // EXP bonus sudah termasuk? tambah bonus exp di sini
              gold: updatedUser.gold + GAME_CONSTANTS.ALL_TASKS_DONE.gold,
              hp: applyHeal(updatedUser.hp, GAME_CONSTANTS.ALL_TASKS_DONE.hp),
            };
            // Bonus EXP dari ALL_TASKS_DONE (10)
            const bonusExp = addExp({ level: updatedUser.level, xp: updatedUser.xp }, GAME_CONSTANTS.ALL_TASKS_DONE.exp);
            updatedUser = { ...updatedUser, level: bonusExp.level, xp: bonusExp.xp };
            // Hindari double-count streak bila hari yang sama dicentang berulang: checkStreak mengembalikan gained false bila sudah.
          } else if (todayTasks.length > 0) {
            // Tetap update lastCompletedDate bila belum streak hari ini tapi ada progres?
          }

          // badge evaluator
          const plants = state.gardenPlants[user.id] ?? [];
          const harvested = plants.filter((p) => p.status === "harvested").length;
          const evalRes = evaluateBadges({
            gardenPlantCount: plants.length,
            photoCount: updatedUser.photoCount,
            streak: updatedUser.streak,
            totalTasksDone: updatedUser.totalTasksDone,
            harvestedCount: harvested,
            level: updatedUser.level,
            existingBadgeIds: updatedUser.badges,
          });
          let newBadgeIds: string[] = [];
          if (evalRes.newlyEarned.length > 0) {
            newBadgeIds = evalRes.newlyEarned.map((b) => b.id);
            updatedUser = { ...updatedUser, badges: [...updatedUser.badges, ...newBadgeIds] };
          }

          const users = state.users.map((u) => (u.id === user.id ? updatedUser : u));
          set({
            users,
            currentUser: updatedUser,
            tasks: { ...state.tasks, [user.id]: updatedTasks },
            myTasks: updatedTasks,
          });

          return {
            ok: true,
            exp: task.exp + (allDoneRef && referenceDate === today ? GAME_CONSTANTS.ALL_TASKS_DONE.exp : 0),
            gold: task.gold + (allDoneRef && referenceDate === today ? GAME_CONSTANTS.ALL_TASKS_DONE.gold : 0),
            leveledUp: afterExp.leveledUp,
            newBadges: newBadgeIds,
            streakGained,
          };
        },

        toggleTaskBack: (taskId) => {
          const state = get();
          const user = state.currentUser;
          if (!user) return;
          const userTasks = state.tasks[user.id] ?? [];
          const task = userTasks.find((t) => t.id === taskId);
          if (!task || task.status !== "done") return;
          // Batalkan selesai: kembalikan EXP/gold/HP stamina? MVP: tidak refund (agar anti farming), hanya status kembali todo
          const updatedTasks = userTasks.map((t) => (t.id === taskId ? { ...t, status: "todo" as const, completedAt: undefined } : t));
          const today = todayString();
          const updatedUser: StoredUser = {
            ...user,
            totalTasksDone: Math.max(0, user.totalTasksDone - 1),
            tasksDoneByDate: { ...user.tasksDoneByDate, [today]: Math.max(0, (user.tasksDoneByDate[today] ?? 1) - 1) },
          };
          const users = state.users.map((u) => (u.id === user.id ? updatedUser : u));
          set({ users, currentUser: updatedUser, tasks: { ...state.tasks, [user.id]: updatedTasks }, myTasks: updatedTasks });
        },

        applyDailyRollover: (todayDateStr) => {
          const state = get();
          const user = state.currentUser;
          if (!user) return;
          const today = todayDateStr ?? todayString();
          if (user.lastRolloverDate === today) return; // idempotent
          const userTasks = state.tasks[user.id] ?? [];

          // Task lewat hari ini (dateStr < today && todo) → missed
          let totalPenalty = 0;
          const missedDates = new Set<string>();
          const rolledTasks = userTasks.map((t) => {
            if (t.status === "todo" && t.dateStr < today) {
              totalPenalty += t.hpPenalty;
              missedDates.add(t.dateStr);
              return { ...t, status: "missed" as const };
            }
            return t;
          });

          let hp = applyDamage(user.hp, totalPenalty);
          // Layu lembut — gameplay §5: HP 0 → revive 50 tanpa penalti level/gold
          let layuRevived = false;
          if (hp <= 0) {
            hp = 50;
            layuRevived = true;
          }

          // Streak reset bila bolong
          let streak = user.streak;
          let streakFreeze = user.streakFreeze;
          const lastCompletedDate = user.lastCompletedDate;
          if (lastCompletedDate && missedDates.size > 0) {
            // Cek apakah ada hari bolong di antara lastCompletedDate dan today
            const gap = diffDaysStr(lastCompletedDate, today);
            if (gap >= 2) {
              // Ada hari yang tidak selesai penuh → reset kecuali freeze menyelamatkan 1 hari
              if (gap === 2 && streakFreeze > 0) {
                streakFreeze -= 1;
                // streak tetap
              } else {
                streak = 0;
              }
            }
          } else if (!user.lastCompletedDate && missedDates.size > 0) {
            streak = 0;
          }

          const updatedUser: StoredUser = {
            ...user,
            hp,
            streak,
            streakFreeze,
            lastRolloverDate: today,
            lastActiveDate: today,
          };
          const users = state.users.map((u) => (u.id === user.id ? updatedUser : u));
          set({
            users,
            currentUser: updatedUser,
            tasks: { ...state.tasks, [user.id]: rolledTasks },
            myTasks: rolledTasks,
          });
          // layuRevived tidak disimpan; UI membaca HP==50 setelah penalti? Cukup catat via hp change.
          void layuRevived;
        },

        addPhoto: (gardenPlantId, day, stage, imageDataUrl) => {
          const state = get();
          const user = state.currentUser;
          if (!user) return { ok: false, error: "Belum masuk." };
          const plants = state.gardenPlants[user.id] ?? [];
          const plant = plants.find((p) => p.id === gardenPlantId);
          if (!plant) return { ok: false, error: "Tanaman tidak ditemukan." };

          const alreadyFilled = plant.photos.some((p) => p.day === day && p.filled);
          const updatedPlants = plants.map((p) => {
            if (p.id !== gardenPlantId) return p;
            const idx = p.photos.findIndex((ph) => ph.day === day);
            const newPhotos = [...p.photos];
            if (idx >= 0) {
              newPhotos[idx] = { day, stage, imageDataUrl, createdAt: new Date().toISOString(), filled: true };
            } else {
              newPhotos.push({ day, stage, imageDataUrl, createdAt: new Date().toISOString(), filled: true });
            }
            return { ...p, photos: newPhotos };
          });

          // reward foto (hanya sekali per day) — +5 HP +10 EXP +5 gold (ALL_TASKS_DONE)
          let updatedUser = user;
          if (!alreadyFilled) {
            const afterExp = addExp({ level: updatedUser.level, xp: updatedUser.xp }, GAME_CONSTANTS.ALL_TASKS_DONE.exp);
            updatedUser = {
              ...updatedUser,
              level: afterExp.level,
              xp: afterExp.xp,
              gold: updatedUser.gold + GAME_CONSTANTS.ALL_TASKS_DONE.gold,
              hp: applyHeal(updatedUser.hp, GAME_CONSTANTS.HP_FROM_PHOTO),
              photoCount: updatedUser.photoCount + 1,
              lastActiveDate: todayString(),
            };
            const evalRes = evaluateBadges({
              gardenPlantCount: plants.length,
              photoCount: updatedUser.photoCount,
              streak: updatedUser.streak,
              totalTasksDone: updatedUser.totalTasksDone,
              harvestedCount: plants.filter((p) => p.status === "harvested").length,
              level: updatedUser.level,
              existingBadgeIds: updatedUser.badges,
            });
            if (evalRes.newlyEarned.length > 0) {
              updatedUser = { ...updatedUser, badges: [...updatedUser.badges, ...evalRes.newlyEarned.map((b) => b.id)] };
            }
          }

          // Tandai task foto hari itu selesai (tanpa double EXP)
          const userTasks = state.tasks[user.id] ?? [];
          const markedTasks = userTasks.map((t) => {
            if (t.gardenPlantId === gardenPlantId && t.day === day && t.type === "Foto" && t.status === "todo") {
              return { ...t, status: "done" as const, completedAt: todayString() };
            }
            return t;
          });

          const users = state.users.map((u) => (u.id === user.id ? updatedUser : u));
          set({
            users,
            currentUser: updatedUser,
            gardenPlants: { ...state.gardenPlants, [user.id]: updatedPlants },
            tasks: { ...state.tasks, [user.id]: markedTasks },
            myPlants: updatedPlants,
            myTasks: markedTasks,
          });
          return { ok: true };
        },

        harvestPlant: (gardenPlantId) => {
          const state = get();
          const user = state.currentUser;
          if (!user) return { ok: false };
          const plants = state.gardenPlants[user.id] ?? [];
          const plant = plants.find((p) => p.id === gardenPlantId);
          if (!plant || plant.status === "harvested") return { ok: false };
          const updatedPlants = plants.map((p) => (p.id === gardenPlantId ? { ...p, status: "harvested" as const } : p));
          let updatedUser: StoredUser = { ...user, harvestedCount: user.harvestedCount + 1, lastActiveDate: todayString() };
          const evalRes = evaluateBadges({
            gardenPlantCount: plants.length,
            photoCount: updatedUser.photoCount,
            streak: updatedUser.streak,
            totalTasksDone: updatedUser.totalTasksDone,
            harvestedCount: updatedUser.harvestedCount,
            level: updatedUser.level,
            existingBadgeIds: updatedUser.badges,
          });
          if (evalRes.newlyEarned.length > 0) {
            updatedUser = { ...updatedUser, badges: [...updatedUser.badges, ...evalRes.newlyEarned.map((b) => b.id)] };
          }
          const users = state.users.map((u) => (u.id === user.id ? updatedUser : u));
          set({
            users,
            currentUser: updatedUser,
            gardenPlants: { ...state.gardenPlants, [user.id]: updatedPlants },
            myPlants: updatedPlants,
          });
          return { ok: true };
        },

        setNotificationEnabled: (enabled) => {
          const state = get();
          const user = state.currentUser;
          if (!user) return;
          const updated = { ...user, notificationEnabled: enabled };
          const users = state.users.map((u) => (u.id === user.id ? updated : u));
          set({ users, currentUser: updated });
        },

        exportData: () => {
          const state = get();
          const user = state.currentUser;
          return JSON.stringify(
            {
              version: 1,
              exportedAt: new Date().toISOString(),
              users: state.users,
              gardenPlants: state.gardenPlants,
              tasks: state.tasks,
              currentUserId: state.currentUserId,
              note: `Foto tidak disertakan secara default bila file besar — ini ekspor penuh lokal.`,
              userId: user?.id ?? null,
            },
            null,
            2,
          );
        },

        importData: (json) => {
          try {
            const parsed = JSON.parse(json) as {
              version?: number;
              users?: StoredUser[];
              gardenPlants?: Record<string, GardenPlant[]>;
              tasks?: Record<string, StoredTask[]>;
              currentUserId?: string | null;
            };
            if (!Array.isArray(parsed.users)) return { ok: false, error: "Format data tidak valid." };
            const users = parsed.users;
            if (users.length === 0) return { ok: false, error: "Tidak ada user di file." };
            const gardenPlants = parsed.gardenPlants ?? {};
            const tasks = parsed.tasks ?? {};
            const currentUserId = parsed.currentUserId ?? users[0].id;
            const currentUser = users.find((u) => u.id === currentUserId) ?? users[0];
            set({
              users,
              currentUserId: currentUser.id,
              currentUser,
              gardenPlants,
              tasks,
              myPlants: gardenPlants[currentUser.id] ?? [],
              myTasks: tasks[currentUser.id] ?? [],
              isAuthenticated: true,
            });
            return { ok: true };
          } catch {
            return { ok: false, error: "File tidak bisa dibaca." };
          }
        },
      };
    },
    {
      name: "1upfarm-garden",
      partialize: (state) => ({
        users: state.users,
        currentUserId: state.currentUserId,
        gardenPlants: state.gardenPlants,
        tasks: state.tasks,
      }),
    },
  ),
);

/** Helper: butuh EXP berikutnya untuk level user */
export function useExpNeed() {
  const user = useGardenStore((s) => s.currentUser);
  return user ? expNeed(user.level) : 50;
}

/** Hitung hari saat ini per tanaman untuk GrowthRing */
export function useCurrentDay(plant: GardenPlant): number {
  return currentDayFor(plant.startedAt, todayString());
}

/** Produktivitas 7/30 hari dari tasksDoneByDate */
export function useProductivity(days: number) {
  const user = useGardenStore((s) => s.currentUser);
  if (!user) return [];
  const todayStr = todayString();
  const result: Array<{ date: string; count: number }> = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = (() => {
      const [y, m, dd] = todayStr.split("-").map(Number);
      const date = new Date(y, m - 1, dd);
      date.setDate(date.getDate() - i);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    })();
    const [y, m, dd] = d.split("-").map(Number);
    const label = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(y, m - 1, dd));
    result.push({ date: label, count: user.tasksDoneByDate[d] ?? 0 });
  }
  return result;
}

export { currentDayFor };
