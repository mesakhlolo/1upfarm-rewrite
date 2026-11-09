# UI Copy — 1UpFarm (final, Bahasa Indonesia)

Siap dipakai langsung. Nada: hangat, memotivasi, tidak menghakimi. Semua teks UI dari sini (jangan placeholder).

## 1. Tagline & brand
- Tagline utama: **"Berkebun Seru, Hasil Melimpah! Tanam, Main, Panen!"**
- Sub-tagline: **"Dari balkon sempit jadi panen nyata — dipandu tiap hari."**
- One-liner: **"Duolingo-nya menanam: belajar berkebun sambil main, sampai kamu panen."**

## 2. Landing page
- **Hero H1**: "Tanam di lahan sempit, panen dalam 30 hari."
- **Hero sub**: "1UpFarm memandu kamu hari demi hari merawat tanaman nyata — dengan misi harian, streak, dan reward. Cocok buat pemula yang gampang lupa."
- **CTA utama**: "Mulai Gratis"
- **CTA sekunder**: "Lihat cara kerjanya"
- **Problem section H2**: "Kenapa banyak yang gagal mulai berkebun?"
  - "91% pemula belum paham cara mulai."
  - "64% merasa nggak punya waktu merawat."
  - "68% butuh pengingat biar nggak lupa menyiram."
- **Solusi H2**: "1UpFarm bikin kamu tetap di jalur."
  - "Resep harian: tahu persis hari ini harus apa."
  - "Foto bukti tumbuh: lihat tanamanmu berkembang nyata."
  - "Reward: EXP, streak, badge — bikin semangat balik tiap hari."
- **Cara kerja (3 langkah)**: "Pilih tanaman → Ikuti misi harian → Panen pertama."
- **Bukti/statistik**: "Dari 63 responden: 91% termotivasi oleh hadiah virtual, 68% minta pengingat otomatis."
- **Footer**: "Dibuat oleh Tim Cangkul Titik Koma."

## 3. Onboarding
- Slide 1: **"Selamat datang di 1UpFarm"** — "Teman berkebun yang bikin kamu konsisten."
- Slide 2: **"Nggak perlu jago dulu"** — "Panduan langkah demi langkah buat pemula total."
- Slide 3: **"Satu tanaman, satu komitmen"** — "Kita mulai dari yang paling gampang dan cepat panen."
- CTA tiap slide: "Lanjut" · terakhir: "Pilih Tanaman Pertamaku"
- Tombol lewati: "Lewati"

## 4. Auth
- Register: judul **"Buat akun"**, sub "Simpan progres kebunmu." Field: Username, Password. CTA **"Daftar"**. Alt: "Sudah punya akun? Masuk".
- Login: judul **"Masuk"**, CTA **"Masuk"**. Alt: "Belum punya akun? Daftar".
- Error: "Username atau password salah." · "Username sudah dipakai." · "Password minimal 6 karakter."

## 5. Dashboard (`/app/home`)
- Sapaan: **"Hai, {nama}!"** / jika HP rendah: **"Tanamanmu butuh kamu hari ini."**
- Ringkasan: HP, EXP, Level, Streak, Gold.
- Judul task: **"Misi hari ini"**
- Empty garden: **"Kebunmu masih kosong"** — "Pilih tanaman pertamamu dan mulai hari ini." CTA **"Tambah Tanaman"**.
- Semua task selesai: **"Mantap! Semua misi hari ini beres 🎉"** — "Streak kamu bertambah."
- CTA: **"Buka To-do"**

## 6. Katalog tanaman
- Judul: **"Pilih tanamanmu"**
- Filter: "Semua" · "Cepat panen" · "Mudah" · "Menantang"
- Kartu menampilkan: nama, difficulty, "±30 hari", media.
- Label difficulty: **"Mudah" / "Sedang" / "Menantang"**
- Empty: "Belum ada tanaman di filter ini."

## 7. Detail tanaman
- Judul: nama tanaman.
- Info: "Perkiraan panen", "Matahari", "Ukuran pot", "Jarak tanam".
- Judul tahap: **"Tahapan tumbuh"**
- Judul tips: **"Tips penting"**
- Masalah umum: **"Kalau bermasalah"**
- CTA: **"Tanam ini"**

## 8. Wizard tambah tanaman
- Step 1: **"Pilih tanaman"**
- Step 2: **"Pilih media tanam"** — opsi: "Polybag / Pot", "Hidroponik" (jika tersedia).
- Step 3: **"Kapan mulai?"** — "Hari ini" / "Pilih tanggal". Catatan: "Kami akan perkirakan tanggal panen."
- Step 4: **"Ringkasan"** — tampilkan tanaman, media, mulai, estimasi panen.
- CTA akhir: **"Mulai Rencana"**
- Setelah mulai: **"Rencana dimulai!"** — "Misi hari ke-1 sudah siap. Kamu dapat +{exp} EXP."

## 9. To-do (`/app/tasks`)
- Judul: **"To-do"**
- Tab: **"Task"** · **"Done"**
- Task selesai: **"Selesai! +{exp} EXP, +{gold} gold."**
- Semua selesai: **"Semua misi hari ini selesai. Streak +1 🔥"**
- Done empty: "Belum ada task yang selesai."
- Lewat task (besok): **"Kamu melewatkan {jumlah} misi"** — "HP berkurang {x}. Yuk kejar hari ini."

## 10. Foto checkpoint
- Judul: **"Bukti tumbuh"** — "Foto tanamanmu di tahap ini."
- CTA: **"Ambil / Unggah Foto"**
- Sukses: **"Keren! +{hp} HP, +{exp} EXP."**
- Tanpa foto (tutup): "Nanti saja" (boleh, tapi tidak dapat bonus).

## 11. HP / Layu
- HP rendah (≤30): **"Tanamanmu mulai layu"** — "Siram & rawat hari ini biar pulih."
- HP 0: **"Tanamanmu butuh perhatian"** — "Jangan menyerah — rawat lagi dan pulihkan kebunmu." (MVP: tanpa penalti level/gold berat.)

## 12. Level up / selebrasi
- Level up: **"Level {n}!"** — "Kamu makin jago berkebun."
- Badge: **"Badge baru: {nama}"** — "{deskripsi}"
- Panen: **"PANEN PERTAMA! 🎉"** — "Kamu berhasil menanam sampai panen. Luar biasa!" CTA: **"Tanam Berikutnya"**

## 13. Profil
- Judul: **"Profil"**
- Stat: Level, Rank, HP, EXP, Gold, Streak.
- Produktivitas: **"7 hari terakhir"** / **"30 hari terakhir"**
- Badge: **"Koleksi badge"**
- Empty badge: "Belum ada badge. Selesaikan misi pertamamu!"

## 14. Settings
- **"Pengaturan"**
- "Notifikasi pengingat" (toggle)
- "Bahasa: Indonesia"
- "Ekspor data" / "Impor data"
- **"Keluar"** + konfirmasi: "Yakin mau keluar? Progres kebunmu tetap tersimpan di perangkat ini."

## 15. Notifikasi
- Siram: **"Waktunya siram {tanaman} 💧"**
- Monitoring: **"Cek tanamanmu hari ini 🌱"**
- HP rendah: **"Darah tanamanmu menurun — rawat sekarang."**
- Foto: **"Waktunya foto bukti tumbuh {tanaman} 📸"**

## 16. State umum
- Loading: **"Memuat kebunmu…"**
- Error: **"Ada yang salah. Coba lagi."**
- 404: **"Halaman nggak ditemukan."** CTA "Kembali ke Beranda"
- Offline: **"Kamu sedang offline. Progres disimpan lokal."**

## 17. Pesan maskot (rotasi)
- "Pelan-pelan aja, yang penting konsisten 🌱"
- "Tanamanmu bangga sama kamu!"
- "Satu misi hari ini, satu langkah lebih dekat ke panen."
- "Lupa kemarin? Nggak apa-apa, mulai lagi sekarang."
- "Kamu udah lebih jago dari kemarin."

## 18. Label komponen
- HP: **"Darah"** · EXP: **"EXP"** · Gold: **"Gold"** · Level: **"Level"**
- Streak: **"Streak"** · Badge: **"Badge"**
- Difficulty: **"Mudah" / "Sedang" / "Menantang"**
- Media: **"Polybag/Pot" / "Hidroponik"**
- Task types: **"Siram" / "Pupuk" / "Cek hama" / "Pangkas" / "Panen" / "Foto"**

## 19. Badge (nama & deskripsi)
| Badge | Deskripsi |
|---|---|
| Tunastumbuh | "Menanam tanaman pertamamu" |
| Foto Pertama | "Mengunggah bukti tumbuh pertama" |
| Streak 7 | "7 hari berturut-turut merawat tanaman" |
| Green Thumb | "Menyelesaikan 50 misi" |
| Panen Pertama | "Berhasil menanam sampai panen" |
| Pemula | "Mencapai Level 5" |
| Berkelanjutan | "Mencapai Level 15" |
| Professional | "Mencapai Level 30" |