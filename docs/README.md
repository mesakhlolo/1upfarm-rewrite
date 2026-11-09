# 1UpFarm — Dokumentasi

Repo ini punya **3 set konteks** yang sengaja dipisah:

## 1. `research/` — konteks MENTAH (sumber asli)
Hasil tarikan langsung dari yang kamu berikan, **tanpa interpretasi/improve**.
- `raw-context-figma-canva.md` — ekstraksi penuh dari **Figma** (design + FigJam Research Organizer, section 1upFarm) dan **Canva** (deck SPRINT REVIEW BACKEND). Berisi riset mentah: problem statement, persona, kuesioner 63 responden, kompetitor, fitur, IA, flow, data backend, stack, feedback usability, arah visual.
- `SPRINT REVIEW BACKEND - CANGKUL;.pdf` — file deck Canva asli.

→ Pakai ini kalau butuh **angka/sumber asli**. **Jangan diedit**; ini arsip.

## 2. `product/` — hasil IMPROVE (dari diskusi kita)
Interpretasi + keputusan produk turunan dari riset mentah di atas.
- `product-strategy.md` — **jawaban "1UpFarm untuk apa"**: positioning, beda vs Duolingo/Habitica, differentiator, core loop, hipotesis churn, keputusan "sistem = Habitica, tanpa leaderboard".
- `PRD-1UpFarm.md` — PRD MVP (persona tunggal, tanaman cepat panen, foto bukti, scope).
- `gameplay-design.md` — sistem gamifikasi (streak, HP, EXP, level, badge, foto checkpoint).
- `build-plan.md` — roadmap fase 0–13 + Definition of Done + aturan anti-slop.

→ Ini yang jadi **acuan build**.

## 3. `content/` — MATERI APLIKASI (siap pakai)
Konten jadi yang diimpor app. Turunan agronomi tepercaya + keputusan produk.
- `plant-catalog.md` — **8 tanaman** (selada, kangkung, bayam, pakcoy, bawang merah, daun bawang, tomat, cabai rawit) + jadwal perawatan lengkap (phases, recurring, tips, masalah umum) + sumber.
- `plants.json` — data terstruktur (siap diimpor ke `data/plants`): phases, recurring, photoCheckpoints, tips, problems, difficultyRewards.
- `ui-copy.md` — semua copy UI final Bahasa Indonesia (landing, onboarding, dashboard, to-do, badge, notifikasi, dll).
- `photo-checkpoint-spec.md` — spek foto bukti tumbuh: kompresi (≤800px/JPEG 0.7/≤120KB), storage (IndexedDB), privacy, test cases.
- `design-system.md` — token warna/tipografi/spacing, layout & nav, inventaris komponen, motion, blueprint tiap layar, a11y. Inspirasi Duolingo + Habitica, komponen kunci dari Figma.
- `cultivation-verification.md` — verifikasi umur panen per varietas + penjelasan basis HST (semai vs pindah tanam) + confidence + sumber.
- `asset-manifest.md` — inventaris aset visual asli (Figma) + spesifikasi aset yang masih perlu dibuat.
- `assets/figma/` — 23 aset diekspor dari Figma (logo, avatar, badge, ilustrasi fitur, ilustrasi tanaman).
- `user-validation-kit.md` — protokol lengkap diary study 14 hari (rekrutmen, consent, instrumen, metrik, analisis) siap dijalankan.

→ Semua angka/label di app **dari sini**, bukan ngarang.

## Urutan baca
1. `product/product-strategy.md` (kenapa & untuk apa)
2. `product/PRD-1UpFarm.md` (apa yang dibangun)
3. `product/gameplay-design.md` (mekanik)
4. `product/build-plan.md` (urutan kerja)
5. `content/plant-catalog.md` (konten tanaman) + `content/plants.json` (data)
6. `content/cultivation-verification.md` (verifikasi umur panen)
7. `content/ui-copy.md` (teks UI) + `content/photo-checkpoint-spec.md` (foto)
8. `content/design-system.md` (UI/UX: token, komponen, blueprint layar) + `content/asset-manifest.md`
9. `content/user-validation-kit.md` (rencana validasi)
10. `research/raw-context-figma-canva.md` (sumber, saat butuh detail/angka)

## Data gaps (sisa)
- **Aset custom** dari Figma ✅ (logo, avatar, badge contoh, ilustrasi). **Masih perlu dibuat**: maskot 3 pose, 6 ikon tanaman, 8 badge final, app icon. Fallback (emoji + lucide) siap → tidak block build.
- **Validasi perilaku**: protokol ✅ (`user-validation-kit.md`). **Eksekusi** (10 orang, 14 hari) belum — butuh peserta nyata.
- **Verifikasi agronomi**: ✅ per varietas (`cultivation-verification.md`). Sisa: iklim mikro lokal + dosis pupuk per merek → tampilkan sebagai "panduan umum".

Selesai: jadwal perawatan (8 tanaman), copy UI final, spek foto, design system, aset Figma, verifikasi varietas, protokol validasi.

## Aturan
- Semua angka/copy UI **wajib** dari `research/` atau `product/`. Dilarang ngarang.
- `research/` = read-only arsip. Perubahan keputusan masuk ke `product/`.