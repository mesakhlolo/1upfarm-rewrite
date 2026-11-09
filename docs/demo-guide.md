# Demo Guide — Cara mempresentasikan & menguji 1UpFarm

> **Satu-satunya dokumen** untuk demo/testing. Semua alur, akun test, dan trik waktu ada di sini.
> Bukan untuk orang awam: ini untuk presenter / penguji yang harus menjelaskan produk sekaligus memverifikasi perilaku aplikasi.
>
> Sumber kebenaran copy & angka: `content/ui-copy.md`, `product/gameplay-design.md`, `content/plants.json`.
> Aplikasi menyimpan data di **localStorage** (`1upfarm-garden`). Semua akun & kebun hidup **hanya di browser ini** — tidak ada backend.

---

## 1 Dedikasi untuk demo (30 detik)

1. Buka `http://localhost:3000`
2. Klik `Mulai Gratis` → `/register` → daftar akun baru (atau pakai akun test §3)
3. `/onboarding` (3 slide) → `/app/plants` — pilih tanaman → `/app/garden/add` wizard 4 langkah (tanaman / media / tanggal / ringkasan) → `Mulai Rencana`
4. `/app/plan/{id}` = resep hari ke hari + bukti tumbuh (foto) + `GrowthRing` & `StageStepper`
5. `/app/tasks` = To-do harian. Centang task → +EXP/+gold. Selesai semua hari itu → streak +1, +5 HP, +10 EXP bonus
6. `/app/home` = dashboard (HP/EXP/Gold/Level/Streak, Misi hari ini, Tanaman aktif, produktivitas 7 hari)
7. `/app/quests` = quest + koleksi badge (8 badge). Panen → overlay `PANEN PERTAMA! 🎉` + badge **Panen Pertama**
8. `/app/profile` = profil, produktivitas 7/30 hari, badge. `/app/learn` = edukasi. `/app/settings` = notifikasi, ekspor/impor JSON.

Core loop (wajib disampaikan):

```
Pilih tanaman cepat panen (Kangkung ~30 hari) → dapat rencana harian (resep hari 1..N)
→ tiap hari 1–2 task kecil → milestone: foto bukti tumbuh (+HP/+EXP)
→ panen pertama → selebrasi + badge → tanaman berikutnya
```

Angka yang wajib disebutkan konsisten: reward easy `+10 EXP / +5 gold / -5 HP`, medium `+20 / +10 / -8`, hard `+35 / +18 / -12`; `EXP_NEED(L)=50×L`; HP max 100; semua task selesai → `+10 EXP / +5 gold / +5 HP`; HP ≤30 = layu lembut; HP 0 → revive ke 50.

---

## 2 Persiapan sebelum demo

```bash
npm install
npm run dev            # http://localhost:3000
```

- Mulai dari **Chrome incognito / profil baru** agar bersih. Cek `localStorage` key `1upfarm-garden` kosong untuk alur baru, atau hapus key itu & refresh untuk reset total.
- Demo di **2 viewport**: mobile 360px (bottom-nav 5 slot, tombol To-do tengah menonjol) dan desktop ≥1024px (sidebar 240px + panel stat). Tidak boleh ada error di Console.
- State awal akun baru selalu: **Lv.1, EXP 0/50, HP 100, Gold 0, Streak 0, Badge 0**.

---

## 3 Akun test — pura-pura jadi user

Buka **`/dev-seed`**: katalog akun, mesin waktu, dan tombol login 1 klik. Di `/login` juga ada tombol Masuk per akun.

Semua akun di bawah bisa login manual di form `/login` dengan password yang sama, kecuali demo. Progres terpisah per akun.

| Username | Password | Siapa | Tanaman & umur | Stats utama | Cocok untuk dipamerkan |
|----------|----------|-------|----------------|-------------|------------------------|
| `demo` | `demo123` | Demo | Selada polybag hari ke-1 | Lv.1 EXP 10/50 HP 100 Gold 0 Streak 0 badge Tunastumbuh | Demo pengunjung pertama, screenshot |
| `baru` | `test1234` | Baru | — (kebun kosong) | Lv.1 EXP 0 HP 100 | Empty state Kebunmu masih kosong, alur daftar |
| `panen` | `test1234` | Panen | Kangkung polybag **hari ke-30/30** | Lv.3 EXP 40 HP 92 Gold 75 Streak 3 foto 2 | **Panen Sekarang** → PANEN PERTAMA! + badge Panen Pertama |
| `selesai` | `test1234` | Selesai | Bayam polybag sudah harvested | Lv.4 EXP 30 HP 100 Gold 120 Streak 5 Panen 1 | Tampilan post-panen, quest & profil |
| `streak` | `test1234` | Streak | Selada hari ke-10 + Kangkung hidroponik hari ke-5 | Streak **7**, HP 88 badge Streak 7 | StreakFlame, milestone 3/7, Quest |
| `layu` | `test1234` | Layu | Bayam hari ke-15, banyak missed | HP **22**, Streak 0 | Banner layu, nada suportif, HP rendah ≤30 |
| `veteran` | `test1234` | Veteran | Tomat hari ke-35 + Selada hidroponik + Cabai Rawit | Lv.**16** EXP 120 HP 95 Gold **520** Streak 14 Gold besar | Tier Berkelanjutan, dashboard multi-tanaman, badge level |
| `sulit` | `test1234` | Sulit | Tomat + Cabai Rawit (hard) | Lv.5 HP 70 | Task hard +35 EXP/+18 gold/-12 HP, siklus panjang |
| `santai` | `test1234` | Santai | Pakcoy hidroponik hari ke-12 | Foto 1, badge Foto Pertama | Photo checkpoint & upload berikutnya |

Cara pakai: `/dev-seed` → **Masuk sebagai** → ke `/app/home`. Logout → login lagi tetap ada. **Reset**: di halaman sama klik **Reset semua akun test** → masuk lagi = seed ulang dari awal.

**Kenapa banyak akun?** Karena 1 kebun hanya bisa menampilkan 1 state dalam 1 waktu. Tanpa akun terpisah, presenter harus daftar ulang & nunggu hari demi hari för melihat empty state, streak, HP rendah, panen, dsb.

---

## 4 Mesin waktu — selesaikan 1 tanaman tanpa nunggu 30–120 hari

Panen muncul saat `currentDay >= growDaysMax`, dan `currentDay` = selisih hari antara `startedAt` dan hari ini + 1. Jadi backdate `startedAt` = lompat waktu.

| Tanaman | `growDays.max` | `startedAt` agar langsung siap panen |
|---------|----------------|----------------------------------------|
| Kangkung Darat, Bayam Cabut | 30 | hari ini − **29** |
| Selada, Pakcoy | 45 | hari ini − **44** |
| Bawang Merah | 70 | hari ini − 69 |
| Daun Bawang | 90 | hari ini − 89 |
| Cabai Rawit | 115 | hari ini − 114 |
| Tomat | 120 | hari ini − 119 |

**4 cara (pilih sesuai situasi):**

1. **1 klik (demo/presentasi):** `/dev-seed` → **Masuk sebagai `panen`** → plan Kangkung sudah hari ke-30 → klik **Panen Sekarang**.
2. **Wizard backdate (alur realistis seperti user):** daftar akun baru → `/app/garden/add` → step *Kapan mulai?* → **Pilih tanggal** → isi tanggal `hari ini − (max−1)` → **Mulai Rencana** → `/app/plan/{id}` langsung ada kartu **Siap panen!**. Paling cepat pakai Kangkung/Bayam/Pakcoy (30–45 hari), bukan Tomat/Cabai (115–120 hari).
3. **Tombol tua-kan:** masuk sebagai akun mana pun → `/dev-seed` → **Tua-kan +29 / +44 hari** (menggeser `startedAt` + semua `dateStr` task) → buka lagi `/app/plan/{id}`.
4. **Edit manual:** DevTools → Application → Local Storage → `1upfarm-garden` → ubah `gardenPlants[*].startedAt` ke tanggal lampau → refresh.

Setelah panen: cek badge **Panen Pertama** di `/app/quests` & `/app/profile`, status tanaman menjadi **Panen**, CTA **Tanam Berikutnya** → `/app/plants`.

---

## 5 Skenario lengkap A — akun baru dari registrasi (alur penuh)

Ikuti urut seperti script presentasi. Setiap poin adalah checkbox verifikasi.

### A1. Landing `/`
- [ ] Header **1UpFarm** + **Cara kerja** + **Mulai Gratis**. Hero: *Tanam di lahan sempit, panen dalam 30 hari.* + pill maskot *Pelan-pelan aja, yang penting konsisten 🌱*
- [ ] Scroll: Problem (*Kenapa banyak yang gagal mulai berkebun?* + kartu **91% / 64% / 68%**), Solusi (*1UpFarm bikin kamu tetap di jalur.* + 3 kartu), Cara kerja 3 langkah, Preview 3 tanaman (Selada, Kangkung Darat, Daun Bawang), *Dari 63 responden…*, footer *Dibuat oleh Tim Cangkul Titik Koma.*
- [ ] **Mulai Gratis** → `/register`. Coba akses `/app/home` sebelum login → redirect `/register` (sesaat **Memuat kebunmu…**).

### A2. Register `/register`
- [ ] Judul **Buat akun**, *Simpan progres kebunmu.*, **Username**, **Password**, **Daftar**, *Sudah punya akun? Masuk*.
- [ ] Password `123` → error inline **Password minimal 6 karakter.** Tidak pindah halaman.
- [ ] Daftar `tifatest/test1234` → toast **Akun dibuat. Selamat datang!** → `/onboarding`.

### A3. Onboarding `/onboarding`
- [ ] Slide 1: *Selamat datang di 1UpFarm* (1/3) → **Lanjut** → Slide 2: *Nggak perlu jago dulu* → **Lanjut** → Slide 3: *Satu tanaman, satu komitmen* → **Pilih Tanaman Pertamaku** → `/app/plants`. **Lewati** dari mana pun → `/app/home`.

### A4. Dashboard awal `/app/home` (kebun kosong)
- [ ] Sapaan **Hai, tifatest!** + maskot bubble. Stat: HP 100, EXP 0/50, Gold 0, Lv.1 Pemula, Streak 0.
- [ ] **Misi hari ini** → EmptyState **Kebunmu masih kosong** + CTA **Tambah Tanaman**.
- [ ] **Produktivitas** → grafik 7 hari (semua 0). **Tanaman aktif** → *Belum ada tanaman. Mulai dari katalog!*
- [ ] Refresh → tetap login (persist), tidak balik ke `/register`.

### A5. Katalog `/app/plants`
- [ ] **Pilih tanamanmu** + *Semua angka panen adalah estimasi dari semai.* Chip **Semua / Cepat panen / Mudah / Menantang**:
  - **Mudah** → Selada, Kangkung Darat, Bayam Cabut, Pakcoy (4)
  - **Menantang** → Tomat, Cabai Rawit (2)
  - **Cepat panen** → `growDays.max ≤ 45`
- [ ] Kartu: emoji, nama, tag difficulty, **±{max} hari**, tag media. Filter kosong → **Belum ada tanaman di filter ini.**

### A6. Detail `/app/plants/selada`
- [ ] Header Selada + *Lactuca sativa* + media. **Info tanaman**: *Perkiraan panen ±30–45 hari (estimasi dari semai)*, Matahari 4–6 jam, Pot 20–30 cm, Jarak 20×20 cm, pH 6–7.
- [ ] **Tahapan tumbuh** 5 fase (Semai 1–7, Pindah 8–14, Vegetatif 15–25, Pembesaran 26–35, Panen 30–45). Tips (3) + Masalah (Daun pahit, Busuk akar, Kutu daun).
- [ ] **Tanam ini** → `/app/garden/add?plant=selada`.

### A7. Wizard `/app/garden/add`
- [ ] Stepper 4 langkah. Step 1: klik Selada (ring ungu). Step 2: **Polybag / Pot** & **Hidroponik** (Selada dua-duanya). Tanaman yang hanya polybag (Bayam) → Hidroponik disabled.
- [ ] Step 3: **Hari ini** / **Pilih tanggal** + input date. Step 4 Ringkasan: Selada 🥬, Polybag/Pot, mulai hari ini, estimasi panen +44 hari, *±30–45 hari (estimasi dari semai)*.
- [ ] **Mulai Rencana** → toast *Rencana dimulai! Misi hari ke-1 sudah siap. Kamu dapat +10 EXP.* + *Badge baru: Tunastumbuh!* → `/app/plan/{id}`.

### A8. Plan `/app/plan/{id}`
- [ ] Header + *Mulai {tgl} • Panen {tgl estimasi}* + *Hari ke-1 dari 45* + GrowthRing 2%. StageStepper di Semai.
- [ ] **Bukti tumbuh** + tombol **Ambil / Unggah Foto** + **Nanti saja**.
- [ ] Timeline: hari 1 ada 2 task (contoh: *Siapkan media & semai benih* + *Foto bukti tumbuh — Mulai*), pill **+10 EXP** & **+5 gold** (easy).
- [ ] Upload foto → kompres ≤800px JPEG 0.7 → thumbnail + toast *Keren! +5 HP, +10 EXP.* + badge **Foto Pertama** bila pertama. **Nanti saja** → card foto hilang tanpa reward.

### A9. Dashboard setelah tambah `/app/home`
- [ ] EXP 10/50, HP 100, Gold 0, Streak 0. **Misi hari ini** = TaskCard + link **Buka To-do**. **Tanaman aktif** = 1 kartu Selada + GrowthRing. Badge Tunastumbuh terbuka (cek `/app/quests` & `/app/profile`).

### A10. To-do `/app/tasks`
- [ ] **To-do** + `{n} misi hari ini • {n} selesai`. Tab **Task / Done**, dikelompokkan per tanaman.
- [ ] Centang 1 task → toast *Selesai! +10 EXP, +5 gold.* → pindah ke **Done** (animasi framer-motion).
- [ ] Selesaikan **semua** hari ini → toast *Semua misi hari ini selesai. Streak +1 🔥* + bonus **+10 EXP / +5 gold / +5 HP**. Streak 1, HP +5 (maks 100). Centang ulang tidak double-streak.
- [ ] Centang di **Done** → kembali ke Task (*Task dikembalikan ke To-do.*), tanpa refund. Kebun kosong → *Kebunmu masih kosong* + *Belum ada task yang selesai.*

### A11. Quest & Badge `/app/quests`
- [ ] **Quest & Badge** + kartu *Streak kamu: 1 hari* + milestone chip 3/7/14/30. 5 quest Daily/Weekly/Plant + progress bar + reward. Grid 8 badge: Tunastumbuh terbuka (gradient), lain terkunci.

### A12. Belajar `/app/learn` & `/app/learn/[slug]`
- [ ] 5 kartu artikel. **Panduan Tanam Cabai Rawit** → paragraf jadwal 1–115 dari `plant-catalog.md` + footer sumber. Slug ngawur → **Halaman nggak ditemukan.**

### A13. Profil `/app/profile`
- [ ] Avatar inisial 2 huruf + **tifatest** + `@tifatest` + Lv.1 **Pemula**. HP/EXP/Gold/Streak/Rank full.
- [ ] **Produktivitas** toggle 7/30 hari + ringkasan *Total misi selesai / Foto / Panen*. **Koleksi badge** → Tunastumbuh terbuka; akun baru → *Belum ada badge. Selesaikan misi pertamamu!*

### A14. Settings `/app/settings`
- [ ] Toggle **Notifikasi pengingat** (minta `Notification.permission`, toast *Pengingat diaktifkan/dimatikan*). Bahasa Indonesia statis. **Ekspor data** → `1upfarm-data-YYYY-MM-DD.json` (*Ekspor selesai.*) **Impor** → *Impor selesai. Data pulih!* (file rusak → *File tidak bisa dibaca.*). **Keluar** → dialog *Yakin mau keluar?* → *Kamu sudah keluar. Progres tetap tersimpan di perangkat ini.*

### A15. Logout → login lagi
- [ ] Keluar → `/login`. Refresh `/app/home` → guard → `/register`. Login lagi → *Selamat datang kembali!* → progres utuh. Password salah → *Username atau password salah.* Register username sama → *Username sudah dipakai.*

### A16. 404 & a11y
- [ ] `/ngawur` & `/app/plants/ngawur` → **Halaman nggak ditemukan.** Semua tombol/ikon `aria-label`, foto `alt`, target sentuh ≥44px, fokus ring ungu (Tab).

### A17. Panen
Lihat §4. Paling cepat pakai akun `panen` (Kangkung hari ke-30) atau wizard backdate 29 hari lalu.

---

## 6 Skenario B — akun demo (jalur cepat)

`/login` → **Coba akun demo** → `/app/home`. Harus terlihat: *Hai, Demo!*, HP 100 EXP 10/50 Lv.1 Gold 0 Streak 0, **Misi hari ini** 2 task Selada (bukan empty), 1 kartu Selada hari ke-1, badge Tunastumbuh. Lanjutkan A10–A14 dengan akun demo. Logout → login manual `demo/demo123` → progres utuh. Reset: hapus `1upfarm-garden` → refresh → klik demo lagi = re-seed.

> Tips presenter: pakai `demo` untuk demo ke orang lain / screenshot — tidak perlu isi form.

## 7 Skenario C — edge case & error

- [ ] **Rollover & Layu (lembut):** tanam *kemarin*, jangan selesaikan, refresh besok → task `todo` kemarin jadi `missed`, HP turun sesuai difficulty (**-5 / -8 / -12**). HP 0 → revive ke 50 tanpa potong Level/Gold (§5). Streak bolong 1 hari → reset 0 (Streak Freeze 50 gold maks 2 menyelamatkan 1 hari).
- [ ] **Streak +1 sekali:** selesaikan semua task hari ini → streak +1. Centang ulang hari sama = tidak double.
- [ ] **Foto ganda:** upload 2× hari sama → reward hanya sekali, `photoCount` tidak naik 2×.
- [ ] **Persist:** refresh di tengah jalan → data tidak hilang (Zustand `1upfarm-garden`).
- [ ] **Guard:** `/app/quests`, `/app/profile`, `/app/settings`, `/app/learn` tanpa login → redirect `/register`.
- [ ] **Offline:** DevTools Offline → app tetap jalan. **PWA**: `/manifest.webmanifest` 200, bisa Install. **Notifikasi**: toggle → izin → copy sesuai `ui-copy §15`.

## 8 Checklist responsif & a11y

- [ ] **Mobile 360px:** bottom-nav 5 slot, To-do tengah menonjol, konten tidak tertutup (`pb-28`), tombol ≥44px.
- [ ] **Desktop ≥1024px:** sidebar 240px + panel stat, header sapaan + HP mini + streak mini.
- [ ] Kontras ≥4.5:1, stat + ikon/label (bukan warna saja), `aria-label`, `alt`, fokus ring ungu.
- [ ] Empty/Loading/Error tiap layar: EmptyState ada, loading **Memuat kebunmu…**, error *Ada yang salah. Coba lagi.*
- [ ] `/kitchen-sink`: HPBar, XPBar, GoldCounter, LevelBadge, StreakFlame, TaskCard, PlantCard, BadgeCard konsisten.

## 9 Gate developer (wajib hijau)

```bash
npm run build      # route list harus hijau, termasuk /dev-seed
npm run typecheck  # next typegen + tsc --noEmit
npm run lint       # eslint
npm run test       # vitest — gamifikasi, plant-engine, badge-evaluator, seed-accounts
```

E2E (di WSL, bukan Windows native): `sudo npx playwright install --with-deps chromium` lalu `npm run test:e2e` (smoke: register → tambah Selada → centang task → progres + guard).

## 10 Template lapor bug

```markdown
**Langkah reproduksi:** 1. 2.
**Akun:** baru / demo / panen / ...
**Viewport:** 360px / desktop
**URL:**
**Yang diharapkan:**
**Yang terjadi (screenshot/console):**
```

---

## 11 Peta layar & sumber

| Route | Keterangan |
|-------|------------|
| `/` | landing, problem/solusi, statistik 91/64/68 |
| `/register`, `/login`, `/onboarding` | auth mock lokal + guard |
| `/app/home` | dashboard stat + misi hari ini + tanaman aktif |
| `/app/plants`, `/app/plants/[slug]` | katalog 8 tanaman + detail |
| `/app/garden/add` | wizard 4 langkah |
| `/app/plan/[id]` | plan per tanaman, foto, panen |
| `/app/tasks` | To-do Task/Done |
| `/app/quests` | quest + badge |
| `/app/profile`, `/app/settings`, `/app/learn` | profil, ekspor/impor, edukasi |
| `/dev-seed` | katalog akun test + mesin waktu (dev) |

Data tanaman: 8 tanaman di `content/plants.json` (selada, kangkung, bayam, pakcoy, bawang-merah, daun-bawang, tomat, cabai-rawit). Tiap angka di atas dari dokumen sumber — jangan diubah di panduan ini; bila keputusan produk berubah, ubah dokumen sumber (`product/`, `content/`) dulu baru sinkronkan ke sini.

Selamat demo. Kalau ada yang beda dari *Yang harus kamu lihat*, catat pakai template §10.
