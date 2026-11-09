# Verifikasi Budidaya per Varietas — 1UpFarm

Tujuan: cek ulang angka panen & jadwal di `plants.json` terhadap sumber agronomi, dan jelaskan **kenapa angka bisa beda**. Dokumen ini menggantikan status `TODO: verify` menjadi **terverifikasi dengan catatan**.

## 1. Temuan utama: basis HST beda-beda
Penyebab nomor satu angka panen "meleset" = **hitungan mulai kapan**:
- **HST dari semai** (seed) — dipakai app (user mulai dari benih).
- **HST dari pindah tanam** (transplant) — dipakai banyak SOP/benih komersial.
- Selisih persemaian: **±21–35 hari** (tomat/cabai), **±10–14 hari** (pakcoy/selada).

Contoh: tomat Servo "60–65 HST" = dari pindah tanam → **≈ 85–95 hari dari semai**. Jadi angka app (90–120 dari semai) **konsisten**, bukan salah.

Selain itu: **varietas + dataran (rendah/tinggi) + media (tanah/hidroponik)** menggeser angka. App menampilkan **rentang estimasi**, bukan janji.

## 2. Ringkasan keputusan
| Tanaman | growDays app (dari semai) | Perubahan | Confidence |
|---|---|---|---|
| Selada | 30–45 | tetap | Tinggi |
| Kangkung darat | 21–30 | dari 20–30 | Tinggi |
| Bayam cabut | 20–30 | dari 25–30 | Tinggi |
| Pakcoy/Sawi | 25–45 | dari 25–30 (tambah jalur konvensional) | Sedang |
| Bawang merah | 57–70 | dari 55–70 | Tinggi |
| Daun bawang | 60–90 (petik daun 45+) | tetap | Sedang |
| Tomat | 90–120 | tetap (basis semai) | Tinggi |
| Cabai rawit | 90–115 | tetap (basis semai) | Sedang |

## 3. Detail per tanaman

### 3.1 Selada (Lactuca sativa)
| Varietas | Umur panen | Basis | Sumber | Confidence |
|---|---|---|---|---|
| Grand Rapids | 30–40 HST | semai | Panah Merah (deskripsi produk) | Tinggi |
| Butterhead / Romaine | ±40–45 HST | semai | Jurnal selada (Unja/UPN) | Sedang |
| Hidroponik (umum) | 30–35 HST | semai | Balai pengkajian | Sedang |

**App**: 30–45. Catatan: dataran rendah kadang membentuk krop kecil/cepat berbunga. **Tidak perlu diubah.**

### 3.2 Kangkung darat (Ipomoea reptans)
| Varietas | Umur panen | Basis | Sumber | Confidence |
|---|---|---|---|---|
| Bangkok LP-1 | 21–25 HST | semai | Panah Merah / kebunindo | Tinggi |
| Serimpi / Rajawali | 21–25 HST (panen); diameter penuh ~35 HST | semai | Jurnal Unsrat | Sedang |

**App**: 21–30 (diperbarui dari 20–30). Panen sebelum berbunga.

### 3.3 Bayam cabut (Amaranthus)
| Varietas | Umur panen | Basis | Sumber | Confidence |
|---|---|---|---|---|
| Giti Hijau / Giti Merah | 20–25 HST (genjah) | semai | BPPSDMP Pertanian; DPKP Tangerang | Tinggi |
| Maestro | 25–30 HST | semai | Kebunindo | Sedang |
| Umum | 25–30 HST | semai | Repository UB | Sedang |

**App**: 20–30 (diperbarui dari 25–30). Dataran rendah–menengah optimal.

### 3.4 Pakcoy / Sawi (Brassica rapa)
| Kondisi | Umur panen | Basis | Sumber | Confidence |
|---|---|---|---|---|
| Nauli F1 (hidroponik) | 25–27 HST | pindah tanam | Deskripsi varietas Nauli F1 | Tinggi |
| Konvensional (tanah) | 40–50 HST | semai | Dinas Pertanian Kota Yogyakarta | Sedang |

**App**: 25–45 (diperbarui dari 25–30) — satu rentang mencakup hidroponik cepat & tanah konvensional. **Catatan penting**: 25 hari hanya realistis untuk hidroponik/pindah tanam.

### 3.5 Bawang merah (Allium cepa var. ascalonicum)
| Varietas | Umur panen | Basis | Sumber | Confidence |
|---|---|---|---|---|
| Bima Brebes | ±60 HST | tanam umbi | AGROSWAMP / SK Mentan | Tinggi |
| Maja Cipanas | 57–60 HST | tanam umbi | Jurnal UB; my-best | Sedang |
| Kramat 1 | ±60 HST | tanam umbi | Deskripsi varietas | Sedang |

**App**: 57–70 (diperbarui dari 55–70). Kurangi air 1–2 hari sebelum panen (Juknis Hortikultura).

### 3.6 Daun bawang (Allium fistulosum)
| Kondisi | Umur | Basis | Sumber | Confidence |
|---|---|---|---|---|
| Petik daun luar | 45+ HST | semai | Praktik umum / DLH Buleleng | Sedang |
| Panen penuh | 90–100 HST | semai | SOP Budidaya Bawang Daun (ppid.pertanian.go.id) | Tinggi |

**App**: 60–90, petik daun 45+. Tetap.

### 3.7 Tomat (Solanum lycopersicum)
| Varietas / dataran | Umur panen | Basis | Sumber | Confidence |
|---|---|---|---|---|
| Servo F1 (dataran rendah) | 60–65 HST | pindah tanam | Panah Merah | Tinggi |
| Servo F1 (lapangan) | 55–75 HST | pindah tanam | Panah Merah product page | Tinggi |
| Dataran tinggi | 85–90 HST | pindah tanam | Panah Merah | Sedang |
| Umum (Kementan) | ~90 HST panen pertama | pindah tanam | BBPP Lembang | Tinggi |

**App**: 90–120 **dari semai** (≈ 60–95 dari pindah tanam + 21–28 persemaian). Tetap. **Jangan tulis "60 HST" di app tanpa basis** — bisa menyesatkan.

### 3.8 Cabai rawit (Capsicum frutescens)
| Varietas | Umur panen | Basis | Sumber | Confidence |
|---|---|---|---|---|
| Dewata 43 F1 | ~68 HST (panen pertama, studi) | pindah tanam | Skripsi UIN Suska | Sedang |
| Hiyung | 100–115 HST | tanam | SOP Cabai Rawit Hiyung (Kementan) | Tinggi |
| Umum | 90–115 HST | tanam/pindah tanam | SOP Hortikultura | Sedang |

**App**: 90–115 dari semai. Tetap. Varietas genjah bisa ~90; Hiyung lebih lama.

## 4. Catatan yang wajib tampil di app
- Label: **"± {min}–{max} hari (estimasi dari semai)"**.
- Tooltip/catatan: "Bisa beda tergantung varietas, dataran, dan media."
- Untuk pakcoy & tomat: sebut basis (hidroponik vs tanah / dari pindah tanam) di halaman detail.

## 5. Sisa yang belum terverifikasi (jujur)
- **Iklim mikro lokal** tiap user (suhu, kelembapan) — tidak bisa divalidasi tanpa data lapangan.
- **Dosis pupuk tepat** per merek produk — SOP memberi kisaran, bukan dosis universal.
- **Hama spesifik wilayah** — perlu input ahli per daerah.
→ Tandai di app sebagai "panduan umum", bukan resep mutlak. Validasi lapangan lanjut lewat `user-validation-kit.md`.

## 6. Sumber
- Panah Merah: Grand Rapids, Bangkok LP-1, Nauli F1, Servo F1 (deskripsi produk).
- Kementerian Pertanian: SOP Budidaya Bawang Daun; Juknis Bawang Merah; SOP Cabai Rawit Hiyung; BBPP Lembang (tomat).
- BPPSDMP Pertanian; DPKP Tangerang (bayam); Dinas Pertanian Kota Yogyakarta (pakcoy).
- Jurnal: Unja (selada), Unsrat (kangkung), UB (tomat/bawang), UIN Suska (cabai).