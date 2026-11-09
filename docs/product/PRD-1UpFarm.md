# PRD — 1UpFarm (MVP Web App) · v2

Platform: Web app (browser desktop + mobile, mobile-first, PWA-ready)
Status: **fokus MVP**. Strategi: `product-strategy.md`. Gameplay: `gameplay-design.md`. Roadmap: `build-plan.md`. Sumber riset: [`../research/raw-context-figma-canva.md`](../research/raw-context-figma-canva.md).

> **Produk ini untuk apa (v2):** 1UpFarm = **"Duolingo untuk menanam makanan sendiri di lahan sempit."**
> Pendamping yang mengubah perawatan tanaman **nyata** jadi **misi harian terpandu + seru**, sampai pemula mencapai **panen pertama**.

## 1. Tujuan produk (bukan gamifikasi)
Membantu pemula kota yang bingung & gampang lupa untuk **benar-benar berhasil menanam 1 tanaman sampai panen**, di lahan sempit.
- Gamifikasi = **alat retensi**, bukan tujuan.
- Konten = **resep perawatan harian** (preskriptif, bukan user mengarang task).
- Hasil nyata = **tanaman hidup → panen**.

## 2. North Star & metrik
- **North Star**: % user baru yang mencapai **panen pertama** (proxy: menyelesaikan plan sampai hari panen).
- Leading: D1/D7 retention, % photo-checkpoint terisi, streak ≥ 3 hari, % tambah tanaman kedua.
- Drop-off: hari ke berapa user berhenti (target fix hari 3–7).

## 3. Persona (MVP: satu saja)
- **Primer — Ariska / Zakky**: 18–30, tinggal di kota, lahan balkon/pot, pemula, gampang lupa, tapi pengen hasil nyata.
- Persona lain (pelajar, 25–55) menyusul; **bukan target MVP**.

## 4. Masalah (dari riset)
- Bingung mulai (91% belum paham; 86% merasa belum cukup tahu).
- Gampang lupa & kurang konsisten (64% kurang waktu; 68% minta pengingat).
- Nggak yakin bakal berhasil / cepat bosan.
- Faktor pemicu minat: gaya hidup sehat, keberlanjutan, solusi lahan sempit.

## 5. Solusi inti (loop)
1. Pilih **1 tanaman cepat panen** (selada/kangkung ~30 hari).
2. Dapat **guided plan hari 1..30** (resep harian).
3. Tiap hari: **1–2 task kecil** + reminder.
4. Di **milestone**: **foto bukti tumbuh** (photo checkpoint).
5. **Panen pertama** → selebrasi + badge + ajakan tanaman berikutnya.

## 6. Lingkup MVP
**In-scope:**
- Onboarding + auth (mock lokal).
- Katalog **tanaman cepat panen** (selada, kangkung) + detail (jadwal, tahap, tips).
- Wizard tambah tanaman → generate guided plan.
- Dashboard ringan: streak, HP, level, EXP, gold (sederhana), tanaman aktif.
- Daily task (Task/Done) + reminder.
- **Photo checkpoint** di milestone (kamera/upload).
- Panen pertama: selebrasi + badge.
- Halaman edukasi singkat (konten riset).
- Profil + riwayat.

**Ditunda (bukan MVP):** shop, ekonomi gold penuh, quest rumit, kustomisasi avatar, leaderboard/league, multi-tanaman kompleks, backend nyata (MySQL/JWT/Bcrypt), fitur mobile native.

## 7. Peta layar
- `/` Landing (pengenalan + problem/solusi + statistik riset).
- `/onboarding` (intro + komitmen 1 tanaman).
- `/login`, `/register`.
- `/app/home` Dashboard (streak, HP, tanaman aktif, task hari ini).
- `/app/plants` + `/app/plants/[slug]` Katalog & detail.
- `/app/garden/add` Wizard tambah tanaman.
- `/app/plan/[id]` Plan/tanaman (resep hari 1..N, foto milestestone, progress).
- `/app/tasks` To-do harian.
- `/app/profile` Profil, badge, riwayat panen.
- `/app/settings` Pengaturan, logout, ekspor/impor data.
- `/app/learn` Edukasi.

## 8. User flow kunci
- **Activation**: onboarding → pilih tanaman cepat panen → konfirmasi tanggal → Start Plan → task hari 1 muncul.
- **Daily**: buka app → To-do → centang task → +EXP/+gold/streak.
- **Milestone**: hari ke-X muncul "Foto progress" → upload → +badge/reward → progress tanaman nyata naik.
- **Panen**: hari terakhir → layar selebrasi → badge "Panen Pertama" → pilih tanaman berikutnya.
- **Gagal/kurang konsisten**: reminder → kalau lewat task, HP turun ringan → nada suportif, bukan menghakimi.

## 9. Model data (localStorage, MVP)
```
User { id, username, displayName, avatar, level, xp, hp, gold, streak, streakFreeze, badges[], joinedAt, lastActiveDate }
PlantCatalog { id, slug, name, emoji, difficulty, media[], growDays, stages[], plan: PlanDay[], tips[] }
PlanDay { day, title, description, tasks: TaskTemplate[] }
GardenPlant { id, plantId, startedAt, expectedHarvest, media, currentDay, status: growing|harvested|failed, photos: PhotoCheckpoint[], tasks[] }
Task { id, gardenPlantId, day, type, title, status: todo|done|missed, exp, gold, hpPenalty }
PhotoCheckpoint { id, gardenPlantId, day, stage, imageDataUrl, createdAt }
Badge { id, name, desc, icon, criteria, tier }
```
Semua di Zustand + persist. Auth mock = daftar user lokal.

## 10. Non-functional
- Responsif mobile-first (360px–1440px), target Lighthouse ≥ 90.
- A11y: kontras, fokus keyboard, aria, alt text.
- Bahasa Indonesia. Empty/loading/error state wajib.
- PWA installable; reminder best-effort via Notification API.

## 11. Teknologi
- Next.js (App Router) + TS strict + Tailwind + shadcn/ui + lucide-react.
- Zustand (+persist), Framer Motion, (Recharts opsional).
- Tanpa backend di MVP; upgrade path: MySQL 8 + JWT + Bcrypt (riset §10).
- Testing: Vitest (logic) + Playwright (smoke).

## 12. Risiko
- Data hilang (clear browser) → ekspor/impor JSON.
- Jadwal perawatan harus realistis → ambil dari konten riset + sumber.
- Anti-slop: semua copy/angka dari `docs/`, bukan karangan.

## 13. Referensi desain
- Duolingo: streak, daily goal, path, maskot, selebrasi.
- Habitica: HP/RPG, damage saat lupa, badge.
- Figma 1UpFarm: ungu primary, gradient pastel, maskot + avatar chibi, kartu rounded.