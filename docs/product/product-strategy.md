# Product Strategy — 1UpFarm

Tujuan dokumen: menjawab **"1UpFarm itu untuk apa?"** dengan jelas, lalu menurunkan keputusan scope. Sumber riset: [`../research/raw-context-figma-canva.md`](../research/raw-context-figma-canva.md).

## 1. Kenapa lo bingung menjelaskan 1UpFarm
Karena riset mencampur **3 hal** jadi satu tanpa memilih mana yang jadi **produk inti**:
1. **Edukasi** (panduan menanam) — ini *konten*.
2. **Habit/consistency** (ingat merawat) — ini *masalah yang diselesaikan*.
3. **Gamifikasi** (XP, HP, gold, badge) — ini *alat retensi*, bukan produk.

Duolingo jelas karena: **konten = pelajaran bahasa, alat = gamifikasi, hasil = bisa bahasa.**
Habitica jelas karena: **konten = kebiasaan lo sendiri, alat = RPG, hasil = produktivitas.**
1UpFarm gagal jelas karena belum menyebut **hasil nyatanya**.

## 2. Jawaban: 1UpFarm itu apa
> **1UpFarm = "Duolingo untuk menanam makanan sendiri di lahan sempit."**
> Aplikasi pendamping yang mengubah perawatan tanaman **nyata** jadi **misi harian yang dipandu + seru**, sampai kamu **panen pertama**.

**Fungsi intinya:** menghilangkan kebingungan pemula + menjaga konsistensi, sampai ada **hasil nyata (tanaman hidup → panen)**.

Bukan habit tracker umum. Bukan ensiklopedia tani. Bukan game tanpa hasil.

## 3. Perbandingan langsung (biar nggak kabur)
| | Duolingo | Habitica | **1UpFarm** |
|---|---|---|---|
| Konten | Pelajaran bahasa | Kebiasaan buatan user | **Resep harian merawat tanaman nyata** |
| Aksi harian | Latihan | Task/habit | **Rawat tanaman (siram, cek, foto)** |
| Alat | XP, streak, league | RPG, HP, gold, quest | **XP, HP (mirror kesehatan tanaman), streak, badge** |
| Hasil nyata | Bisa bahasa | Produktivitas | **Tanaman hidup & panen** |
| Siapa yang menentukan tugas | Duolingo | User sendiri | **Aplikasi (berdasar tanaman yang dipilih)** |

Kunci pembeda: **user TIDAK mengarang task** (beda dari Habitica). Aplikasi yang **meresepkan** langkah harian (sama seperti Duolingo meresepkan pelajaran). Ini yang menghapus "bingung mulai".

## 4. Satu kalimat positioning
**Untuk pemula 18–30 di kota yang pengen nanam tapi gampang bingung & lupa, 1UpFarm memandu mereka menanam 1 sayur cepat panen sampai berhasil, dengan mengubah perawatan jadi misi harian bergaya game — beda dari aplikasi tani yang cuma baca-baca, dan beda dari habit tracker yang nggak tahu soal tanaman.**

## 5. Differentiator (yang bikin nggak jadi klon)
Ranking prioritas:
1. **Resep harian preskriptif** — app tahu "hari ke-7 cabai harus apa". User tinggal ikut. → **hilangkan kebingungan**.
2. **Foto bukti tumbuh (photo checkpoint)** — tiap milestone, foto tanaman. → **accountability + ikatan emosional + anti-bohong**. Ini "aha" yang bikin beda.
3. **Hasil nyata = panen** — reward terbesar bukan XP, tapi **makan hasil kebun sendiri**.
4. **HP = kesehatan tanaman** — angka di app merefleksikan tanaman nyata (via foto/checklist), bukan abstraksi.

## 6. Core loop (yang harus bikin nagih)
```
Pilih tanaman cepat panen (selada/kangkung ~30 hari)
      │
      ▼
Dapat rencana harian (resep hari 1..30)  ← konten = Duolingo
      │
      ▼
Tiap hari: buka app → 1–2 task kecil → (di milestone) foto bukti
      │                                   │
      ▼                                   ▼
+EXP/+gold, streak naik          tanaman nyata tumbuh (foto)
      │
      ▼
Panen pertama → selebrasi + badge + (opsional) share
      │
      ▼
Pilih tanaman berikutnya (kesulitan naik)
```

## 7. Kenapa orang akan bosan / berhenti (hipotesis)
Ini yang harus dijawab produk, bukan diabaikan:
- **H1 — Bingung mulai** → solusi: resep harian preskriptif.
- **H2 — Lupa / males** → solusi: task kecil + reminder + streak ringan.
- **H3 — Nggak kelihatan hasilnya** → solusi: foto progres + tanaman cepat panen (30 hari) + preview panen.
- **H4 — Tanaman mati → merasa gagal → quit** → solusi: nada suportif, mekanik "revive", tanaman cadangan, jangan hukum kasar.
- **H5 — Cuma penasaran, bukan komitmen** → solusi: onboarding yang menyaring niat + "komitmen 1 tanaman".

## 8. Peran gamifikasi (subordinat, bukan tujuan)
- Gamifikasi **melayani** loop di atas: bikin konsistensi terasa enak.
- Yang dipakai di MVP: **streak ringan, HP sederhana, 1 badge per milestone, selebrasi**.
- **Ditunda**: ekonomi gold penuh, shop, leaderboard/league, kustomisasi avatar.
  (Duolingo menang karena *kontennya*; league cuma bumbu. Jangan bumbu duluan.)

## 9. Sistem: ikuti Habitica, bukan Duolingo
**Keputusan: TIDAK ada leaderboard di MVP.** 1UpFarm = **produktivitas mandiri** (tanaman lo sendiri), jadi model progresi paling pas = **Habitica**, bukan Duolingo.

Alasan:
- Tanaman tiap orang beda (jenis, kesulitan, kecepatan tumbuh) → **perbandingan tidak adil**.
- Gardening itu personal/reflektif; kompetisi global bisa **demotivasi pemula** (ngebandingin sama yang jago).
- North Star = **panen pertama**, bukan "ngalahin orang". Leaderboard menggeser fokus ke angka.

**Pembagian peran yang benar:**
| Elemen | Ambil dari | Dipakai untuk |
|---|---|---|
| Progresi & ekonomi (HP, EXP, level, gold, badge, quest, avatar) | **Habitica** | Sistem inti — solo, self-paced |
| Struktur panduan (path harian, streak, daily goal) | **Duolingo** | Cara menyajikan resep perawatan |
| Leaderboard / league / kompetisi global | **Tidak dipakai (MVP)** | — |

Jadi: **sistem = Habitica**, **penyajian panduan = Duolingo**, **kompetisi = tidak**.

**Sosial (fase lanjut, opsional)**: kalau nanti butuh, pakai model **kooperatif** khas Habitica (party/quest bareng) atau "garden buddy" + share panen — **bukan leaderboard ranking**.

## 10. Keputusan scope MVP (brutal)
**Persona tunggal**: pemula 18–30, kota, balkon/pot, gampang lupa.
**Tanaman**: **selada + kangkung** (cepat ~30 hari = "menang pertama"). Cabai menyusul.
**Fitur inti**:
- Onboarding → pilih 1 tanaman → guided 30-day plan.
- Daily task (1–2/hari) + reminder.
- Photo checkpoint di milestone.
- Streak + HP ringan + badge milestone.
- Panen pertama = selebrasi + badge + ajakan tanaman berikutnya.
**Bukan MVP**: shop, gold economy penuh, quest rumit, kustomisasi avatar, leaderboard, multi-tanaman kompleks, backend.

## 11. Metrik keberhasilan
- **North Star**: % user baru yang mencapai **panen pertama** (proxy: mencapai hari ke-25 plan).
- **Leading**: D1/D7 retention, % foto checkpoint terisi, streak ≥ 3 hari.
- **Drop-off**: hari ke berapa user berhenti (target: pahami & perbaiki hari 3–7).

## 12. Validasi sebelum heavy build
Riset lama hanya mengukur *"tertarik?"* (bias). Perlu bukti perilaku:
- **Diary study 14 hari**, ~10 orang, panduan via WA/PDF. Ukur: hari berapa berhenti, apakah mau foto tiap milestone, keluhan.
- Prototype klik (Figma/HTML) untuk 2 layar inti: daily task + foto checkpoint.
- Jika drop-off di hari 3–5 → fix onboarding/reminder/task-size sebelum lanjut.

## 13. Rekomendasi akhir (one-liner buat tim)
> "Kita bukan bikin habit tracker, bukan bikin ensiklopedia tani, bukan bikin game.
> Kita bikin **pendamping menanam yang memastikan pemula sampai panen pertama** — dan gamifikasi cuma cara bikin mereka balik tiap hari."