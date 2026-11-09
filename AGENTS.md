# AGENTS.md — 1UpFarm

Panduan wajib untuk AI agent yang mengerjakan repo ini. Baca dulu, jangan menyimpang.

## 1. Produk (ringkas)
**1UpFarm = "Duolingo untuk menanam makanan sendiri di lahan sempit."** Web app (desktop + mobile, mobile-first) yang memandu pemula merawat **tanaman nyata** lewat misi harian, streak, HP, EXP, badge, **sampai panen pertama**. Gamifikasi = alat retensi, bukan tujuan. **Tidak ada leaderboard.**

## 2. Sumber kebenaran: `docs/`
Jangan pernah mengarang copy, angka, jadwal, atau label. Ambil dari:

| Butuh | File |
|---|---|
| Kenapa & positioning | `docs/product/product-strategy.md` |
| Apa yang dibangun, scope, peta layar, user flow, model data | `docs/product/PRD-1UpFarm.md` |
| Mekanik game (HP/EXP/streak/badge, konstanta) | `docs/product/gameplay-design.md` |
| Urutan kerja per fase, DoD, anti-slop | `docs/product/build-plan.md` |
| Konten tanaman (8 tanaman) | `docs/content/plant-catalog.md` |
| **Data tanaman siap impor** | `docs/content/plants.json` |
| Semua teks UI | `docs/content/ui-copy.md` |
| Design system (token, komponen, blueprint layar) | `docs/content/design-system.md` |
| Spek foto bukti tumbuh | `docs/content/photo-checkpoint-spec.md` |
| Aset visual | `docs/content/assets/figma/` + `docs/content/asset-manifest.md` |
| Verifikasi umur panen per varietas | `docs/content/cultivation-verification.md` |
| Protokol validasi | `docs/content/user-validation-kit.md` |
| Riset mentah (arsip, read-only) | `docs/research/` |

Aturan:
- `docs/research/` = arsip read-only. Jangan edit.
- `docs/content/` & `docs/product/` = acuan build. Boleh diupdate hanya jika keputusan produk berubah (jelaskan alasannya).

## 3. Stack (tetap, jangan tambah tanpa izin)
- **Next.js (App Router) + TypeScript strict**
- **Tailwind CSS**
- **shadcn/ui** + **lucide-react** (satu-satunya ikon)
- **Zustand** (+ persist) untuk state
- **Framer Motion** untuk animasi (fase polish)
- Testing: **Vitest** (logic) + **Playwright** (smoke)
- **Tanpa backend di MVP** (localStorage/IndexedDB). Upgrade path: MySQL 8 + JWT + Bcrypt.
- Dilarang menambah dependency lain tanpa bertanya.

## 4. Struktur target
```
app/
  (marketing)/page.tsx        # landing
  (auth)/login, register
  app/home, plants, plants/[slug], garden/add, plan/[id], tasks, profile, settings, learn
  kitchen-sink/page.tsx       # review komponen (dev)
components/
  ui/                         # shadcn
  <produk>/                   # TaskCard, HPBar, XPBar, StreakFlame, BadgeCard, dll
data/
  plants.ts                   # impor dari docs/content/plants.json
  badges.ts, ui-copy.ts
lib/
  gamification.ts             # HP/EXP/level/streak (WAJIB unit test)
  plant-engine.ts             # generate task dari phases + recurring
store/
  useGardenStore.ts           # Zustand + persist
public/assets/                # salin dari docs/content/assets/figma/
```

## 5. Aturan kerja
1. **Vertical slice** — satu fitur end-to-end per tugas. Jangan generate banyak layar sekaligus.
2. **Urutan fase** ikut `docs/product/build-plan.md`. Jangan lompat fase.
3. **Verifikasi wajib tiap perubahan**: `npm run build`, `npx tsc --noEmit`, `npm run lint`. Harus hijau, jangan asumsi.
4. **Logic game harus ada unit test** (Vitest): HP, EXP, level, streak, generate task.
5. **Mobile-first** 360px → desktop. Satu basis responsif.
6. **Ikuti pola yang sudah ada** (shadcn + `components/ui`). Jangan bikin gaya baru sendiri.
7. **Commit kecil** per slice, pesan jelas.
8. **Jangan placeholder/lorem** — semua teks dari `docs/content/ui-copy.md`.
9. **Jangan hardcode warna** — pakai token di `docs/content/design-system.md` (CSS var / Tailwind theme).
10. **Setiap layar wajib** punya state empty / loading / error.

## 6. Design system (ringkas)
- Primary `#7C3AED`; logo `#661599`; HP `#EF4444`; EXP `#3B82F6`; Gold `#F59E0B`; Streak `#F97316`; Growth `#22C55E`.
- Font **Nunito**, radius 8/12/16/24/full, shadow soft `0 2px 8px rgba(124,58,237,.08)`.
- Mobile: bottom-nav 5 slot, tombol **To-do di tengah** menonjol. Desktop: sidebar kiri.
- Detail lengkap: `docs/content/design-system.md`.

## 7. Konten & angka (jangan diubah sembarangan)
- 8 tanaman di `plants.json`: selada, kangkung, bayam, pakcoy, bawang-merah, daun-bawang, tomat, cabai-rawit.
- Reward: easy 10 EXP/5 gold/−5 HP; medium 20/10/−8; hard 35/18/−12.
- HP max 100; `EXP_NEED(L) = 50 × L`; semua task selesai +5 HP.
- Semua `growDays` = **dari semai**. Jangan menyebut "HST" tanpa basis.
- Tanaman tanpa ilustrasi → pakai `emoji` dari `plants.json`. Ikon UI → lucide.

## 8. Scope MVP (jangan lebih)
In-scope: onboarding, auth mock lokal, katalog + detail, wizard tambah tanaman, dashboard, daily task (Task/Done), photo checkpoint, panen + badge, profil, settings (ekspor/impor), edukasi.
**Out of scope**: leaderboard/league, backend nyata, shop/ekonomi penuh, avatar kustom, multi-tanaman kompleks, fitur mobile native.

## 9. Definition of Done (tiap fase)
- [ ] `npm run build` + `tsc --noEmit` + lint hijau
- [ ] Jalan di desktop + mobile viewport tanpa error console
- [ ] Ada empty/loading/error state
- [ ] Copy & angka dari `docs/`
- [ ] Unit test logic hijau (jika menyentuh gamifikasi/task engine)
- [ ] Commit terpisah

## 10. Fase 0 (fondasi) — checklist
- [ ] `create-next-app` (App Router, TS strict, Tailwind, ESLint, src? tidak — pakai root `app/`)
- [ ] `shadcn init` + Button, Card, Tabs, Progress, Dialog, Badge, Input, Sonner
- [ ] `git init` + commit pertama
- [ ] Prettier + Husky (lint + tsc) + Vitest
- [ ] Buat folder `data/`, `lib/`, `store/`, `components/`, `public/assets/`
- [ ] Salin `docs/content/assets/figma/*` → `public/assets/`
- [ ] `.gitignore` benar (jangan commit `.next`, `node_modules`)
- [ ] `npm run dev` + `npm run build` hijau