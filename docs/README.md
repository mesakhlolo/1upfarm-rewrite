# 1UpFarm — Dokumentasi

> Mulai dari `demo-guide.md` kalau mau **demo / test**. Selain itu: 3 set konteks yang sengaja dipisah.

## Urutan baca Cepat

| Urutan | Dokumen | Isi / Kapan dibaca |
|---|---|---|
| 1 | **`demo-guide.md`** | **Script presentasi + user-testing** dari awal sampai panen: peta layar, 9 akun test (case berbeda-beda), mesin waktu (selesaikan 1 tanaman tanpa nunggu 30–120 hari), skenario A1–A17 + edge case, checklist responsif/a11y, gate developer, template lapor bug |
| 2 | `product/product-strategy.md` | Kenapa & untuk apa 1UpFarm |
| 3 | `product/PRD-1UpFarm.md` | Apa yang dibangun (scope, peta layar, user flow, model data) |
| 4 | `product/gameplay-design.md` | Mekanik game (HP/EXP/streak/badge, konstanta) |
| 5 | `product/build-plan.md` | Urutan kerja per fase, DoD, anti-slop |
| 6 | `product/master-plan.md` | Rencana master (fase, task teknis, checklist, arsitektur) |
| 7 | `content/plant-catalog.md` | Konten 8 tanaman (jadwal, fase, tips, masalah, sumber) |
| 8 | `content/plants.json` | Data tanaman siap impor ke app (`data/plants.ts`) |
| 9 | `content/cultivation-verification.md` | Verifikasi umur panen per varietas + penjelasan HST |
| 10 | `content/ui-copy.md` | Semua teks UI final (Bahasa Indonesia) |
| 11 | `content/photo-checkpoint-spec.md` | Spek foto bukti tumbuh (kompresi, storage, privacy, test) |
| 12 | `content/design-system.md` | Token, tipografi, spacing, layout & nav, blueprint layar, a11y |
| 13 | `content/asset-manifest.md` + `content/assets/figma/` | Inventaris & aset visual (logo, badge, ilustrasi) |
| 14 | `content/user-validation-kit.md` | Protokol diary study 14 hari |
| 15 | `research/raw-context-figma-canva.md` + `.pdf` | Riset mentah (arsip, read-only) — buka hanya jika butuh angka/sumber asli |

## Isi per set

### `product/` — Interpretasi & keputusan produk (acuan build)
- `product-strategy.md` — Positioning “Duolingo untuk menanam makanan sendiri di lahan sempit”, core loop, hipotesis churn, keputusan *sistem = Habitica, tanpa leaderboard*.
- `PRD-1UpFarm.md` — PRD MVP: persona tunggal, tanaman cepat panen, foto bukti, scope in/out.
- `gameplay-design.md` — Sistem gamifikasi (streak, HP, EXP, level, badge, foto checkpoint) + konstanta tuning.
- `build-plan.md` — Roadmap fase 0–13 + Definition of Done + aturan anti-slop.
- `master-plan.md` — Rencana teknis per fase.

### `content/` — Materi siap pakai (sumber copy & angka di app)
- `plant-catalog.md` — **8 tanaman** (selada, kangkung, bayam, pakcoy, bawang merah, daun bawang, tomat, cabai rawit) + jadwal perawatan lengkap + sumber.
- `plants.json` — Data terstruktur: phases, recurring, photoCheckpoints, tips, problems, difficultyRewards.
- `ui-copy.md` — Copy final UI.
- `photo-checkpoint-spec.md` — Spek foto: ≤800px/JPEG 0.7/≤120KB, storage, privacy, test.
- `design-system.md` — Token warna/tipografi/spacing, layout & nav, inventaris komponen, motion, blueprint layar, a11y.
- `cultivation-verification.md` — Verifikasi umur panen per varietas + basis HST + confidence.
- `asset-manifest.md` + `assets/figma/` — 23 aset diekspor dari Figma.
- `user-validation-kit.md` — Protokol diary study 14 hari (rekrutmen, consent, instrumen, metrik, analisis).

### `research/` — Arsip mentah (read-only)
- `raw-context-figma-canva.md` — Ekstraksi Figma + Canva: problem, persona, kuesioner 63 responden, kompetitor, fitur, IA, flow, data backend, stack, feedback usability.
- `SPRINT REVIEW BACKEND - CANGKUL.pdf` — Deck Canva asli.

## Aturan
- Semua angka/copy UI **wajib** dari `research/` atau `product/`. Dilarang mengarang.
- `research/` = read-only arsip. Perubahan keputusan masuk ke `product/`.
- `content/` & `product/` = acuan build. Boleh diupdate hanya jika keputusan produk berubah (jelaskan alasannya).
- Bila akun demo / alur demo berubah, update **`demo-guide.md`** di folder ini (bukan file root terpisah) — supaya tidak ada duplikasi.
