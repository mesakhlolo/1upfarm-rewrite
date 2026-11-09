# Spesifikasi Foto Bukti Tumbuh (Photo Checkpoint)

Differentiator 1UpFarm: **gamifikasi bereaksi ke tanaman nyata**. Foto = bukti + ikatan emosional + anti-bohong.

## 1. Kapan muncul
- Pada `photoCheckpoints` tiap tanaman (mis. selada hari 1, 7, 14, 25, 35).
- Muncul sebagai **task khusus** di To-do pada hari tersebut, dan CTA di halaman plan.
- **Opsional** (boleh "nanti saja"), tapi bonus hanya jika diisi.

## 2. Reward
- +5 HP, +10 EXP (configurable). Tidak memberi gold besar (hindari farming).
- Simpan sebagai `PhotoCheckpoint` dan tampilkan sebagai progress tanaman (foto terakhir).

## 3. Input
- **Kamera** (mobile browser): `<input type="file" accept="image/*" capture="environment">`.
- **Upload file** (desktop): `<input type="file" accept="image/*">`.
- Maks 1 foto per checkpoint; bisa ganti sebelum hari berganti.

## 4. Kompresi & batas (penting: localStorage ~5MB)
Karena localStorage sangat terbatas, **JANGAN simpan foto mentah**.

Alur:
1. Ambil file → `createImageBitmap` / canvas.
2. **Resize** sisi terpanjang ke **≤ 800 px**.
3. **Kompresi** JPEG **quality 0.7**.
4. Target ukuran hasil: **≤ 120 KB/foto**.
5. Simpan sebagai data URL `data:image/jpeg;base64,...`.

Perhitungan kasar:
- 1 tanaman ~5 checkpoint × ~120 KB ≈ **600 KB**.
- 3 tanaman aktif ≈ **1.8 MB** (masih < 5 MB).
- Jika penuh: paksa hapus checkpoint lama atau pakai IndexedDB.

### Rekomendasi teknis
- **MVP**: simpan di **IndexedDB** (bukan localStorage) karena lebih besar & async. Zustand persist hanya untuk data teks; foto disimpan terpisah by `checkpointId`.
- Jika tetap localStorage: simpan hanya **thumbnail 400 px / 60 KB** untuk daftar, foto besar (jika perlu) di IndexedDB.
- Tangani `QuotaExceededError` → prompt "Hapus foto lama".

## 5. Data model
```ts
type PhotoCheckpoint = {
  id: string;
  gardenPlantId: string;
  day: number;
  stage: string;        // "Mulai" | "Semai" | ...
  imageDataUrl: string; // JPEG base64 (≤ ~120KB)
  width: number;
  height: number;
  createdAt: string;    // ISO
};
```

## 6. Tampilan
- Grid progres: thumbnail berurutan per checkpoint hari.
- Foto terakhir jadi "foto tanaman saat ini" di kartu garden.
- Timeline: hari + tahap + tanggal.

## 7. Fallback & error
- Kamera tidak didukung → tampilkan tombol upload file.
- Izin kamera ditolak → pesan: "Kamera nggak bisa diakses. Unggah foto dari galeri."
- Kompresi gagal → simpan versi lebih kecil (≤ 60 KB).
- Kuota penuh → tawarkan hapus foto lama.

## 8. Privasi
- Foto **hanya disimpan lokal** di perangkat (MVP, tanpa backend).
- Tidak dikirim ke server / pihak ketiga.
- Beri catatan di Settings: "Foto bukti tumbuh disimpan hanya di perangkat ini."
- Saat ekspor/impor data: sertakan opsi "sertakan foto" (default off agar file kecil).

## 9. Test cases
- Upload 3MB foto → hasil ≤ 120KB, tetap terbaca.
- Upload 3 tanaman × 5 checkpoint → total < 2MB.
- Hapus checkpoint → progres & reward tidak berubah.
- Buka di mobile Chrome/Safari → kamera/upload jalan.