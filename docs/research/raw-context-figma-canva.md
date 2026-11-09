# Konteks Produk — 1UpFarm

> Sumber:
> - Figma design: `VVXg7JtvNn4yn6rdtqMVF1` — "Design-Figma - Massive" (wireframe mobile/web + component)
> - FigJam: `i2botr3od7T839pie712LP` — "Research Organizer - Massive", section **"Research Cangkul Titik Koma"** (249:2510) + section 248:3026. Section "Research Organizer Template" (agrowisata) = **research LAMA, DIABAIKAN**.
> - Canva: `docs/SPRINT REVIEW BACKEND - CANGKUL;.pdf` (SPRINT REVIEW BACKEND, by Cangkul Titik Koma)
> - Diambil via Figma REST API. Status: konteks riset lengkap.

## 0. Tim
- Nama kelompok: **Cangkul Titik Koma** (14 orang). Peran: Hustler, Scrum Master, Hipster (Web/Mobile), Hacker (Web/Mobile).
- Anggota (sebagian): Khelfa Arzakky Syukri Rohadi, Irma Theresia, Eka Prasetiawan, Hasna Azizah, Anggi Satria Wiranata, **Mesakh Lolo** (web), Muhammad Qohary Rawidafany, Aldy Jhonatan Hutasoit, Safitri Mutiara Putri, Ibnu Hanif Salsabila, Alia Pramestia Nurdenia, Bagas Satrio, Rizqi Vela Syifa, Bayu Maulana (mobile).

## 1. Ringkas produk
- **1UpFarm** = platform digital **mobile + website** bertema **urban farming untuk pemula**.
- Antarmuka modern, navigasi sederhana, responsif (semua kalangan/usia).
- Pilar: **tutorial/panduan interaktif**, **gamifikasi** (poin, lencana/badge, bar darah, level, gold, quest), **pengingat otomatis** (penyiraman & monitoring).
- Tema visual: **ungu (Ungu-Primer)**, gradient **soft/pastel**, maskot + avatar chibi, kartu rounded.

## 2. Problem Statement (riset)
Pertanian urban menghadapi: (1) kurangnya pengetahuan untuk memulai, (2) biaya awal tinggi (mis. sistem hidroponik), (3) kurang motivasi merawat tanaman secara konsisten. Tapi pertanyaan serupa juga muncul: **tidak ada yang benar-benar di pertanian urban** — kompetitor gamifikasi (Habitica) tak menyentuh tani; kompetitor tani (Urban Veggie Garden) kurang interaktif.
→ Riset gamifikasi: peningkatan keterlibatan **60%**, produktivitas **50%** (pelatihan gamifikasi 2019); 89% pelajar lebih terlibat dengan sistem poin; pasar gamifikasi tumbuh **36.4% CAGR s/d 2032**.

## 3. Target user & market
- **Market segmentation**: Pemula berkebun (18–35); Anak & pelajar (10–18); Orang kerja di perkotaan (25–55); Masyarakat perkotaan; Sekolah/institusi pendidikan; Pemerintah kota & LSM lingkungan.
- **User persona**:
  - **Ariska** — 25 th, PNS Jakarta, peduli gaya hidup sehat & keberlanjutan, lahan sempit. Butuh solusi praktis (hidroponik/pot/polybag). Tertarik gamifikasi (poin, level, tantangan mingguan). Sudah menanam tomat; ingin cabai, daun bawang, selada.
  - **Khelfa Arzakky** — 21 th, mahasiswa, mau isi waktu luang produktif. Ingin reward: poin, lencana, tantangan harian.

## 4. Hasil kuesioner (63 responden)
- **Profil**: 75% usia 19–21; 56% laki-laki; 86% mahasiswa.
- **Pengetahuan urban farming**: 91% belum paham; 57% tertarik; 86% merasa belum cukup tahu untuk mulai; 62% ingin metode hidroponik & pot/polybag.
- **Gamifikasi**: 81% belum paham; **91% termotivasi** dengan hadiah/pencapaian virtual; 86% tertarik fitur gamifikasi (poin, hadiah, tantangan).
- **Tantangan**: 64% kurang waktu; lahan sempit; modal terbatas; kekonsistenan; pengetahuan.
- **Yang dibutuhkan**: 40% teknik & perawatan tanaman; **68% pengingat otomatis penyiraman**.
- **Fitur gamifikasi menarik**: Pemilihan tantangan, pengumpulan poin, level up, penghargaan virtual.
- **Tanaman diminati**: **69% cabai**, 57% tomat, 35% daun bawang, 33% kangkung, 32% selada.

## 5. Kompetitor
- **Habitica** (web/mobile): kuat → gamifikasi RPG, sinkron lintas platform; lemah → membingungkan bagi non-RPG, performa mobile lag; **tidak di bidang tani urban**.
- **Urban Veggie Garden** (web/mobile): kuat → panduan praktis, opsi tanam per bulan/hemisfer; lemah → kurang interaktif, bergantung internet, tampilan "menonton".
- **Sintesis**: gabungkan gamifikasi RPG Habitica + kepraktisan Urban Veggie Garden, perbaiki interaktivitas & fokus tani urban.

## 6. Product Statement
"1UpFarm adalah platform digital bertema urban farming bagi pemula, dengan antarmuka sederhana, tutorial komprehensif, gamifikasi, dan pengingat otomatis untuk pengalaman berkebun yang edukatif dan menyenangkan."

## 7. Fitur (Problem → Feature → Expected → Screens)
| Problem | Fitur | Screen |
|---|---|---|
| Bingung mulai, kurang info, kurang minat | Informasi urban, pengenalan berkebun, jenis tanaman | Informasi Urban, Pengenalan Berkebun |
| Kurang perencanaan, tak ada pencatatan | Perencanaan berkebun (jenis, aktivitas, tanggal awal–akhir) | Tambah Tanaman, To-Do List |
| Lupa menyiram/monitoring | Reminder penyiraman & monitoring | Notifikasi pengingat |
| Kurang motivasi/disiplin, tanpa reward | Gamifikasi (bar darah, quest, reward) | Lacak Tanaman, Detail Tanaman |

## 8. Fitur MVP (Notulensi 17 Okt 2024)
1. **Login / Register** — MVP: username, password.
2. **Perencanaan berkebun** — MVP: jenis tanaman, jenis media tanah (hidroponik/polybag), tanggal awal & selesai.
3. **Gamifikasi** — High priority:
   - **Darah (HP)**: tidak kerjakan to-do → darah berkurang; darah habis → **level turun 1 & gold hilang semua**.
   - **EXP**: selesai to-do → EXP naik → level naik.
   - **Gold**: reward.
   - **Level**: naik saat EXP penuh, turun saat darah habis.
   - Low priority: badge, quest. Edukasi: didapat dari berkebun nyata mengikuti arahan.
   - Tidak penting: Toko, Kustomisasi avatar.
- MVP main feature = **daily task**. Mulai 1 sampel tanaman termudah dulu.

## 9. Alur & IA
- **User Flow MVP**: Start → Introduction to our apps → Sign in / Sign up → Add plant to be planted → Plant Terms & Requirement → Do daily task → Check daily task → Finish Plan → End.
- **Sitemap (Website & Mobile)**: Auth · Homepage · Detail Plant · Daily Task · Add a Plant · Plant Terms & Requirement · Profile · Settings.
- **Alur tambah penanaman (mobile)**: cover pengenalan → login/signup → homepage (tanaman abu2 kalau belum ada) → tombol tambah → pilih jenis berdasarkan kesulitan + media tanah → pilih tanggal awal (sistem prediksi tanggal selesai) → diberi tata cara + task → dapat EXP.
- **Profile avatar**: avatar + level → 3 status bar (Darah, EXP, Gold) → produktivitas (weekly/monthly) → badge.
- **To-do**: tombol di tengah navbar → pop-up kategori **Task** & **Done** → task per tanaman → centang → Done. Tidak kerjakan → darah kurang; selesai → EXP & GOLD.
- **Activity log/notifikasi**: notifikasi task → history.
- **Logout**: setting → logout → konfirmasi.

## 10. Data & Backend (MySQL 8.0)
- **Pengguna**: username, nama lengkap, email, level (angka + point beli equipment), badge/achievement.
- **Achievement**: `id_achievement` (PK), `id_pengguna` (FK), `id_badge` (FK), `tanggal_dicapai`.
- **Badge**: `id_badge` (PK), `nama_badge`, `deskripsi`. Tingkatan: **Pemula, Berkelanjutan, Professional**.
- Auth: **Bcrypt** (hash) + **JWT**.
- Gamifikasi contoh: HP `768/1000`, EXP `10/100`, `Lvl.1`, `1000 GOLD`, Productivity Chart, coin, rank (bronze/silver/gold, mode light), difficulty (Easy/Medium/Hard/Expert/VIP).

## 11. Konten edukasi tanaman (contoh)
- **Budidaya cabai rawit hidroponik**: alat & bahan (wadah NFT, rockwool/perlite/cocopeat, benih, nutrisi N-P-K, air bebas klorin, pompa, pipa/selang, pH & EC meter, grow light, termometer/higrometer); jadwal mingguan (persemaian → pindah tanam → pemeliharaan → pertumbuhan aktif → panen). Sumber: ppid.pertanian.go.id, badungkab, researchgate, YouTube.
- **Siklus kebun/jadwal penyiraman**.
- Media/hidroponik & polybag (campuran tanah:kompos:arang sekam = 2:1:1).

## 12. Tech stack (hasil sprint/riset)
- **Mobile**: Jetpack Compose, Material 3, Camera, Android SDK 15, Emulator (USB Debug).
- **Web**: React JS, `react-webcam` / `react-webcam-pro`.
- **Backend**: MySQL 8.0, Bcrypt, JWT. Tema.
- Catatan: target web modern = Next.js + Tailwind + shadcn (keputusan build kita, tetap ikut stack/desain di Figma).

## 13. Desain (Figma)
- Page design: **Wireframe - Mobile** (MVP UI: onboarding, home/daily tasks, list plant, plan detail, plant care), **Wireframe - Web** (carousel, plant card, step panduan tanam, resource tanaman, landing page), **Component** (Flow Planning, brainstorming mobile, komponen: slider, tag, badge, carousel, tim, sitemap, IA).
- Referensi visual (dari mockup): gradient pastel cream/pink/lilac, ungu primary, avatar chibi, stat bar + level + coins, kartu task dengan +exp/+coins, bottom nav ikon, maskot.

## 14. Canva deck (SPRINT REVIEW BACKEND)
- Isi utama: Research & Usability Testing, Problem Statement, User Persona, Product Statement, Feedback, Progress Frontend, Progress Backend, Database.
- **Progress**: Mobile 90%, Website 90%, **Database 85%**, **API Integrasi 10%**.
- **Feedback usability testing** (10 anak muda minat berkebun):
  - Mobile: tampilan menarik & warna nyaman; maskot sesuai; **perlu pesan konfirmasi di To-do List saat task selesai**.
  - Website: alur mudah dipahami; landing page bagus & interaktif; **font terlalu kecil di menu fitur/landing page**.
- Tagline: "Berkebun Seru, Hasil Melimpah! Tanam, Main, Panen!"
- Catatan: sebagian halaman deck berupa gambar/tabel → teks PDF terbatas. Bila perlu detail, OCR halaman tertentu.

## 15. Batasan konteks
- Diminta membangun **web app** yang bisa jalan lokal dengan interface bagus. Mobile jangan di-scope dulu (skor web prioritas).
- Semua copy/angka UI harus diambil dari dokumen ini → `data/`, **jangan ngarang**.
