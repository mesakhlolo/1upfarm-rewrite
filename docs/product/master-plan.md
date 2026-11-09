# Master Plan — Eksekusi 1UpFarm sampai /goal (MVP)

**Sumber acuan:** `docs/product/build-plan.md` (urutan fase), `docs/product/PRD-1UpFarm.md` §6–9 (scope & model data),
`docs/product/gameplay-design.md` (mekanik), `docs/content/design-system.md` (token & blueprint),
`docs/content/ui-copy.md` (semua copy), `docs/content/plants.json` (data tanaman),
`AGENTS.md` (stack & aturan kerja).
**Prinsip:** vertical slice — satu fase satu fokus, tiap fase bisa dibuka & dinilai, commit kecil, jangan lanjut sebelum hijau.

---

## 0. Definisi /goal (MVP selesai)

`/goal` = **MVP web app jalan lokal end-to-end** (Fase 0–12 build-plan), sesuai PRD §6 In-scope:

- Landing `/` → Register/Login/Onboarding → Katalog+Detail → Wizard tambah tanaman →
  Dashboard → Daily Task (Task/Done) → Photo checkpoint → Panen pertama + Badge →
  Profil + Settings (ekspor/impor) → Edukasi.
- Core loop hidup: **Pilih 1 tanaman cepat panen → guided plan hari 1..N → 1–2 task/hari + reminder →
  foto bukti di milestone → panen → selebrasi + badge → tanaman berikutnya.**
- North Star: % user baru mencapai **panen pertama**.

**Out of /goal (Fase 13+):** backend nyata (MySQL/JWT/Bcrypt), shop/ekonomi penuh, kustomisasi avatar,
leaderboard/league (**dilarang di MVP** — `gameplay-design.md` §10, `product-strategy.md` §9),
multi-tanaman kompleks, mobile native. Bila diminta = fase terpisah, tidak menggagalkan /goal.

### Exit gate /goal (semua harus hijau)

- [ ] `npm run build` + `npm run typecheck` (`next typegen && tsc --noEmit`) + `npm run lint` hijau
- [ ] `npm run test` (Vitest) hijau — gamifikasi + plant-engine + rollover
- [ ] Playwright smoke hijau: register → tambah plant → selesaikan task → lihat progres
- [ ] Jalan di Chrome desktop + viewport mobile 360px tanpa error console
- [ ] Tiap layar ada empty / loading / error state
- [ ] Semua copy & angka dari `docs/` (bukan karangan), warna via token (bukan hardcode hex)
- [ ] Lighthouse ≥ 90 (landing), a11y pass (kontras ≥ 4.5:1, fokus keyboard, target ≥ 44px)

---

## 1. Audit posisi sekarang (sebelum plan jalan)

| Fase | Status | Bukti di repo |
|---|---|---|
| **0 Fondasi** | ✅ Selesai | Next.js App Router + TS strict + Tailwind v4, shadcn (`components/ui`: button, card, tabs, progress, dialog, badge, input, sonner), Prettier + Husky (lint+typecheck), Vitest, `app/`, `components/`, `data/`, `lib/`, `store/`, `public/assets/` (copy dari `assets/figma/`), `.gitignore` benar. `npm run build` hijau (routes: `/`, `/kitchen-sink`). |
| **1 Design system & shell** | ✅ Selesai | Token di `app/globals.css` sesuai `design-system.md` §2–4 (primary `#7C3AED`, stat colors, radius 8/12/16/24/full, shadow-soft/pop, gradient, Nunito). Komponen: `HPBar`, `XPBar`, `GoldCounter`, `LevelBadge`, `StreakFlame`, `TaskCard`, `PlantCard`, `BadgeCard`, `DifficultyTag`, `EmptyState`. `AppShell` + `BottomNav` (5 slot, To-do tengah menonjol) + `SideNav` (240px, stat panel). `/kitchen-sink` tampil konsisten. |
| **2 Konten & data** | ✅ Selesai | `data/plants.ts` (8 tanaman impor `plants.json`, `DIFFICULTY_REWARDS`, `GAME_CONSTANTS`), `data/badges.ts` (8 badge, ui-copy §19), `data/quests.ts`, `data/faq.ts` (6 item + sumber), `data/research-stats.ts` (63 responden). Tanpa lorem. |
| **3 Landing `/`** | ✅ Selesai | Hero + problem (91/64/68%) + solusi 3 langkah + preview 3 tanaman (`PlantCard`) + bukti riset + footer, copy = `ui-copy.md` §2, responsif. |
| **4–12** | ⬜ Belum jalan | Belum ada: `store/useGardenStore.ts` (hanya `.gitkeep`), `lib/gamification.ts`, `lib/plant-engine.ts`, route `/app/*`, `/login`, `/register`, `/onboarding`, `/app/garden/add`, `/app/tasks`, `/app/profile`, `/app/settings`, `/app/learn`, `/app/plan/[id]`, Playwright, PWA, Framer Motion, Recharts. |

**Catatan resolusi konflik (ikuti sumber terbaru, bukan build-plan lama):**

1. **HP 0 / Layu:** build-plan Fase 8 menulis "level −1, gold −50%, HP 50".
   `gameplay-design.md` §5 + `ui-copy.md` §11 (lebih baru & eksplisit MVP) = **tanpa penalti level/gold berat**,
   hanya layar suportif "tanaman butuh perhatian" + HP reset 50 setelah revive.
   Master plan mengikuti **gameplay §5**; ubah build-plan hanya bila keputusan produk berubah.
2. **Sumber data tanaman:** build-plan Fase 2 menyebut `research §11`.
   `AGENTS.md` + `plants.json` sudah menjadi sumber siap impor — **pakai `plants.json`** (sudah selesai).
3. **Struktur route:** PRD §7 + design-system §8 + build-plan memakai **`/app/*`**.
   AGENTS §4 menulis `app/home` (ambiguitas). Putusan plan: **`app/app/**`** + landing tetap `app/page.tsx`
   dan auth di `app/(auth)/login|register`. `AppShell` di-mount via `app/app/layout.tsx`.

**Dependency yang belum ada (dilarang tambah tanpa izin — AGENTS §3):** `zustand`, `framer-motion`, `recharts`, `@playwright/test`.
Master plan mengasumsikan 4 izin ini diminta **sekarang** (satu paket), karena dipakai di Fase 4/7/12.

---

## 2. Peta dependensi & urutan eksekusi

```
Fase 4 (auth+store) ──┬─► Fase 5 (katalog/detail, butuh shell+data yg sudah ada)
                        │
Fase 6 wizard ── wajib ──► engine (plant-engine) + gamification (EXP) ──► Fase 7 dashboard
                        │                                                   │
                        └──────────────────► Fase 8 task engine ────────────┤
                                                                              ▼
                                    Fase 9 quest/badge/streak ──► Fase 10 profil/settings ──► Fase 11 edukasi
                                                                              │
                                                              Fase 12 polish (PWA, animasi, smoke) = /goal
```

Urutan wajib (tanpa lompat, sesuai AGENTS §5): **4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12.**
Fase 5 & 6 bisa tumpang tindih sebagian (detail → wizard) tapi **tidak boleh** lompat ke 7 sebelum store+engine ada,
dan tidak boleh ke 9 sebelum task engine (fase 8) hijau + unit test.

### Sprint pembagi (untuk commit kecil, bukan mengganti urutan)

| Sprint | Fase | Tema | Output terukur |
|---|---|---|---|
| **S-A Fondasi hidup** | 4 (+ engine tanaman) | Auth mock + store + guard | Register → masuk `/app/home` (masih kosong), logout jalan |
| **S-B Core loop** | 5 → 6 → 7 → 8 | Pilih → tambah → dashboard → task | Tanaman masuk garden, task ter-generate & bisa dicentang +EXP |
| **S-C Retensi** | 9 → 10 → 11 | Badge/streak, profil/settings, edukasi | Badge muncul, ekspor/impor, panduan terbaca |
| **S-D Rilis lokal** | 12 | Polish & smoke | PWA installable, Playwright hijau, Lighthouse ≥ 90 = **/goal** |

Setiap sprint = 1–2 commit kecil per slice. Tidak ada commit "banyak layar sekaligus".

---

## 3. Fase 4 — Auth (mock lokal)

**Tujuan:** user bisa daftar/masuk, guard `/app/*`, logout. Store pertama kali hidup.

- **Input:** `ui-copy.md` §3–4 (onboarding 3 slide, judul, error), `design-system.md` §8 blueprint `/onboarding`, `/login`, `/register`.
- **File baru:**
  - `store/useGardenStore.ts` — Zustand + persist. Schema minimal Fase 4: `user {id, username, displayName, avatar, level, xp, hp, gold, streak, badges[], joinedAt, lastActiveDate}`, `users[]` (daftar lokal), `isAuthenticated`, actions `register/login/logout`. Persist `localStorage`. HP awal 100, EXP 0, Level 1, gold 0, streak 0.
  - `app/(auth)/register/page.tsx`, `app/(auth)/login/page.tsx`, `app/(auth)/onboarding/page.tsx` (3 slide + dot + CTA "Pilih Tanaman Pertamaku", tombol "Lewati").
  - `app/app/layout.tsx` — mount `AppShell` (BottomNav/SideNav) + guard: belum login → redirect `/register` (client-side check + `console` guard, tanpa backend). Header sapaan dari `user.displayName`.
  - `lib/utils.ts` tambah helper `cn` tetap + `formatDateId` (tanpa lib date lain).
- **Aturan:** password tidak disimpan plaintext lepas (hash ringan SHA-256 via WebCrypto untuk mock; **bukan** bcrypt — backend Fase 13). Validasi: username unik, password ≥ 6, error copy persis `ui-copy.md` §4. Avatar: inisial (chibi PNG opsional Fase 10).
- **Per связей:** CTA landing "Mulai Gratis" → `/register`; onboarding akhir → `/app/plants` (Fase 5) atau `/app/home`.
- **Verifikasi:** `build` + `typecheck` + `lint` hijau; register → `/app/home`; logout → landing; refresh tetap login (persist). Empty/loading: form skeleton belum perlu; error inline wajib.
- **DoD:** commit `feat(auth): register/login/onboarding mock lokal + guard /app/* + useGardenStore awal`.

---

## 4. Fase 5 — Katalog & Detail tanaman

**Tujuan:** user melihat 8 tanaman & membuka detail sebelum menambah.

- **Input:** `data/plants.ts` (sudah ada), `ui-copy.md` §6–7, `design-system.md` §8 (`/app/plants`, `/app/plants/[slug]`).
- **File baru:**
  - `app/app/plants/page.tsx` — judul "Pilih tanamanmu", filter chip Semua/Cepat panen/Mudah/Menantang, grid `PlantCard`, empty "Belum ada tanaman di filter ini."
  - `app/app/plants/[slug]/page.tsx` — emoji/emoji+ilustrasi, info (panen ± hari dari semai, matahari, pot, jarak, pH), `StageStepper` (dari `phases`), "Tips penting", "Kalau bermasalah" (`problems`), CTA "Tanam ini" → `/app/garden/add?plant={slug}`.
  - `components/StageStepper.tsx` (baru) — horizontal, aktif ungu, selesai hijau. `components/MediaTag.tsx` (baru, Polybag/Pot vs Hidroponik).
- **Aturan angka:** panen tampil **"± {min}–{max} hari (estimasi dari semai)"** + tooltip "Bisa beda tergantung varietas, dataran, dan media." (`cultivation-verification.md` §4). Jangan tulis HST tanpa basis. Difficulty label dari `DIFFICULTY_LABEL`.
- **Verifikasi:** build+lint hijau; filter bekerja; slug salah → 404 ui-copy §16. Responsif grid 1→2→3 kolom.
- **DoD:** commit `feat(plants): katalog /app/plants + detail /app/plants/[slug] + StageStepper`.

---

## 5. Fase 6 — Tambah tanaman (wizard)

**Tujuan:** user memilih tanaman → media → tanggal → review → **Start Plan** → `GardenPlant` + `careSchedule` + EXP pertama. Ini slice pertama yang menulis ke store secara bermakna.

- **Input:** `ui-copy.md` §8 (4 langkah + CTA "Mulai Rencana" + sukses "Rencana dimulai! +{exp} EXP"), PRD §9 model `GardenPlant`, `plants.json` `phases` + `recurring`.
- **Engine dulu (sebelum UI, agar testable):**
  - `lib/plant-engine.ts` — `generateTasks(plant, startedAt, media): Task[]` dari `phases` (1 task per fase) + `recurring` (siram/pupuk/cek hama/pangkas per `everyDays`, dibatasi `startDay..endDay`). Cap **1–2 task/hari/tanaman** (gameplay §3, riset 64% kurang waktu). ID deterministik `{gardenPlantId}-{day}-{type}`. Unit test di `lib/plant-engine.test.ts`.
  - `lib/gamification.ts` (dibuat di Fase 6, dipakai penuh di Fase 8) — `addExp`, `levelFor`, `applyRollover`. Test bersama.
- **File UI:**
  - `app/app/garden/add/page.tsx` — Wizard stepper 4 langkah (Pilih→Media→Tanggal→Ringkasan), validate per langkah, ringkasan tampil tanaman/media/mulai/estimasi panen, CTA sukses → masuk `/app/plan/[id]` + toast.
  - `app/app/plan/[id]/page.tsx` — header tanaman + `GrowthRing` (`currentDay/expectedHarvest`) + `StageStepper` + timeline hari + `TaskCard` per hari + `PhotoCheckpointCard` di milestone (`components/GrowthRing.tsx`, `components/PhotoCheckpointCard.tsx` baru).
  - Store tambah: `gardenPlants[]`, `tasks[]`, action `addGardenPlant` → +EXP pertama (10/20/35 per difficulty) + badge **Tunastumbuh** (gameplay §9).
- **Aturan:** `growDays` = dari semai (jangan "HST"). Estimasi panen = `startedAt + growDays.max`. Tidak ada backend; `tasks` di-generate sekali saat Start (bukan tiap render).
- **Verifikasi:** plant masuk garden; task hari 1 muncul di `/app/plan/[id]`; EXP naik; badge Tunastumbuh muncul; tanggal konsisten.
- **DoD:** commit `feat(garden): wizard tambah tanaman + plant-engine + plan/[id]`.

---

## 6. Fase 7 — Dashboard

**Tujuan:** `/app/home` jadi layar harian: stat live + misi hari ini + grafik produktivitas.

- **Input:** `ui-copy.md` §5 (sapaan, "Misi hari ini", empty garden, semua selesai), `design-system.md` §8.
- **File:** `app/app/home/page.tsx` — header sapaan ("Hai, {nama}!" atau "Tanamanmu butuh kamu hari ini." bila HP ≤ 30), stat row (`HPBar`/`XPBar`/`GoldCounter`/`LevelBadge`/`StreakFlame` dari store), "Misi hari ini" (5 task pertama hari ini, link "Buka To-do"), kartu tanaman aktif (foto terakhir/emoji + GrowthRing), `EmptyState` bila garden kosong ("Kebunmu masih kosong… Tambah Tanaman", tanaman abu-abu sesuai riset §9), banner semua selesai ("Mantap! Semua misi hari ini beres 🎉").
  - Grafik: `components/ProductivityChart.tsx` (Recharts Bar/Area 7 hari terakhir, dari `tasksDone` di store). **Izin `recharts` diminta bersama zustand.**
- **Verifikasi:** stat live (ubah task → stat berubah), empty state benar, mobile tanpa overlap bottom-nav.
- **DoD:** commit `feat(home): dashboard /app/home live dari store + grafik produktivitas`.

---

## 7. Fase 8 — Task engine + To-do (core game)

**Tujuan:** loop harian berfungsi penuh, termasuk rollover & Layu (lembut).

- **Input:** `gameplay-design.md` §3–6 & §12 (reward 10/20/35 EXP, gold 5/10/18, HP penalty −5/−8/−12, `EXP_NEED(L)=50×L`, semua selesai +5 HP, foto +5 HP/+10 EXP), `ui-copy.md` §9–11.
- **File:**
  - `lib/gamification.ts` (final) — `completeTask`, `applyMissed`, `applyDailyRollover` (task lewat → `missed` + damage HP), `checkStreak`, `addPhotoReward`. Layu: HP 0 → overlay suportif `ui-copy.md` §11 ("Tanamanmu butuh perhatian…") tanpa potong level/gold MVP, HP di-set 50 saat revive. Test Vitest wajib: naik level overflow, HP regen caps 100, streak reset & freeze (50 gold maks 2), rollover idempotent.
  - `app/app/tasks/page.tsx` — Tabs `Task`/`Done`, dikelompokkan per tanaman (riset §9), centang → `completeTask` + toast "Selesai! +{exp} EXP, +{gold} gold." + animasi `+EXP` melayang (CSS, Framer Motion menyusul Fase 12). Semua selesai → bonus + streak + toast "Semua misi hari ini selesai. Streak +1 🔥". Hari baru: rollover saat mount (cek `lastActiveDate`).
  - Photo checkpoint mini di To-do: bila hari ini milestone `photoCheckpoints` → task Foto khusus + upload (lihat bawah).
- **Photo checkpoint (wajib di Fase 8, bukan tunda):** `components/PhotoCheckpointUpload.tsx` — `<input type="file" accept="image/*" capture="environment">`, resize ≤ 800px JPEG q0.7 ≤ 120KB (`lib/image.ts`), simpan `PhotoCheckpoint {id, gardenPlantId, day, stage, imageDataUrl, createdAt}`. **Foto di IndexedDB** (studi §4 spec), bukan localStorage (kuota ~5MB). Fallback error copy spec §7. Reward +5 HP +10 EXP via `addPhotoReward`.
- **Verifikasi:** centang → EXP/gold naik, Done pindah tab; skip 1 hari (ubah tanggal manual di test) → missed + HP turun; semua selesai → streak +1 & HP +5; unit test hijau.
- **DoD:** 2 komit terpisah: `feat(game): gamification + plant-engine test` lalu `feat(tasks): /app/tasks + photo checkpoint + rollover`.

---

## 8. Fase 9 — Quest, Badge, Streak

**Tujuan:** retensi terlihat: quest & badge dievaluasi otomatis.

- **Input:** `data/quests.ts` + `data/badges.ts` (sudah ada), `gameplay-design.md` §6 & §9 (milestone 3/7/14/30, badge Tunastumbuh/Foto Pertama/Streak 7/Green Thumb 50 misi/Panen Pertama/Level 5/15/30).
- **File:**
  - `app/app/quests/page.tsx` — daftar Daily/Weekly/Plant (`QUESTS`), progress bar per kriteria (dari store), klaim otomatis.
  - `lib/badge-evaluator.ts` — `evaluateBadges(state): Badge[]` baru setiap action (tambah tanaman, isi foto, task ke-50, streak 7, panen, level cap). Dipanggil setelah Fase 8 actions.
  - `components/BadgeToast.tsx` + integrasi Sonner — "Badge baru: {nama}".
  - Panen: bila `currentDay >= growDays.max` (atau task Panen selesai) → status `harvested`, overlay selebrasi Fase 10 nanti.
- **Verifikasi:** isi foto pertama → badge Foto Pertama muncul; 7 streak → Streak 7; 50 task → Green Thumb.
- **DoD:** commit `feat(quests): /app/quests + badge evaluator + streak milestone`.

---

## 9. Fase 10 — Profil & Settings

**Tujuan:** profil akurat + data aman (ekspor/impor, logout, notifikasi).

- **Input:** `ui-copy.md` §13–14, PRD §9 `User`, `photo-checkpoint-spec.md` §8 (privasi foto).
- **File:**
  - `app/app/profile/page.tsx` — avatar, `LevelBadge` + tier (Pemula 1–9 / Berkelanjutan 10–24 / Professional 25+), stat full, produktivitas 7/30 hari (dari `tasksDone` per tanggal), koleksi `BadgeCard` (terbuka/terkunci), empty "Belum ada badge…".
  - `app/app/settings/page.tsx` — toggle "Notifikasi pengingat" (persist + `Notification.permission` request, best-effort), "Bahasa: Indonesia" (statis MVP), **Ekspor JSON** (Blob download `1upfarm-data-YYYY-MM-DD.json`, opsi sertakan foto default off), **Impor JSON** (file input + validate schema, ganti store), catatan privasi foto, **Keluar** (ConfirmDialog + copy "Yakin mau keluar?…").
  - Overlay panen: `components/CelebrationOverlay.tsx` — gradient reward + CTA "Tanam Berikutnya" (`ui-copy.md` §12 "PANEN PERTAMA! 🎉").
- **Verifikasi:** ekspor → impor di browser lain/kosong → data pulih; logout → guard; tier berubah saat level naik.
- **DoD:** commit `feat(profile): /app/profile + /app/settings + ekspor/impor + selebrasi panen`.

---

## 10. Fase 11 — Edukasi

**Tujuan:** panduan terbaca, konten dari riset (bukan karangan).

- **Input:** `data/faq.ts` (sudah ada), `docs/content/plant-catalog.md` (8 tanaman), `research §11` (cabai hidroponik mingguan), `user-validation-kit.md` (bukan dikarang).
- **File:**
  - `app/app/learn/page.tsx` — kartu artikel: Panduan tanam cabai rawit (mingguan), Hidroponik vs Polybag (2:1:1), Panduan polybag umum, FAQ.
  - `app/app/learn/[slug]/page.tsx` — artikel prose dengan copy dari `plant-catalog.md` + `faq.ts`, tanpa placeholder. Setiap paragraf mencatat sumber di footer.
- **Verifikasi:** konten 1:1 dengan sumber, tidak ada lorem, mudah dibaca mobile (font ≥ 16px).
- **DoD:** commit `feat(learn): /app/learn + /app/learn/[slug] dari katalog & FAQ`.

---

## 11. Fase 12 — Polish & rilis lokal (= /goal)

**Tujuan:** siap dibuka di Chrome desktop + emulator mobile, semua gate /goal hijau.

- **PWA:** `public/manifest.webmanifest` (dari `logo-instance.png` 192/512), `public/sw.js` minimal (offline: cache app-shell + `globals.css`, strategi network-first + cache-fallback), `app/layout.tsx` tambah `viewport`, `themeColor`, apple-touch-icon. Service worker hanya di production (`next build && next start` uji).
- **Pengingat:** Notification API best-effort di `lib/reminder.ts` — cek harian jam 08:00 (setInterval 1 menit saat app terbuka): siram, monitoring, HP rendah, foto (copy `ui-copy.md` §15). Tanpa push server MVP.
- **Animasi:** `framer-motion` — TaskCard pop + `+EXP` float 400ms, `StreakFlame` pop, `CelebrationOverlay` confetti (canvas-confetti CSS murni, hindari dep baru), `prefers-reduced-motion` mematikan.
- **A11y & kontras:** audit tiap layar (fokus ring, aria-label ikon, alt foto, 44px target, safe-area). Perbaiki font landing kecil (feedback usability §14).
- **Playwright:** tambah `@playwright/test`, `playwright.config.ts` (baseURL localhost, project chromium + mobile 360px). `tests/smoke.spec.ts`: register → onboarding → tambah selada → centang task → dashboard progres naik → badge Tunastumbuh. `npm run test:e2e`.
- **Lighthouse:** ukur `/` + `/app/home`, iterasi hingga ≥ 90 (compress `feat-*.png` > 100KB → ≤ 150KB WebP/AVIF via `next/image`).
- **Verifikasi final:** semua checklist §0 hijau + `npm run build`, `typecheck`, `lint`, `test`, `test:e2e` di CI lokal. Verifikasi browser desktop + 360px.
- **DoD /goal:** commit `chore(polish): PWA + notifikasi + framer-motion + playwright smoke + a11y` + rilis v0.1.0.

---

## 12. Testing strategy (tidak bisa ditawar)

| Lapisan | Yang diuji | File |
|---|---|---|
| **Vitest (logic)** | `addExp` overflow/level, `applyMissed` HP penalty per difficulty, `applyDailyRollover` idempotent + Layu lembut, `checkStreak` reset/freeze, `generateTasks` cap 1–2/hari & recurring interval, `evaluateBadges` tiap kriteria, `essize` foto ≤ 120KB mock canvas | `lib/gamification.test.ts`, `lib/plant-engine.test.ts`, `lib/badge-evaluator.test.ts`, `lib/image.test.ts` |
| **Playwright (smoke)** | register → tambah plant → selesaikan task → lihat progres; guard redirect; ekspor→impor roundtrip | `tests/smoke.spec.ts` |
| **Manual** | 360px & desktop tanpa console error, setiap layar empty/loading/error, Lighthouse ≥ 90 | checklist §0 |

Tidak ada unit test Fase 8 = fase belum selesai (AGENTS §5.4).

---

## 13. Aturan kerja per slice (wajib)

1. **Satu fase satu fokus.** Tidak generate banyak layar sekaligus.
2. **Verifikasi tiap slice:** `npm run build`, `npm run typecheck`, `npm run lint`, `npm run test` (+ `test:e2e` di Fase 12). Hijau dulu baru commit.
3. **Copy & angka dari `docs/`** — cantumkan sumber di komentar kode (pola `data/plants.ts` sudah ada). Jangan placeholder.
4. **Warna via token** (`globals.css` var → Tailwind), jangan hex di komponen.
5. **Ikon lucide saja**, tanaman tanpa ilustrasi pakai `emoji` (`plants.json`).
6. **Commit kecil** per slice, pesan `feat/fix/chore(scope): ...` + referensi fase.
7. **Review diff** tiap commit; jangan tumpuk utang (TODO harus ada ticket/fase).
8. **Setiap layar:** empty (`EmptyState`) / loading (`Skeleton` "Memuat kebunmu…") / error ("Ada yang salah. Coba lagi." / 404).

**Dilarang:** leaderboard/league, backend, shop, tambah dependency liar, edit `docs/research/`, hardcode warna/copy/angka,
menyebut "HST" tanpa basis, sebut angka panen tanpa "dari semai".

---

## 14. Risiko & mitigasi

| Risiko | Dampak | Mitigasi di plan |
|---|---|---|
| localStorage penuh oleh foto | Crash / `QuotaExceededError` | IndexedDB untuk foto, kompresi ≤ 120KB, thumbnail 400px, hapus lama, ekspor foto default off (`photo-checkpoint-spec.md` §4) |
| Logika tanggal/streak rapuh (DST, zona) | Streak reset salah | Simpan `lastActiveDate` `YYYY-MM-DD` lokal, `applyDailyRollover` idempotent + unit test lompat hari |
| Scope creep: shop/leaderboard/backend | /goal tertunda | Kunci out-of-scope §0; Fase 13+ terpisah |
| Build lambat / Turbopack di Windows native (Smart App Control memblokir binary Rust unsigned) | SmartScreen/Smart App Control | Jalankan di WSL2 Linux filesystem (Turbopack `--turbopack`); jangan paksa `--webpack` di WSL. Lihat README § Troubleshooting Windows Smart App Control |
| Konten tanaman tidak realistis | User gagal tanam | Tampilkan rentang + "estimasi dari semai" + varietas/dataran/media (`cultivation-verification.md` §4), validasi via `user-validation-kit.md` setelah /goal |
| Font kecil (feedback usability) | A11y gagal | Font dasar ≥ 16px, audit §9 design-system |

---

## 15. Keselarasan build-plan → roadmap ini

| Build-plan | Master plan | Perubahan? |
|---|---|---|
| Fase 0–3 | §1 audit ✅ selesai | — |
| Fase 4 Auth | §3 (store awal + guard) | Tambah WebCrypto hash mock (bukan bcrypt) |
| Fase 5 Katalog/detail | §4 | Tambah StageStepper/MediaTag |
| Fase 6 Wizard | §5 (engine dulu) | Engine+test **sebelum** UI |
| Fase 7 Dashboard | §6 (Recharts) | Izin dep paket |
| Fase 8 Task engine | §7 (rollover+Layu lembut, foto di sini) | **Ikut gameplay §5, bukan build-plan hukuman berat**; foto tidak ditunda |
| Fase 9 Quest/Badge | §8 | Evaluator terpisah |
| Fase 10 Profil/Settings | §9 (+ selebrasi panen) | Ekspor/impor wajib MVP |
| Fase 11 Edukasi | §10 | Sumber katalog+FAQ |
| Fase 12 Polish | §11 Playwright+PWA = /goal | Tambah IndexedDB & notifikasi best-effort |
| Fase 13+ | §0 Out of scope | Terpisah, tidak blok /goal |

---

## 16. Langkah pertama (siap jalan)

1. Minta izin 4 dependency: `zustand framer-motion recharts @playwright/test`.
2. Eksekusi **Fase 4** (CRITICAL PATH): `useGardenStore` → `(auth)` pages → `app/app/layout` guard.
3. Setiap selesai fase: jalankan gate §0, commit kecil, catat di `README.md` Status.

