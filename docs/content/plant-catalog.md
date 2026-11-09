# Plant Catalog — 1UpFarm (materi konten lengkap)

Konten inti aplikasi. 8 tanaman, 2 media (polybag/pot & hidroponik). Data disusun dari sumber agronomi (lihat §Sumber). Dipakai oleh `data/plants` di app.

**Model konten (per tanaman):** `meta` + `phases[]` (rentang hari + tugas) + `recurring[]` (tugas berkala) + `photoCheckpoints[]` + `tips[]` + `problems[]`.
Engine app menghasilkan task harian dari `phases` + `recurring`.

## Ringkasan
| Tanaman | Difficulty | Panen (HST) | Media | Matahari | Pot | Jarak |
|---|---|---|---|---|---|---|
| Selada | Easy | 30–45 | Polybag/hidroponik | 4–6 jam (toleran naungan) | 20–30 cm | 20×20 cm |
| Kangkung darat | Easy | 21–30 | Polybag/hidroponik | 6+ jam | ≥20 cm | 10–15 cm |
| Bayam cabut | Easy | 20–30 | Polybag | 5–6 jam | ≥20 cm | 15–20 cm |
| Pakcoy/Sawi | Easy | 25–45 | Polybag/hidroponik | 5–6 jam | 20–25 cm | 15–20 cm |
| Bawang merah | Medium | 57–70 | Polybag/pot | 6+ jam | 20–25 cm | 10×10 cm |
| Daun bawang | Medium | 60–90 (petik daun 45+) | Polybag/pot | 5–6 jam | ≥20 cm | 10×10 cm |
| Tomat | Hard | 90–120 | Polybag 35–40 cm | 6–8 jam | 30–40 cm | 40–50 cm |
| Cabai rawit | Hard | 90–115 | Polybag 30–40 cm | 6–8 jam | 30–40 cm | 40–50 cm |

Media tanam seragam (riset §11): **tanah : kompos : arang sekam = 2 : 1 : 1**. Pastikan pot berlubang drainase.

---

## 1. Selada (Lactuca sativa)
- **Difficulty**: Easy · **Panen**: 30–45 HST · **Media**: polybag, hidroponik.
- **Matahari**: 4–6 jam (bisa sebagian naungan). **Pot**: 20–30 cm. **Jarak**: 20×20 cm.
- **pH**: 6–7. **Air**: 1–2×/hari (pagi/sore), jaga lembap tidak becek.

**Phases**
1. **Semai (hari 1–7)** — Siapkan media, tebar benih tipis, tutup tipis, jaga lembap. Task: "Siapkan media & semai benih".
2. **Pindah tanam (hari 7–14)** — Bibit 3–4 daun, pindah ke pot/polybag. Task: "Pindahkan bibit ke pot".
3. **Vegetatif (hari 14–25)** — Pupuk susulan, cek hama. Task: "Cek kelembapan & hama".
4. **Pembesaran (hari 25–35)** — Daun melebar, jaga air. Task: "Rapikan daun tua".
5. **Panen (hari 30–45)** — Panen pagi, potong pangkal. Task: "Panen selada".

**Recurring**: siram tiap hari; pupuk organik cair/NPK 1×/minggu mulai hari 14; cek hama tiap 3 hari.
**Photo**: hari 1, 7, 14, 25, 30–45 (panen).
**Tips**: jangan tanam terlalu rapat; siram pagi; hindari genangan.
**Masalah umum**: daun pahit (kurang air/panas), busuk akar (drainase buruk), kutu daun.

## 2. Kangkung darat (Ipomoea reptans)
- **Difficulty**: Easy · **Panen**: 21–30 HST · **Media**: polybag, hidroponik.
- **Matahari**: 6+ jam. **Pot**: ≥20 cm. **Jarak**: 10–15 cm.
- **Air**: 1–2×/hari; tanah selalu lembap.

**Phases**
1. **Tanam (hari 1–7)** — Tebar/ditugal benih, tutup tipis. Task: "Semai/tanam benih kangkung".
2. **Vegetatif (hari 7–20)** — Cepat tumbuh, pupuk susulan minggu 2. Task: "Cek pertumbuhan & pupuk".
3. **Panen (hari 20–30)** — Cabut atau potong, tinggi 25–30 cm. Task: "Panen kangkung".

**Recurring**: siram tiap hari (2× saat panas); pupuk urea/MPK minggu ke-2; cek hama.
**Photo**: hari 1, 7, 20, panen.
**Tips**: kangkung butuh air banyak; panen sebelum berbunga.
**Masalah umum**: batang kurus (kurang air/nutrisi), ulat.

## 3. Bayam cabut (Amaranthus)
- **Difficulty**: Easy · **Panen**: 20–30 HST · **Media**: polybag.
- **Matahari**: 5–6 jam. **Pot**: ≥20 cm. **Jarak**: 15–20 cm.
- **Air**: 1–2×/hari (pagi/sore).

**Phases**
1. **Semai (hari 1–7)** — Benih tipis, jaga lembap. Task: "Semai benih bayam".
2. **Vegetatif (hari 7–20)** — Penyiangan gulma, pupuk susulan. Task: "Siangi gulma & pupuk".
3. **Panen (hari 20–30)** — Cabut saat tinggi cukup. Task: "Panen bayam".

**Recurring**: siram 1–2×/hari; pupuk susulan 2–3 minggu (organik/NPK ringan); penyiangan hari 7–10.
**Photo**: hari 1, 7, 14, 25.
**Tips**: jangan terlalu rapat; siram pagi/sore.
**Masalah umum**: tanaman kurus, daun menguning (kurang N), kutu.

## 4. Pakcoy / Sawi (Brassica rapa)
- **Difficulty**: Easy · **Panen**: 25–45 HST (hidroponik 25–30; tanah 40–50) · **Media**: polybag, hidroponik.
- **Matahari**: 5–6 jam. **Pot**: 20–25 cm. **Jarak**: 15–20 cm.

**Phases**
1. **Semai (hari 1–10)** — Semai dalam tray/pot kecil. Task: "Semai benih pakcoy".
2. **Pindah tanam (hari 10–14)** — Bibit kuat, pindah. Task: "Pindahkan bibit".
3. **Vegetatif (hari 14–25)** — Pupuk N, jaga air. Task: "Pupuk & cek hama".
4. **Panen (hari 25–30)** — Potong pangkal. Task: "Panen pakcoy".

**Recurring**: siram 1–2×/hari; pupuk minggu 2; cek ulat/hama tiap 3 hari.
**Photo**: hari 1, 10, 20, panen.
**Tips**: pakcoy suka air cukup & sinar; panen sebelum bunga.
**Masalah umum**: ulat daun, bolting (kepanasan), daun kuning.

## 5. Bawang merah (Allium cepa var. ascalonicum)
- **Difficulty**: Medium · **Panen**: 57–70 HST · **Media**: polybag/pot.
- **Matahari**: 6+ jam. **Pot**: 20–25 cm. **Jarak**: 10×10 cm.
- **Air**: 1–2 hari sekali, jangan becek.

**Phases**
1. **Tanam umbi (hari 1–10)** — Pilih umbi sehat, potong ujung, tanam. Task: "Tanam umbi bawang".
2. **Vegetatif (hari 10–35)** — Pupuk rutin, jaga kelembapan. Task: "Pupuk & cek daun".
3. **Pembentukan umbi (hari 35–55)** — Kurangi air mendekati panen. Task: "Kurangi air, cek umbi".
4. **Panen (hari 55–70)** — Daun menguning, panen & keringkan. Task: "Panen & jemur".

**Recurring**: siram tiap 1–2 hari; pupuk 1×/minggu sampai minggu 6; cek hama thrips.
**Photo**: hari 1, 10, 30, 55.
**Tips**: media gembur; jangan berlebihan air (umbi busuk).
**Masalah umum**: umbi busuk, daun pucat, thrips.

## 6. Daun bawang (Allium fistulosum)
- **Difficulty**: Medium · **Panen**: 60–90 HST (petik daun 45+) · **Media**: polybag/pot.
- **Matahari**: 5–6 jam. **Pot**: ≥20 cm. **Jarak**: 10×10 cm.

**Phases**
1. **Tanam (hari 1–14)** — Tanam bibit/umbi, siram tiap hari. Task: "Tanam bibit daun bawang".
2. **Pertumbuhan (hari 14–45)** — Pupuk kompos minggu 4, jaga air. Task: "Pupuk & cek pertumbuhan".
3. **Pemeliharaan (hari 45–60)** — Bisa mulai petik daun luar. Task: "Petik daun luar".
4. **Panen (hari 60–90)** — Panen bertahap. Task: "Panen daun bawang".

**Recurring**: siram awal tiap hari lalu 1–2 hari; pupuk kompos minggu 4 + susulan; cek hama.
**Photo**: hari 1, 14, 30, 60.
**Tips**: bisa panen berulang kalau petik daun luar, sisakan pangkal.
**Masalah umum**: daun menguning, busuk pangkal.

## 7. Tomat (Solanum lycopersicum)
- **Difficulty**: Hard · **Panen**: 90–120 HST (dari pindah tanam ~90) · **Media**: polybag 35–40 cm.
- **Matahari**: 6–8 jam. **Pot**: 30–40 cm. **Jarak**: 40–50 cm.
- **Air**: rutin, hindari daun basah. Perlu ajir/penyangga.

**Phases**
1. **Semai (hari 1–21)** — Semai, jaga lembap & hangat. Task: "Semai benih tomat".
2. **Pindah tanam (hari 21–35)** — Bibit 4–5 daun, pindah + pasang ajir. Task: "Pindah tanam & pasang ajir".
3. **Vegetatif (hari 35–55)** — Pupuk N, pangkas tunas air bawah. Task: "Pangkas tunas & pupuk".
4. **Berbunga (hari 55–75)** — Pupuk K, bantu penyerbukan. Task: "Cek bunga & pupuk K".
5. **Berbuah (hari 75–90)** — Jaga air, cek hama buah. Task: "Cek buah & hama".
6. **Panen (hari 90–120)** — Panen 3–5 hari sekali. Task: "Panen tomat".

**Recurring**: siram rutin (pagi); pupuk tiap 2 minggu (N→K); pangkas tunas air 1×/minggu; cek hama tiap 3 hari.
**Photo**: hari 1, 21, 35, 55 (bunga), 75 (buah), 90 (panen).
**Tips**: sinar penuh; ajir sejak dini; jangan siram daun.
**Masalah umum**: busuk buah (kalsium/air tak stabil), kutu kebul, layu.

## 8. Cabai rawit (Capsicum frutescens)
- **Difficulty**: Hard · **Panen**: 90–115 HST · **Media**: polybag 30–40 cm.
- **Matahari**: 6–8 jam. **Pot**: 30–40 cm. **Jarak**: 40–50 cm.
- **Air**: rutin pagi, jangan terlalu basah.

**Phases**
1. **Semai (hari 1–21)** — Rendam benih 1–2 jam (opsional), semai. Task: "Semai benih cabai".
2. **Pindah tanam (hari 21–35)** — Bibit 4–5 daun, pindah. Task: "Pindah tanam bibit".
3. **Vegetatif (hari 35–60)** — Pupuk N, pangkas tunas samping. Task: "Pangkas & pupuk".
4. **Berbunga (hari 60–80)** — Pupuk K, jaga air. Task: "Cek bunga & pupuk K".
5. **Berbuah (hari 80–100)** — Cek hama, jaga nutrisi. Task: "Cek buah & hama".
6. **Panen (hari 100–115)** — Panen 2–3 hari sekali. Task: "Panen cabai".

**Recurring**: siram pagi rutin; pupuk tiap 2 minggu (N→K); pangkas tunas 1×/minggu; cek hama thrips/kutu kebul tiap 3 hari.
**Photo**: hari 1, 21, 35, 60, 80, 100 (panen).
**Tips**: sinar penuh; jangan overwater; panen rutin agar terus berbuah.
**Masalah umum**: rontok bunga, keriting daun (thrips), busuk akar.

---

## Difficulty mapping (untuk reward game)
- **Easy**: selada, kangkung, bayam, pakcoy → EXP +10, gold +5, −HP 5.
- **Medium**: bawang merah, daun bawang → EXP +20, gold +10, −HP 8.
- **Hard**: tomat, cabai rawit → EXP +35, gold +18, −HP 12.

## Catatan validasi
- Angka HST & jadwal = **rentang umum** dari sumber; bisa beda per varietas/iklim. Di app, tampilkan sebagai **estimasi** + `catatan varietas`.
- **Basis hitungan = dari semai** (bukan dari pindah tanam). Banyak sumber menulis HST dari pindah tanam → tambah ±10–35 hari. Detail: `cultivation-verification.md`.
- Untuk MVP web, **tanaman cepat panen** (selada/kangkung/bayam/pakcoy) jadi default tampil; medium/hard untuk pengguna lanjut.

## Sumber
- Selada: Balai Pengkajian (Unsri) — panen ~30 HST hidroponik; jurnal selada polybag.
- Kangkung: BRMP Pertanian (banten) — siram tiap hari, pupuk minggu ke-2; benihpertiwi — panen 20–35 hari.
- Bayam: panduan budidaya bayam (siram 1–2×/hari, pupuk susulan 2–3 minggu).
- Pakcoy: Kementan (tanam pakcoy polybag) — 25–30 hari.
- Bawang merah: Juknis Hortikultura (Kementan); panduan polybag.
- Daun bawang: SOP Budidaya Bawang Daun (ppid.pertanian.go.id) — 90–100 HST; DLH Buleleng.
- Tomat: BBPP Lembang (Kementan) — panen pertama ~90 hari pindah tanam.
- Cabai rawit: Panduan SOP Cabai Rawit (hortikultura.pertanian.go.id) — panen 100–115 HST.