# Asset Manifest — 1UpFarm

Aset visual asli, diekspor dari Figma **Design Figma - Massive** (`VVXg7JtvNn4yn6rdtqMVF1`), 2026-11-09. Semua milik proyek (tim Cangkul Titik Koma) — aman dipakai di app.

Lokasi: `docs/content/assets/figma/`. Saat Fase 1, salin ke `public/assets/` di app.

## Ringkasan coverage
| Kebutuhan | Status | Sumber |
|---|---|---|
| Logo (wordmark + mark) | ✅ ada | Figma |
| Avatar chibi | ✅ ada (male/female) | Figma |
| Badge contoh | ✅ 2 (easy/medium) | Figma |
| Ilustrasi fitur | ✅ 4 | Figma |
| Ilustrasi onboarding/hero | ✅ 1 | Figma |
| Ilustrasi tanaman | ⚠️ hanya tomat & cabai (cocok); 5 generik (terong, wortel, brokoli, semangka, kacang) | Figma |
| Ikon nav/stat | ⚠️ pakai **lucide-react** (design system §10), bukan file | lucide |
| 6 tanaman lain (selada, kangkung, bayam, pakcoy, bawang merah, daun bawang) | ⚠️ pakai **emoji** dari `plants.json` | emoji |
| Maskot karakter (reaktif) | ❌ belum ada | perlu dibuat |
| Set badge lengkap (8 badge ui-copy §19) | ❌ baru 2 contoh | perlu dibuat |

## File

### Brand
| File | Ukuran | Pakai |
|---|---|---|
| `logo-1upfarm.svg` | 4.3 KB | Wordmark "1UpFarm" (ungu `#661599`), header/landing |
| `logo-instance.png` | 8.1 KB | Mark "1" (ungu) — app icon / favicon / avatar fallback |

> Catatan warna: logo = `#661599`. Design system UI primary = `#7C3AED` (lebih cerah untuk interaksi). Jangan campur; logo tetap `#661599`.

### Avatar
| File | Ukuran | Pakai |
|---|---|---|
| `avatar-male.png` | 2.4 KB | Profil/leaderboard-free (pixel chibi) |
| `avatar-female.png` | 2.5 KB | Profil |
| `avatar-button.png` | 9.7 KB | Komponen tombol avatar (state) |

### Badge
| File | Ukuran | Pakai |
|---|---|---|
| `badge-easy.svg` | 9.0 KB | Contoh badge easy (Selada/Bawang Merah/Tomat) |
| `badge-medium.svg` | 8.9 KB | Contoh badge medium |

> 8 badge final (ui-copy §19) perlu digambar ulang konsisten — 2 ini jadi referensi gaya.

### Ilustrasi fitur
| File | Ukuran | Pakai |
|---|---|---|
| `feat-tugas-harian.png` | 247 KB | Landing "misi harian" / empty state |
| `feat-lacak-tanaman.png` | 259 KB | Landing "foto bukti tumbuh" / plan |
| `feat-tambah-tanaman.png` | 411 KB | Landing "pilih tanaman" / wizard |
| `feat-extra.png` | 94 KB | Dekorasi/edukasi |
| `cover-onboarding.png` | 62 KB | Onboarding slide 1 / hero |

### Ilustrasi tanaman
| File | Isi | Cocok untuk |
|---|---|---|
| `illus-tomato.png` | Tomat | `tomat` ✅ |
| `illus-chili.png` | Cabai rawit | `cabai-rawit` ✅ |
| `illus-eggplant.png` | Terong | dekorasi (bukan katalog) |
| `illus-carrot.png` | Wortel | dekorasi (bukan katalog) |
| `illus-broccoli.png` | Brokoli | dekorasi (bukan katalog) |
| `illus-watermelon.png` | Semangka | dekorasi (bukan katalog) |
| `illus-bean.png` | Kacang/sprout | dekorasi (bukan katalog) |

### Ikon (referensi, bukan untuk dipakai)
`icon-home.svg`, `icon-search.svg`, `icon-popcorn.svg`, `icon-pizza.svg` — hanya contoh; app pakai **lucide-react**.

## Spesifikasi aset yang perlu dibuat (TODO)
| Aset | Format | Ukuran | Catatan |
|---|---|---|---|
| Maskot 1UpFarm (netral/senang/khawatir) | SVG (3 pose) | 512×512 | Gaya flat rounded, ungú + hijau, cocok avatar chibi |
| 6 ikon tanaman (selada, kangkung, bayam, pakcoy, bawang merah, daun bawang) | SVG | 256×256 | Gaya senada `illus-*.png`; bayam/kangkung/pakcoy harus beda bentuk |
| 8 badge final | SVG | 256×256 | Ikut ui-copy §19; warna tier |
| App icon / PWA (192, 512, maskable) | PNG | 192/512 | Dari `logo-instance.png` |
| Favicon | SVG/ICO | 32/16 | Mark "1" |

Aturan fallback (biar build tak pernah block):
1. Tanaman tanpa ilustrasi → emoji `plants.json` (design system §10).
2. Ikon UI → lucide-react.
3. Badge tanpa SVG → `BadgeCard` dengan ikon lucide + gradient.
4. Maskot belum ada → pakai `illus-*.png`/emoji sprout sementara.

## Naming
- kebab-case, prefix: `logo-`, `avatar-`, `badge-`, `feat-`, `illus-`, `icon-`.
- Tanaman: `illus-<slug>.png` (slug = `plants.json`).

## Optimasi (saat masuk app)
- PNG > 100 KB → kompres (sharp/squoosh), target ≤ 150 KB; `feat-tambah-tanaman.png` 411 KB paling berat.
- Sajikan WebP/AVIF + fallback PNG (Next `next/image`).
- `width`/`height` wajib (cegah CLS).
- `alt` deskriptif (a11y).