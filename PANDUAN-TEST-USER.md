# Panduan Test 1UpFarm — dari sudut User

> File ini adalah **alur manual test dari awal sampai akhir**, seolah-olah kamu adalah user baru. Ikuti urutannya, checklist di tiap langkah, dan lihat apakah hasilnya sesuai “Yang harus kamu lihat”.
>
> Semua copy di bawah diambil dari `docs/content/ui-copy.md`, angka dari `docs/product/gameplay-design.md` + `docs/content/plants.json`.
> Aplikasi menyimpan data di **localStorage** (`1upfarm-garden`). Semua akun & kebun tersimpan **hanya di browser ini**.

---

## Daftar isi

- [0. Persiapan sebelum test](#0-persiapan-sebelum-test)
- [1. Akun demo](#1-akun-demo)
- [2. Skenario A — Akun baru dari registrasi (alur penuh)](#2-skenario-a--akun-baru-dari-registrasi-alur-penuh)
- [3. Skenario B — Akun demo (jalur cepat)](#3-skenario-b--akun-demo-jalur-cepat)
- [4. Skenario C — Edge case & error](#4-skenario-c--edge-case--error)
- [5. Checklist responsif & a11y](#5-checklist-responsif--a11y)
- [6. Gate developer (opsional tapi wajib hijau)](#6-gate-developer-opsional-tapi-wajib-hijau)
- [7. Template lapor bug](#7-template-lapor-bug)

---

## 0. Persiapan sebelum test

1. Jalankan aplikasi lokal:

   ```bash
   npm install
   npm run dev
   ```
   Buka **http://localhost:3000**

2. Gunakan **Chrome incognito / profil baru** agar bersih dari data lama.
   - Cek `localStorage`: key `1upfarm-garden` harus kosong di awal Skenario A.
   - Kalau mau reset total: DevTools → Application → Local Storage → hapus `1upfarm-garden` → refresh.

3. Test di **dua viewport**:
   - **Mobile 360px** (Device Toolbar) → harus ada bottom-nav 5 slot, tombol To-do di tengah menonjol.
   - **Desktop ≥1024px** → harus ada sidebar kiri 240px + panel stat HP/EXP/Gold/Level/Streak.
   - Pastikan **tidak ada error di Console** selama test.

4. Data awal untuk user baru selalu:
   - Level 1, EXP 0/50, HP 100/100, Gold 0, Streak 0, Badge 0.

---

## 1. Akun demo

**Pertanyaan: apakah ada akun demo?**

- **Sebelumnya tidak ada.** Sekarang sudah dibuatkan akun demo khusus untuk test cepat.
- kredensialnya:

  | Item | Nilai |
  |---|---|
  | **Username** | `demo` |
  | **Password** | `demo123` |
  | **Cara masuk** | Di `/login` klik **Coba akun demo** — otomatis buat akunnya, langsung masuk `/app/home` |
  | **Isi awal** | 1 tanaman **Selada 🥬** (Polybag/Pot, mulai hari ini) + badge **Tunastumbuh** + **+10 EXP** (Level 1, EXP 10/50) |

- Akun demo **dibuat otomatis sekali saja** lalu tersimpan di `localStorage`. Klik **Coba akun demo** berikutnya langsung login tanpa buat baru.
- Logout → login lagi tetap bisa pakai `demo` / `demo123` manual di form, atau klik tombol demo lagi.
- Kalau habis bersih-bersih `localStorage`, klik tombol demo akan mere-seed dari awal.

> Catatan: akun demo dan akun hasil registrasi hidup bersama di perangkat yang sama. Progresnya terpisah per akun.

---

## 2. Skenario A — Akun baru dari registrasi (alur penuh)

Ikuti ini dari landing sampai panen. Setiap langkah ada checkbox.

### A1. Landing `/`

- [ ] Buka `/` → header **1UpFarm** + tombol **Cara kerja** + tombol **Mulai Gratis**.
- [ ] Hero: **“Tanam di lahan sempit, panen dalam 30 hari.”** + sub copy + pill maskot **“Pelan-pelan aja, yang penting konsisten 🌱”**.
- [ ] Klik **Mulai Gratis** (header atau hero) → harus ke `/register`.
- [ ] Scroll ke bawah, pastikan ada:
  - Problem: **“Kenapa banyak yang gagal mulai berkebun?”** + kartu **91% / 64% / 68%**.
  - Solusi: **“1UpFarm bikin kamu tetap di jalur.”** + 3 kartu (Resep harian / Foto bukti tumbuh / Reward).
  - Cara kerja 3 langkah: **Pilih tanaman → Ikuti misi harian → Panen pertama**.
  - Preview 3 tanaman (Selada, Kangkung Darat, Daun Bawang) pakai `PlantCard`.
  - Bukti: **“Dari 63 responden: 91% termotivasi oleh hadiah virtual, 68% minta pengingat otomatis.”** + footer **“Dibuat oleh Tim Cangkul Titik Koma.”**
- [ ] Klik **Lihat cara kerjanya** → harus scroll ke section `#cara-kerja`.
- [ ] Coba akses langsung `/app/home` **sebelum login** → harus redirect ke `/register` (guard, ada teks **Memuat kebunmu…** sesaat).

### A2. Register `/register`

- [ ] Judul **Buat akun**, sub **Simpan progres kebunmu.** Field **Username** + **Password** + tombol **Daftar**. Link **Sudah punya akun? Masuk**.
- [ ] Test error password pendek: isi password `123` → error inline **Password minimal 6 karakter.** Tidak pindah halaman.
- [ ] Isi akun baru, contoh `tifatest` / `test1234` → klik **Daftar** → toast **Akun dibuat. Selamat datang!** → otomatis ke `/onboarding`.

### A3. Onboarding `/onboarding`

- [ ] Slide 1: **Selamat datang di 1UpFarm** — *Teman berkebun yang bikin kamu konsisten.* Dot progress 1/3. Tombol **Lanjut** + **Lewati**.
- [ ] Klik **Lanjut** → Slide 2: **Nggak perlu jago dulu** — *Panduan langkah demi langkah buat pemula total.*
- [ ] Klik **Lanjut** → Slide 3: **Satu tanaman, satu komitmen** — *Kita mulai dari yang paling gampang dan cepat panen.* Tombol terakhir **Pilih Tanaman Pertamaku** + **Lewati**.
- [ ] Klik **Pilih Tanaman Pertamaku** → ke `/app/plants`. (Kalau klik **Lewati** dari slide mana pun → ke `/app/home`).

### A4. Dashboard awal `/app/home` (kebun kosong)

- [ ] Sapaan **Hai, tifatest!** + maskot bubble (salah satu dari rotasi `ui-copy §17`).
- [ ] Stat row: HP 100/100, EXP 0/50, Gold 0, Level Lv. 1 (tier Pemula), Streak 0.
- [ ] Section **Misi hari ini** → **EmptyState**: **Kebunmu masih kosong** — *Pilih tanaman pertamamu dan mulai hari ini.* CTA **Tambah Tanaman**.
- [ ] Section **Produktivitas** → grafik Recharts 7 hari (semua 0).
- [ ] Section **Tanaman aktif** → teks **Belum ada tanaman. Mulai dari katalog!**
- [ ] Refresh halaman → tetap login (persist), tidak balik ke `/register`.

### A5. Katalog `/app/plants`

- [ ] Judul **Pilih tanamanmu** + sub *Semua angka panen adalah estimasi dari semai.*
- [ ] Chip filter: **Semua** / **Cepat panen** / **Mudah** / **Menantang**. Klik tiap chip, grid berubah:
  - **Mudah** → Selada, Kangkung Darat, Bayam Cabut, Pakcoy (4)
  - **Menantang** → Tomat, Cabai Rawit (2)
  - **Cepat panen** → yang `growDays.max ≤ 45`
- [ ] Setiap kartu: emoji, nama, tag difficulty (Mudah/Sedang/Menantang), **±{hari} hari**, tag media (Polybag/Pot / Hidroponik).
- [ ] Coba filter yang menghasilkan kosong (jika ada) → **Belum ada tanaman di filter ini.**

### A6. Detail tanaman `/app/plants/selada`

- [ ] Header emoji + **Selada** + *Lactuca sativa* + tag media.
- [ ] Card **Info tanaman**: **Perkiraan panen ±30–45 hari (estimasi dari semai)**, Matahari *4–6 jam*, Ukuran pot *20–30 cm*, Jarak tanam *20×20 cm*, pH *6–7* + catatan *Bisa beda tergantung varietas, dataran, dan media.*
- [ ] **Tahapan tumbuh** → `StageStepper` 5 fase (Semai hari 1–7, Pindah tanam 8–14, Vegetatif 15–25, Pembesaran 26–35, Panen 30–45).
- [ ] **Tips penting** (3 tips Selada) + **Kalau bermasalah** (Daun pahit, Busuk akar, Kutu daun).
- [ ] Klik **Tanam ini** → ke `/app/garden/add?plant=selada` (tanaman sudah terpreselect).

### A7. Wizard tambah tanaman `/app/garden/add`

- [ ] Judul **Tambah tanaman** + stepper 4 langkah: **Pilih tanaman / Pilih media tanam / Kapan mulai? / Ringkasan**.
- [ ] Step 1 Pilih tanaman: klik **Selada** (ring ungu muncul). Tombol **Lanjut**.
- [ ] Step 2 **Pilih media tanam**: opsi **Polybag / Pot** & **Hidroponik** (Selada mendukung keduanya). Pilih **Polybag / Pot** → **Lanjut**.
  - Coba ganti ke tanaman yang hanya polybag (mis. Bayam) → Hidroponik harus disabled + label *(tidak tersedia)*.
- [ ] Step 3 **Kapan mulai?**: radio **Hari ini (tanggal hari ini)** / **Pilih tanggal** + input `date`. Catatan **Kami akan perkirakan tanggal panen.** Pilih **Hari ini** → **Lanjut**.
- [ ] Step 4 **Ringkasan**: Tanaman Selada 🥬, Media Polybag/Pot, Mulai hari ini, Estimasi panen (hari ini + 44 hari karena Selada max 45), Perkiraan **±30–45 hari (estimasi dari semai)**.
- [ ] Klik **Mulai Rencana** → toast **Rencana dimulai! Misi hari ke-1 sudah siap. Kamu dapat +10 EXP.** + toast **Badge baru: Tunastumbuh!** → otomatis ke `/app/plan/{id}`.

### A8. Halaman Plan `/app/plan/{id}`

- [ ] Header Selada + media + **Mulai {tanggal} • Panen {tanggal estimasi}** + **Hari ke-1 dari 45** + `GrowthRing` 2%.
- [ ] `StageStepper` aktif di fase Semai.
- [ ] **Bukti tumbuh** → card **Bukti tumbuh** — *Foto tanamanmu di tahap ini.* + tombol **Ambil / Unggah Foto** + **Nanti saja**.
- [ ] **Rencana hari ke hari** → timeline per tanggal, hari 1 ada 2 task (contoh: *Siapkan media & semai benih* + *Foto bukti tumbuh — Mulai*), tiap task ada pill **+10 EXP** & **+5 gold** karena easy.
- [ ] Coba upload foto: pilih file image → kompres ≤800px JPEG 0.7 → thumbnail muncul + toast **Keren! +5 HP, +10 EXP.** + badge **Foto Pertama** bila pertama kali. HP naik (maks 100). Tombol **Nanti saja** → card foto hilang tanpa reward.

### A9. Dashboard setelah tambah `/app/home`

- [ ] Sapaan tetap **Hai, tifatest!**
- [ ] Stat berubah: **EXP 10/50** (dari mulai rencana), **HP 100** (atau 105→tercap 100 bila habis foto), Gold 0, Streak 0, Level Lv. 1.
- [ ] **Misi hari ini** → sekarang tampil TaskCard hari ini (contoh 2 task Selada) + link **Buka To-do**.
- [ ] **Tanaman aktif** → 1 kartu Selada + `GrowthRing` + foto terakhir (atau emoji bila belum foto).
- [ ] Badge Tunastumbuh sudah terbuka (cek di `/app/quests` & `/app/profile`).

### A10. To-do `/app/tasks`

- [ ] Judul **To-do** + sub *{n} misi hari ini • {n} selesai*.
- [ ] Tab **Task / Done**. Di tab **Task**, task dikelompokkan per tanaman (label **Selada**).
- [ ] Klik bulat centang pada task pertama → toast **Selesai! +10 EXP, +5 gold.** Task pindah ke **Done**, animasi `framer-motion` muncul. EXP/Gold di header/sidebar naik.
- [ ] Selesaikan **semua** task hari ini → toast tambahan **Semua misi hari ini selesai. Streak +1 🔥** + banner di halaman + bonus **+10 EXP / +5 gold / +5 HP** (total hari itu, hitung ulang di dashboard). Streak menjadi **1**, HP regen +5 (maks 100).
- [ ] Pindah ke tab **Done** → task selesai muncul di sana. Klik centang lagi di Done → kembali ke **Task** (toast **Task dikembalikan ke To-do.**), tanpa refund EXP/gold.
- [ ] Coba buka `/app/tasks` saat kebun kosong (pakai akun baru lain) → **Kebunmu masih kosong** + CTA **Tambah Tanaman**. Di tab Done → **Belum ada task yang selesai.**

### A11. Quest & Badge `/app/quests`

- [ ] Judul **Quest & Badge** + kartu **Streak kamu: 1 hari** + milestone chip **3 / 7 / 14 / 30 hari** (belum tercapai = abu).
- [ ] Daftar Quest Daily/Weekly/Plant (5 quest) + progress bar + reward (+EXP/+gold/+HP). Contoh: *Selesaikan semua task hari ini* harusnya 100% setelah A10. *Streak 7 hari* masih rendah.
- [ ] Section **Koleksi badge** → grid 8 badge: Tunastumbuh terbuka (gradient), lainnya terkunci (abu).

### A12. Belajar `/app/learn` & `/app/learn/[slug]`

- [ ] Judul **Belajar** + 5 kartu artikel (cabai rawit mingguan, hidroponik vs polybag 2:1:1, polybag umum, selada, FAQ).
- [ ] Klik **Panduan Tanam Cabai Rawit** → judul + paragraf jadwal 1–115 dari `plant-catalog.md` + footer **Sumber: docs/content/plant-catalog.md §8 · docs/content/plants.json (cabai-rawit)**. Font ≥16px, tombol **Kembali ke Belajar**.
- [ ] Buka slug ngawur `/app/learn/ngawur` → **Halaman nggak ditemukan.** + tombol kembali.

### A13. Profil `/app/profile`

- [ ] Judul **Profil** + avatar inisial (2 huruf) + **tifatest** + `@tifatest` + `LevelBadge` Lv. 1 tier **Pemula**.
- [ ] Stat full: HP, EXP, Gold, Streak, Rank (tier).
- [ ] Section **Produktivitas** → toggle **7 hari terakhir / 30 hari terakhir** + `ProductivityChart` + ringkasan *Total misi selesai: {n} • Foto: {n} • Panen: {n}*..
- [ ] Section **Koleksi badge** → **Tunastumbuh** terbuka. Kalau akun baru belum ada badge sama sekali → **Belum ada badge. Selesaikan misi pertamamu!**
- [ ] Tombol **Lihat Quest** → ke `/app/quests`.

### A14. Settings `/app/settings`

- [ ] Judul **Pengaturan** + card:
  - Toggle **Notifikasi pengingat** → kalau dimatikan/dinyalakan harus minta `Notification.permission` (best-effort). Ada toast **Pengingat diaktifkan.** / **Pengingat dimatikan.** / error bila ditolak.
  - **Bahasa: Indonesia** (statis MVP).
  - **Ekspor data** → download `1upfarm-data-YYYY-MM-DD.json`, toast **Ekspor selesai.**
  - **Impor data** → pilih file JSON hasil ekspor → toast **Impor selesai. Data pulih!** (kalau file rusak → **File tidak bisa dibaca.**)
  - Catatan privasi foto muncul di halaman.
  - Tombol **Keluar** → dialog **Yakin mau keluar?** / *Progres kebunmu tetap tersimpan di perangkat ini.* → Batal / Keluar.

### A15. Logout → login lagi

- [ ] Di dialog klik **Keluar** → toast **Kamu sudah keluar. Progres tetap tersimpan di perangkat ini.** → ke `/login`.
- [ ] Refresh `/app/home` → guard → ke `/register` lagi.
- [ ] Login lagi pakai `tifatest` / `test1234` → toast **Selamat datang kembali!** → `/app/home` dengan **progres tetap utuh** (tanaman, EXP, badge, streak).
- [ ] Coba login password salah → error inline **Username atau password salah.** Tidak pindah.
- [ ] Coba register username yang sama → **Username sudah dipakai.**

### A16. Flow 404 & error

- [ ] Buka `/ngawur` → **Halaman nggak ditemukan.** + **Kembali ke Beranda**.
- [ ] Buka `/app/plants/ngawur` → halaman detail harus menampilkan **Halaman nggak ditemukan.** (bukan crash).
- [ ] Di semua layar, tombol/ikon punya `aria-label`, foto punya `alt`, target sentuh ≥44px, fokus keyboard terlihat (ring ungu iri). Cek dengan Tab.

### A17. Panen (opsional, butuh tunggu / manipulasi tanggal)

> Panen muncul saat `currentDay >= growDays.max`. Karena Selada 45 hari, cara cepat test:
>
> 1. Tambah Selada dengan tanggal mulai **45 hari lalu** via wizard step “Pilih tanggal” → `startedAt` = hari ini −44.
> 2. Buka `/app/plan/{id}` → akan ada card **Siap panen!** + tombol **Panen Sekarang**.
> 3. Klik **Panen Sekarang** → overlay **PANEN PERTAMA! 🎉** + *Kamu berhasil menanam sampai panen. Luar biasa!* + CTA **Tanam Berikutnya** → ke `/app/plants`. Toast **Badge baru: Panen Pertama!** muncul. Status tanaman jadi **Panen**.
> 4. Di `/app/quests` badge **Panen Pertama** harus terbuka.

---

## 3. Skenario B — Akun demo (jalur cepat)

Pakai ini kalau mau langsung test tanpa isi wizard.

1. [ ] Buka `/login` → di bawah form ada box **Akun demo: demo / demo123** + tombol **Coba akun demo**.
2. [ ] Klik **Coba akun demo** → toast **Selamat datang kembali!** → `/app/home`.
3. [ ] Yang harus kamu lihat pertama kali:
   - Sapaan **Hai, Demo!**
   - Stat: **HP 100, EXP 10/50, Level Lv. 1, Gold 0, Streak 0**
   - **Misi hari ini** langsung ada 2 task Selada (bukan empty).
   - **Tanaman aktif** → 1 kartu Selada hari ke-1.
   - Badge **Tunastumbuh** sudah terbuka.
4. [ ] Lanjutkan dari **A10 (To-do)** ke **A14 (Settings)** dengan akun demo. Semua badge, streak, foto berfungsi sama.
5. [ ] Coba logout → `/login` → isi manual `demo` / `demo123` → Masuk → tetap masuk sebagai Demo dengan progres utuh.
6. [ ] Reset demo: DevTools → Application → Local Storage → hapus `1upfarm-garden` → refresh → `/login` → klik demo lagi → akan re-seed Selada baru dari awal.

> Tips: akun demo cocok untuk demo ke orang lain atau screenshot, karena tidak perlu isi form.

---

## 4. Skenario C — Edge case & error

- [ ] **Rollover harian & Layu (lembut):**
  - Tambah tanaman dengan tanggal mulai **kemarin**, jangan selesaikan task hari ini, refresh besok (atau ubah tanggal sistem). Task `todo` kemarin harus jadi `missed`, HP turun sesuai difficulty (**easy −5, medium −8, hard −12** per task terlewat).
  - HP 0 → HP revive ke **50** tanpa potong Level/Gold (sesuai `gameplay-design.md §5`). UI harus suportif, bukan error.
  - Streak bolong 1 hari → reset ke 0. Streak Freeze (50 gold, maks 2) bila ada akan menyelamatkan 1 hari.
- [ ] **Semua task selesai → streak +1:** selesaikan semua task hari ini sekali saja, streak naik 1. Centang ulang di hari yang sama tidak double-increment.
- [ ] **Photo checkpoint ganda:** upload foto hari yang sama 2x → reward hanya sekali. Foto diganti, tidak menambah `photoCount` kedua kali.
- [ ] **Refresh selalu persist:** di tengah jalan refresh browser → data tidak hilang (Zustand persist `1upfarm-garden`).
- [ ] **Guard route:** buka `/app/quests`, `/app/profile`, `/app/settings`, `/app/learn` tanpa login → semua redirect ke `/register` (ada **Memuat kebunmu…** sesaat).
- [ ] **Offline:** matikan internet (DevTools Offline) → app tetap jalan, tidak error fatal. Tekan refresh;

- [ ] **PWA:** `http://localhost:3000/manifest.webmanifest` harus 200. Di Chrome, ada opsi **Install 1UpFarm**.
- [ ] **Notifikasi:** di Settings aktifkan toggle → izinkan → tidak error. Copy notifikasi sesuai `ui-copy §15` (Waktunya siram 💧 / Cek tanamanmu 🌱 / Darah menurun / Waktunya foto 📸).

---

## 5. Checklist responsif & a11y

- [ ] **Mobile 360px:** bottom-nav 5 slot, tombol To-do tengah menonjol ungu, konten tidak tertutup bottom-nav (padding `pb-28`), tombol ≥44px.
- [ ] **Desktop ≥1024px:** sidebar kiri 240px dengan panel stat, top header sapaan + HP mini + streak mini.
- [ ] **Kontras teks ≥4.5:1**, stat selalu + ikon/label (bukan warna saja), `aria-label` di tombol ikon, `alt` di foto tanaman, fokus ring ungu terlihat saat Tab.
- [ ] **Empty / Loading / Error di tiap layar:** EmptyState ada, loading **Memuat kebunmu…**, error **Ada yang salah. Coba lagi.**
- [ ] **Kitchen sink:** buka `/kitchen-sink` → komponen HPBar, XPBar, GoldCounter, LevelBadge, StreakFlame, TaskCard, PlantCard, BadgeCard tampil konsisten.

---

## 6. Gate developer (opsional tapi wajib hijau)

Jalankan di terminal sebelum lapor “selesai”:

```bash
npm run build      # harus hijau, route list 15 halaman
npm run typecheck  # next typegen + tsc --noEmit
npm run lint       # eslint
npm run test       # vitest 23/23 hijau (gamifikasi, plant-engine, badge-evaluator)
```

E2E (di laptop kamu; di env ini Playwright belum bisa launch karena `libnspr4.so` sistem belum ada):

```bash
npx playwright install --with-deps chromium
npm run test:e2e   # smoke: register → tambah Selada → centang task → progres + guard
```

---

## 7. Template lapor bug

Copy-paste ini saat kamu menemukan bug:

```markdown
**Langkah reproduksi:**
1.
2.

**Akun:** baru / demo
**Viewport:** 360px / desktop
**URL:**
**Yang diharapkan:**
**Yang terjadi (screenshot/console):**
```

---

### Ringkasan akun

| Jalur | Username | Password | Cara |
|---|---|---|---|
| **Akun baru** | terserah kamu (cth. `tifatest`) | ≥6 karakter (cth. `test1234`) | `/register` |
| **Akun demo** | `demo` | `demo123` | Tombol **Coba akun demo** di `/login` atau isi manual di form |

Selamat test! Kalau ada yang beda dari “Yang harus kamu lihat”, catat langkahnya pakai template di atas.
