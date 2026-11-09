/**
 * Katalog akun test (seed) — pura-pura jadi user untuk user-testing manual.
 *
 * Semua akun tersimpan di localStorage yang sama seperti akun register
 * (`1upfarm-garden`). Setiap akun punya state berbeda agar reviewer bisa
 * melihat banyak case tanpa daftar ulang / nunggu hari demi hari.
 *
 * Password semua di bawah (kecuali `demo`) sengaja sama: `test1234`.
 * Login via `/dev-seed` (1 klik) atau isi manual di `/login`.
 *
 * Angka & kriteria badge diambil dari:
 * - docs/content/plants.json (8 tanaman, growDays, difficulty)
 * - docs/product/gameplay-design.md (§2 level, §5 HP, §6 streak, §9 badge)
 * - docs/content/ui-copy.md
 *
 * Cara pakai mesin waktu (selesaikan 1 tanaman tanpa nunggu 30–120 hari):
 * 1. Wizard: `/app/garden/add` → "Pilih tanggal" → isi tanggal
 *    `startedAt = hari ini − (growDays.max − 1)`.
 *    Contoh: Kangkung (max 30) → pilih 29 hari lalu. Selada (45) → 44 hari lalu.
 *    Bayam (30) → 29 hari lalu. Tomat (120) → 119 hari lalu.
 *    Begitu `Mulai Rencana`, buka `/app/plan/{id}` → card "Siap panen!" muncul
 *    karena `currentDay >= growDaysMax` (lihat app/app/plan/[id]/page.tsx).
 * 2. Dev page `/dev-seed`: tombol "Tua-kan tanaman +30 hari" untuk akun
 *    yang sedang login (menggeser `startedAt` + semua `dateStr` task).
 * 3. Console: edit `localStorage 1upfarm-garden` → `gardenPlants[].startedAt`
 *    ke tanggal lampau, lalu refresh. Lihat snippet di `/dev-seed`.
 *
 * Catatan: tanaman kedaluwarsa status "harvested" tetap boleh
 * di-tua-kan (umur bertambah), tapi tidak akan memunculkan tombol panen lagi.
 */

import type { MediaKey } from "@/data/plants";
import { todayString, addDaysStr } from "@/lib/utils";

/** Offset hari: 0 = hari ini, 29 = 29 hari lalu (jadi currentDay = 30). */
export interface SeedPlantSpec {
  slug: string;
  media: MediaKey;
  /** Berapa hari lalu tanaman ini dimulai (0 = hari ini). */
  daysAgo: number;
  status?: "growing" | "harvested";
  /** Jumlah task masa lalu yang ditandai selesai (sisanya missed). */
  pastTasksDone?: number;
  /** Jumlah checkpoint foto pertama yang ditandai terisi. */
  photosFilled?: number;
}

export interface SeedAccount {
  id: string;
  username: string;
  password: string;
  displayName: string;
  title: string;
  /** Cerita/skenario akun ini — untuk user-testing. */
  description: string;
  /** Yang harus terlihat saat masuk ke akun ini (checklist singkat). */
  expect: string[];
  level: number;
  xp: number;
  hp: number;
  gold: number;
  streak: number;
  streakFreeze: number;
  totalTasksDone: number;
  photoCount: number;
  harvestedCount: number;
  badges: string[];
  plants: SeedPlantSpec[];
}

export const TEST_PASSWORD = "test1234";

/** Tambah tanaman Kangkung mulai 29 hari lalu → hari ini = hari ke-30 = siap panen. */
export function daysAgoStr(daysAgo: number, today = todayString()): string {
  return addDaysStr(today, -daysAgo);
}

export const SEED_ACCOUNTS: SeedAccount[] = [
  {
    id: "demo",
    username: "demo",
    password: "demo123",
    displayName: "Demo",
    title: "Demo — hari pertama",
    description:
      "Aman untuk demo ke orang lain. 1 tanaman Selada mulai hari ini, badge Tunastumbuh, EXP 10/50.",
    expect: [
      "Home: sapaan Hai, Demo! • Misi hari ini ada 2 task Selada (bukan empty)",
      "Profile: Level Lv. 1 Pemula • HP 100 • EXP 10/50 • Gold 0 • Streak 0",
      "Quests: badge Tunastumbuh terbuka",
    ],
    level: 1,
    xp: 10,
    hp: 100,
    gold: 0,
    streak: 0,
    streakFreeze: 0,
    totalTasksDone: 0,
    photoCount: 0,
    harvestedCount: 0,
    badges: ["tunastumbuh"],
    plants: [{ slug: "selada", media: "polybag", daysAgo: 0, pastTasksDone: 0, photosFilled: 0 }],
  },
  {
    id: "baru-kosong",
    username: "baru",
    password: TEST_PASSWORD,
    displayName: "Baru",
    title: "Baru — kebun kosong",
    description: "Akun register segar yang belum pernah tanam. Cocok untuk test empty state.",
    expect: [
      "Home: EmptyState Kebunmu masih kosong + CTA Tambah Tanaman",
      "Home: Tanaman aktif → Belum ada tanaman. Mulai dari katalog!",
      "Tasks: sama empty • Profile: Belum ada badge",
      "Stat awal: Lv. 1 • EXP 0/50 • HP 100 • Gold 0 • Streak 0",
    ],
    level: 1,
    xp: 0,
    hp: 100,
    gold: 0,
    streak: 0,
    streakFreeze: 0,
    totalTasksDone: 0,
    photoCount: 0,
    harvestedCount: 0,
    badges: [],
    plants: [],
  },
  {
    id: "siap-panen",
    username: "panen",
    password: TEST_PASSWORD,
    displayName: "Panen",
    title: "Siap panen — Kangkung hari ke-30",
    description:
      "Cara tercepat test panen tanpa nunggu 45 hari: Kangkung (max 30) mulai 29 hari lalu. Langsung test tombol Panen Sekarang → overlay PANEN PERTAMA.",
    expect: [
      "Plan Kangkung: Hari ke-30 dari 30 • StageStepper di fase Panen",
      "Plan: card Siap panen! + tombol Panen Sekarang terlihat",
      "Setelah klik: overlay PANEN PERTAMA! 🎉 + badge Panen Pertama",
      "Home: Tanaman aktif 1 kartu Kangkung, status berubah ke Panen",
    ],
    level: 3,
    xp: 40,
    hp: 92,
    gold: 75,
    streak: 3,
    streakFreeze: 0,
    totalTasksDone: 18,
    photoCount: 2,
    harvestedCount: 0,
    badges: ["tunastumbuh", "foto-pertama"],
    plants: [
      { slug: "kangkung", media: "polybag", daysAgo: 29, pastTasksDone: 18, photosFilled: 2 },
    ],
  },
  {
    id: "sudah-panen",
    username: "selesai",
    password: TEST_PASSWORD,
    displayName: "Selesai",
    title: "Sudah panen — badge Panen Pertama terbuka",
    description: "1 tanaman sudah harvested. Untuk cek tampilan post-panen, quest badge, dan produktivitas.",
    expect: [
      "Plan Bayam: status Panen • Card PANEN PERTAMA! 🎉 bertambah",
      "Profile: Panen: 1 • Badge Panen Pertama terbuka",
      "Quests: 5 quest, badge Panen Pertama gradient",
      "Home: Bayam status Panen (bukan Tumbuh)",
    ],
    level: 4,
    xp: 30,
    hp: 100,
    gold: 120,
    streak: 5,
    streakFreeze: 1,
    totalTasksDone: 32,
    photoCount: 3,
    harvestedCount: 1,
    badges: ["tunastumbuh", "foto-pertama", "panen-pertama"],
    plants: [
      {
        slug: "bayam",
        media: "polybag",
        daysAgo: 29,
        status: "harvested",
        pastTasksDone: 28,
        photosFilled: 3,
      },
    ],
  },
  {
    id: "streak-7",
    username: "streak",
    password: TEST_PASSWORD,
    displayName: "Streak",
    title: "Streak 7 — konsisten seminggu",
    description: "Streak 7 hari, HP sehat, 2 tanaman aktif. Cocok untuk Quest & streak milestone.",
    expect: [
      "Home: StreakFlame 7 hari • HP 88",
      "Quests: kartu Streak kamu: 7 hari • milestone 3 & 7 tercapai",
      "Badge Streak 7 terbuka",
      "2 tanaman aktif: Selada (hari ke-10) + Kangkung (hari ke-5)",
    ],
    level: 3,
    xp: 20,
    hp: 88,
    gold: 60,
    streak: 7,
    streakFreeze: 0,
    totalTasksDone: 24,
    photoCount: 1,
    harvestedCount: 0,
    badges: ["tunastumbuh", "foto-pertama", "streak-7"],
    plants: [
      { slug: "selada", media: "polybag", daysAgo: 9, pastTasksDone: 14, photosFilled: 1 },
      { slug: "kangkung", media: "hidroponik", daysAgo: 4, pastTasksDone: 10, photosFilled: 0 },
    ],
  },
  {
    id: "hp-rendah",
    username: "layu",
    password: TEST_PASSWORD,
    displayName: "Layu",
    title: "HP rendah — tanaman butuh kamu",
    description: "HP 22 (≤30) untuk menguji tampilan layu lembut, sapaan suportif, dan penalti task terlewat.",
    expect: [
      "Home: sapaan Tanamanmu butuh kamu hari ini. • banner layu merah muda",
      "HPBar kırmızı/hampir habis • HP 22/100",
      "Tasks: banyak missed di hari lalu (penalti −5 easy / −8 medium)",
      "Bukan error, layu lembut sesuai gameplay §5",
    ],
    level: 2,
    xp: 10,
    hp: 22,
    gold: 15,
    streak: 0,
    streakFreeze: 0,
    totalTasksDone: 6,
    photoCount: 0,
    harvestedCount: 0,
    badges: ["tunastumbuh"],
    plants: [
      { slug: "bayam", media: "polybag", daysAgo: 14, pastTasksDone: 6, photosFilled: 0 },
    ],
  },
  {
    id: "veteran",
    username: "veteran",
    password: TEST_PASSWORD,
    displayName: "Veteran",
    title: "Veteran — Level 16, multi-tanaman",
    description: "Level 16 (Berkelanjutan), 3 tanaman, gold 520. Untuk cek tier, quest kompleks, dan dashboard padat.",
    expect: [
      "Profile: Level Lv. 16 • Tier Berkelanjutan • Gold 520",
      "Badge: Pemula (Lv. 5) + Berkelanjutan (Lv. 15) terbuka",
      "Home: Tanaman aktif 3 kartu (Tomat, Selada, Cabai)",
      "Tasks: To-do dikelompokkan per tanaman",
    ],
    level: 16,
    xp: 120,
    hp: 95,
    gold: 520,
    streak: 14,
    streakFreeze: 2,
    totalTasksDone: 95,
    photoCount: 6,
    harvestedCount: 1,
    badges: ["tunastumbuh", "foto-pertama", "streak-7", "green-thumb", "panen-pertama", "pemula", "berkelanjutan"],
    plants: [
      { slug: "tomat", media: "polybag", daysAgo: 34, pastTasksDone: 45, photosFilled: 3 },
      { slug: "selada", media: "hidroponik", daysAgo: 9, pastTasksDone: 25, photosFilled: 2 },
      { slug: "cabai-rawit", media: "polybag", daysAgo: 20, pastTasksDone: 25, photosFilled: 1 },
    ],
  },
  {
    id: "menantang",
    username: "sulit",
    password: TEST_PASSWORD,
    displayName: "Sulit",
    title: "Menantang — Tomat & Cabai (hard)",
    description: "Langsung ke tanaman hard (hard = +35 EXP / +18 gold / −12 HP). Untuk cek reward dan penalti besar. Siklus 115–120 hari, jadi tidak bisa panen cepat.",
    expect: [
      "Katalog filter Menantang → Tomat + Cabai Rawit",
      "Task hard: pill +35 EXP, +18 gold, HP penalty −12",
      "Plan Tomat: StageStepper 6 fase, GrowthRing penupan lambat",
      "HP turun cepat bila bolong — test rollover",
    ],
    level: 5,
    xp: 30,
    hp: 70,
    gold: 40,
    streak: 0,
    streakFreeze: 0,
    totalTasksDone: 8,
    photoCount: 0,
    harvestedCount: 0,
    badges: ["tunastumbuh", "pemula"],
    plants: [
      { slug: "tomat", media: "polybag", daysAgo: 6, pastTasksDone: 5, photosFilled: 0 },
      { slug: "cabai-rawit", media: "polybag", daysAgo: 3, pastTasksDone: 3, photosFilled: 0 },
    ],
  },
  {
    id: "santai",
    username: "santai",
    password: TEST_PASSWORD,
    displayName: "Santai",
    title: "Santai — Pakcoy hidroponik, foto 1x",
    description: "Kasual: 1 Pakcoy hidroponik hari ke-12, 1 foto sudah diisi. Cocok untuk test upload foto & toast berikutnya.",
    expect: [
      "Plan Pakcoy: foto Hari 1 & 10 terisi (dashed/thumbnail)",
      "Profile: Foto: 1 • Badge Foto Pertama terbuka",
      "Home: Misi hari ini 1–2 task Pakcoy",
      "Coba upload foto checkpoint hari ini → +5 HP, +10 EXP",
    ],
    level: 2,
    xp: 35,
    hp: 100,
    gold: 25,
    streak: 2,
    streakFreeze: 0,
    totalTasksDone: 10,
    photoCount: 1,
    harvestedCount: 0,
    badges: ["tunastumbuh", "foto-pertama"],
    plants: [
      { slug: "pakcoy", media: "hidroponik", daysAgo: 11, pastTasksDone: 10, photosFilled: 1 },
    ],
  },
];

export function findSeedAccount(id: string): SeedAccount | undefined {
  return SEED_ACCOUNTS.find((s) => s.id === id);
}

export function findSeedByUsername(username: string): SeedAccount | undefined {
  return SEED_ACCOUNTS.find((s) => s.username.toLowerCase() === username.trim().toLowerCase());
}
