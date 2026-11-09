# Build Plan — 1UpFarm Web App

Prinsip: **vertical slice** — tiap fase menghasilkan app yang bisa dibuka di browser & dinilai. Commit kecil. Jangan lanjut sebelum fase sebelumnya jalan.

## Fase 0 — Fondasi
- `create-next-app` (App Router, TS strict, Tailwind, ESLint).
- `shadcn init` + komponen dasar (Button, Card, Tabs, Progress, Dialog, Badge).
- `AGENTS.md` (stack, struktur, aturan, sumber konten = `docs/`).
- Tooling: Prettier, Husky pre-commit (lint + `tsc --noEmit`), Vitest, Playwright.
- **Cek**: `npm run dev` + `npm run build` hijau.

## Fase 1 — Design system & shell
- Token warna (ungu primary + gradient pastel), font, radius, spacing.
- Layout shell (navbar/bottom-nav responsif), tema, komponen stat: `HPBar`, `XPBar`, `GoldCounter`, `LevelBadge`, `StreakFlame`.
- Halaman `/kitchen-sink` untuk review komponen.
- **Cek**: komponen tampil konsisten di mobile & desktop.

## Fase 2 — Konten & data
- `data/plants.ts` (cabai/tomat/daun bawang/kangkung/selada + difficulty, media, growDays, stages, careSchedule, tips) — sumber [`../research/raw-context-figma-canva.md`](../research/raw-context-figma-canva.md) §11.
- `data/badges.ts`, `data/quests.ts`, `data/faq.ts`, `data/research-stats.ts` (angka kuesioner).
- **Cek**: build lolos, konten asli (tanpa lorem).

## Fase 3 — Landing page `/`
- Hero + one-liner, problem statement (statistik riset), solusi, preview fitur, CTA.
- Ikut arah visual Figma (maskot, gradient, kartu).
- **Cek**: responsif, Lighthouse ≥ 90.

## Fase 4 — Auth (mock lokal)
- `/register`, `/login`, `/onboarding` (intro slides).
- Store user di localStorage; guard route `/app/*`.
- **Cek**: register → masuk /app; logout jalan.

## Fase 5 — Katalog & detail tanaman
- `/app/plants` (filter difficulty), `/app/plants/[slug]` (jadwal, tahap, tips).
- **Cek**: navigasi + data benar.

## Fase 6 — Tambah tanaman (wizard)
- `/app/garden/add`: pilih tanaman → media → tanggal → review → **Start Plan** → +EXP, bikin `GardenPlant` + `careSchedule`.
- **Cek**: plant masuk ke garden, task ter-generate.

## Fase 7 — Dashboard
- `/app/home`: avatar + HP/EXP/Gold/Level/Streak, ringkasan task hari ini, grafik produktivitas (Recharts).
- Empty state garden kosong (tanaman abu-abu, sesuai riset §9).
- **Cek**: stat live dari store.

## Fase 8 — Task engine + To-do
- `/app/tasks`: tab **Task / Done**, dikelompokkan per tanaman (riset §9).
- Centang → +EXP/+Gold + animasi; semua selesai → bonus + streak.
- Rollover harian: task lewat → `missed` → damage HP; HP 0 → "Layu" (level −1, gold −50%, HP 50).
- **Cek**: unit test gamifikasi (Vitest) hijau.

## Fase 9 — Quest, Badge, Streak
- `/app/quests` (daily/weekly/plant), evaluasi kriteria badge, milestone streak.
- **Cek**: badge muncul sesuai kriteria.

## Fase 10 — Profil & Settings
- `/app/profile`: avatar, tier/rank, produktivitas weekly/monthly, koleksi badge.
- `/app/settings`: notifikasi, bahasa, logout, ekspor/impor data (JSON).
- **Cek**: data profil akurat.

## Fase 11 — Edukasi
- `/app/learn` + `/app/learn/[slug]`: panduan tanam (contoh cabai rawit mingguan), hidroponik vs polybag, FAQ.
- **Cek**: konten dari riset, mudah dibaca.

## Fase 12 — Polish & rilis lokal
- PWA (installable, offline minimal), pengingat (Notification API), a11y pass, animasi (Framer Motion), audit kontras.
- Playwright smoke: register → tambah plant → selesaikan task → lihat progres.
- **Cek**: jalan di Chrome desktop + emulator mobile (responsive).

## Fase 13+ — Lanjutan (backend & fitur)
- Backend nyata: MySQL 8 + JWT + Bcrypt (riset §10); migrasi store → API.
- Shop & ekonomi (Streak Freeze, potion, XP boost, dekorasi).
- Kustomisasi avatar, leaderboard/league, fitur kamera (`react-webcam`).

## Definition of Done (tiap fase)
- [ ] `npm run build` + `tsc --noEmit` + lint hijau.
- [ ] Bisa dibuka di browser (desktop & mobile viewport) tanpa error console.
- [ ] Ada empty/loading/error state.
- [ ] Copy & angka dari `docs/`, bukan karangan.
- [ ] Commit terpisah dengan pesan jelas.

## Aturan anti-slop
- Satu fase, satu fokus; jangan generate banyak layar sekaligus.
- Ikutin komponen/pola yang sudah ada (shadcn + `components/ui`).
- Review diff tiap commit; jangan tumpuk utang.
- Verifikasi di browser tiap selesai slice.
