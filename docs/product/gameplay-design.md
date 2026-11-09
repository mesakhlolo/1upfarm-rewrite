# Gameplay & Gamifikasi — 1UpFarm (v2, MVP)

Prinsip v2: **gamifikasi melayani hasil nyata (tanaman hidup → panen), bukan jadi tujuan.** Konten = resep perawatan harian. Alat = streak/HP/EXP ringan. Lihat `product-strategy.md`.

## 1. Core loop
```
Pilih tanaman cepat panen (30 hari)
   → dapat RENCANA HARIAN (resep hari 1..N)
      → tiap hari: 1–2 task kecil (+reminder)
         → milestone: FOTO BUKTI TUMBUH
            → +EXP/+gold, streak, HP aman
               → PANEN PERTAMA (selebrasi + badge)
                  → tanaman berikutnya (kesulitan naik)
```
Kegagalan: lewat task → −HP ringan. HP rendah = tanaman terancam. HP 0 = "Layu" (nada suportif, bukan hukuman kasar).

## 2. Stats (sederhana di MVP)
| Stat | Rentang | Fungsi |
|---|---|---|
| **Streak** | ≥0 hari | Konsistensi harian. Penguat utama (Duolingo). |
| **HP** | 0–100 | Menggambarkan kesehatan tanaman. Turun kalau lupa rawat. |
| **EXP** | 0–need(L) | Progress level. |
| **Level** | 1–∞ | Tier: Pemula (1–9), Berkelanjutan (10–24), Professional (25+). |
| **Gold** | ≥0 | Ringan di MVP (bisa ditunda); untuk item fase lanjut. |

> MVP fokus **streak + HP + badge**. Gold/ekonomi penuh **ditunda** sampai retensi terbukti.

## 3. Reward task (ringan)
| Difficulty | EXP | Gold | −HP kalau dilewat |
|---|---|---|---|
| Easy (selada, kangkung) | +10 | +5 | −5 |
| Medium (tomat, daun bawang) | +20 | +10 | −8 |
| Hard (cabai) | +35 | +18 | −12 |

Task harian cukup **1–2 per tanaman** (riset: 64% kurang waktu → jangan membebani).

## 4. Level & EXP
- `need(L) = 50 × L` (L1=50, L2=100, …).
- Naik level → animasi + tier update (+badge kalau menembus tier).
- Overflow EXP dibawa.

## 5. HP & "Layu" (Habitica-inspired, tapi lembut)
- Mulai 100 HP. Task lewat → −HP sesuai difficulty.
- Semua task hari itu selesai → **+5 HP** (maks 100).
- **HP 0 → "Layu"**: tampilkan layar suportif ("tanaman butuh kamu"), **tanpa** menjatuhkan level/gold secara brutal di MVP. (Opsi punishment berat = fase lanjut setelah validasi.)
- Foto milestone yang terisi → **+HP** (bukti tanaman dirawat) — mengikat game ke dunia nyata.

## 6. Streak (penguat utama)
- +1 jika semua task hari itu selesai.
- Bolong 1 hari → reset, kecuali **Streak Freeze** (50 gold, maks 2) — opsional di MVP.
- Milestone (3/7/14/30) → badge + selebrasi.

## 7. Photo checkpoint (differentiator)
- Muncul di milestone (mis. hari 1 tanam, hari 7 tunas, hari 14 daun, hari 25 panen).
- User upload/foto (kamera atau file).
- Efek: +EXP/+gold/**+HP**, jadi **bukti nyata** bahwa tanaman tumbuh → accountability + ikatan emosional.
- Progress tanaman di app = **foto terakhir** (bukan angka abstrak).

## 8. Guided plan (konten inti)
- Tiap tanaman punya `plan` hari 1..N: judul, deskripsi singkat, 1–2 task.
- Contoh selada (ringkas): hari 1 siapkan media, hari 2 tanam, hari 3–6 cek kelembapan, hari 7 foto tunas, … hari 25–30 panen.
- Sumber konten: riset §11 (cabai rawit hidroponik, siklus penyiraman, media 2:1:1) + sumber tani tepercaya.

## 9. Badge (secukupnya)
| Badge | Kriteria |
|---|---|
| Tunastumbuh | Menambah tanaman pertama |
| Foto Pertama | Isi photo checkpoint pertama |
| Streak 7 | 7 hari berturut |
| Green Thumb | 50 task selesai |
| **Panen Pertama** | Menyelesaikan 1 siklus tanaman |
| Pemula / Berkelanjutan / Professional | Capai Level 5 / 15 / 30 |

## 10. Sistem = Habitica; ekonomi di-fase; TANPA leaderboard
Keputusan: karena 1UpFarm = **produktivitas mandiri**, sistem progresi mengikuti **Habitica** (solo, self-paced), bukan leaderboard/league Duolingo. Duolingo hanya dipakai untuk **cara menyajikan** panduan (path harian + streak).

- **Tidak ada leaderboard/league** (kompetisi tidak adil & demotivasi pemula). Sosial nanti = kooperatif (party/garden buddy), bukan ranking.
- Ekonomi Habitica (gold, shop, quest, avatar) adalah **arah sistem**, tapi **disajikan bertahap**:
  - **MVP**: HP, EXP, Level, Streak, Badge ringan.
  - **Fase 2**: gold + shop (Streak Freeze, HP potion, XP boost) + quest harian/mingguan.
  - **Fase 3**: kustomisasi avatar + party/co-op.
- Jangan bangun ekonomi penuh sebelum retensi inti (panen pertama) terbukti.

## 11. Umpan balik & feel
- Animasi +EXP saat centang; confetti level up; maskot reaktif (senang/khawatir).
- Copy hangat ("tanamanmu butuh kamu hari ini"), bukan menyalahkan.
- Foto progres tampil sebagai "kebun nyata" di dashboard.

## 12. Konstanta awal (tuning)
```
HP_MAX = 100      HP_REGEN_DAILY = 5      HP_FROM_PHOTO = +5
STREAK_FREEZE_COST = 50   STREAK_FREEZE_MAX = 2
EXP_NEED(L) = 50 * L
ALL_TASKS_DONE = { exp: 10, gold: 5, hp: +5 }
```

## 13. Contoh sesi
1. Zakky pilih **Selada (easy)**, media polybag, mulai hari ini → task hari 1.
2. Hari 1: "Siapkan pot & media" → centang (+10 EXP, +5 gold) + foto awal (+5 HP).
3. Hari 3 (lupa) → −5 HP (95). Reminder besok.
4. Hari 7: foto tunas → +EXP, streak 7 → badge **Streak 7**.
5. Hari 30: panen → layar selebrasi → badge **Panen Pertama** → pilih tanaman berikutnya (kesulitan naik).