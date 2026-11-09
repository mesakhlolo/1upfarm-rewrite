# Design System — 1UpFarm

Sumber: arah visual Figma (`raw-context-figma-canva.md` §1, §13) + gaya **Duolingo** (penyajian: path, streak, selebrasi, font rounded, warna ceria) + **Habitica** (substansi: stat bar HP/EXP/Gold, kartu task +reward, badge). **Tidak pixel-perfect Figma** — dipoles lebih bersih.

Tujuan: agent punya **token & komponen konkret** → tiap halaman konsisten, tidak ngarang style.

---

## 1. Prinsip desain
1. **Hangat, bukan menghakimi** — copy & warna suportif; gagal ≠ hukuman.
2. **Satu fokus per layar** — misi hari ini paling menonjol.
3. **Progress nyata terlihat** — foto tanaman = bintang, bukan angka abstrak.
4. **Seru & "rewarding"** — tiap centang ada umpan balik kecil (EXP, animasi).
5. **Mobile-first** (360px) → naik ke desktop. Satu basis responsif.
6. **Ceria tapi tenang** — warna hidup untuk aksi/reward; sisanya netral agar tidak lelah.

---

## 2. Warna (token)

Warna disimpan sebagai CSS var di `app/globals.css` (format shadcn `--primary` dst), dipakai Tailwind.

### Brand
| Token | Hex | Pakai |
|---|---|---|
| `--primary` | `#7C3AED` | Ungu utama (tombol, aksen, link) |
| `--primary-hover` | `#6D28D9` | Hover/pressed |
| `--primary-fg` | `#FFFFFF` | Teks di atas primary |
| `--primary-soft` | `#EDE9FE` | Latar chip/ikon ungu |
| `--accent` | `#F0ABFC` | Aksen lilac (highlight, gradient) |

### Stat game (semantik, konsisten di mana pun)
| Stat | Token | Hex | Ikon |
|---|---|---|---|
| HP (Darah) | `--stat-hp` | `#EF4444` | Heart |
| EXP | `--stat-xp` | `#3B82F6` | Sparkles/Zap |
| Gold | `--stat-gold` | `#F59E0B` | Coins |
| Streak | `--stat-streak` | `#F97316` | Flame |
| Growth (sukses/tumbuh) | `--stat-growth` | `#22C55E` | Sprout/Check |

### Status
| Token | Hex | Pakai |
|---|---|---|
| `--success` | `#22C55E` | Task done, toast sukses |
| `--warning` | `#F59E0B` | HP rendah, peringatan |
| `--danger` | `#EF4444` | Error, HP 0 |
| `--info` | `#3B82F6` | Info |

### Netral (light)
| Token | Hex | Pakai |
|---|---|---|
| `--background` | `#FFFBF7` | Latar (~cream) |
| `--card` | `#FFFFFF` | Kartu |
| `--foreground` | `#1F2937` | Teks utama |
| `--muted` | `#F3F0FF` | Latar sekunder |
| `--muted-foreground` | `#6B7280` | Teks sekunder |
| `--border` | `#EAE6F5` | Garis |
| `--ring` | `#7C3AED` | Fokus |

### Dark (opsional, fase polish)
`--background #14121C`, `--card #1E1B2E`, `--foreground #F5F3FF`, `--muted #2A2540`, `--muted-foreground #A1A1B5`, `--border #2E2947`. Brand tetap ungu; stat warna sama tapi turunkan saturasi ~10%.

### Gradient
- **App background (pastel)**: `linear-gradient(135deg, #FFF7ED 0%, #FAF5FF 50%, #FDF2F8 100%)` (cream → lilac → pink).
- **Hero/CTA primary**: `linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)`.
- **Card reward (level up/panen)**: `linear-gradient(135deg, #A855F7 0%, #F0ABFC 100%)`.
- Gradient hanya di hero, CTA utama, layar selebrasi. Jangan di body teks panjang.

---

## 3. Tipografi
| Token | Font | Ukuran / line-height | Berat | Pakai |
|---|---|---|---|---|
| `--font-sans` | **Nunito** (rounded, ramah) | — | 400–800 | Semua UI |
| Display / H1 | Nunito | 32/40 (mobile 28/36) | 800 | Judul hero, selebrasi |
| H2 | Nunito | 24/32 | 700 | Judul seksi |
| H3 | Nunito | 20/28 | 700 | Judul kartu |
| Body | Nunito | 16/24 | 400–600 | Teks umum |
| Small | Nunito | 14/20 | 400–600 | Metadata |
| Caption | Nunito | 12/16 | 600 | Label stat, tag |

Aturan:
- Angka stat pakai `tabular-nums` (Duolingo feel) + font-weight 800.
- Maks 2 ukuran besar per layar; hierarki lewat berat, bukan banyak ukuran.
- Fallback: `ui-rounded, "Segoe UI", system-ui, sans-serif`.

---

## 4. Spacing, radius, shadow, ukuran
| Token | Nilai |
|---|---|
| Spacing (4-based) | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 |
| `--radius-sm` | 8px |
| `--radius-md` | 12px (default input) |
| `--radius-lg` | 16px (kartu) |
| `--radius-xl` | 24px (kartu besar, modal) |
| `--radius-full` | 9999px (chip, avatar, tombol pil) |
| Shadow-soft | `0 2px 8px rgba(124,58,237,.08)` (kartu) |
| Shadow-pop | `0 8px 24px rgba(124,58,237,.18)` (CTA, modal) |
| Border | 1px `--border`; aksen 2px `--primary` pada state aktif |
| Kontainer | max-w-[1200px] desktop, padding 16px mobile / 24px desktop |
| Target sentuh | min 44×44px |

Radius besar + shadow lembut = bahasa "rounded & soft" Figma.

---

## 5. Layout & navigasi
### Mobile (< 768px)
- **Bottom nav fixed**, 5 slot (Figma §13): Home · Tanaman · **[To-do — tombol tengah menonjol, ungu, ikon check/plus besar]** · Belajar · Profil.
- Tombol To-do tengah = aksi utama (riset §9 "tombol di tengah navbar").
- Header tipis: sapaan + streak flame + HP mini.
- Konten scroll, safe-area bottom.

### Desktop (≥ 1024px)
- **Sidebar kiri** (lebar 240px) + area konten. Sidebar = nav sama (Home/Tanaman/To-do/Belajar/Profil) + stat panel (HP/EXP/Gold/Level/Streak) di atas.
- Topbar: judul halaman + aksi (tambah tanaman, notif, avatar).

### Breakpoints
`sm 640` · `md 768` (nav mobile→desktop) · `lg 1024` (sidebar) · `xl 1280`.
Grid konten 1 kolom mobile → 2–3 kolom kartu ≥ md.

---

## 6. Komponen

Di bawah = inventaris + varian + state. Implementasi pakai **shadcn/ui** lalu di-`theme`. Nama file `components/ui/*` (shadcn) & `components/*` (produk).

### 6.1 Button (shadcn `button`)
Varian: `primary` (gradient ungu), `secondary` (outline), `ghost`, `danger`. Ukuran: sm/md/lg. State: default/hover/active/disabled/loading (spinner). Aksi destruktif & konfirmasi pakai `danger` (mis. logout — ui-copy §14).

### 6.2 Card (shadcn `card`)
- `Card` dasar: radius-lg, border, shadow-soft.
- `TaskCard` (Figma, penting): baris task — ikon tipe (tipe: Siram/Pupuk/Cek hama/Pangkas/Panen/Foto), judul, tag difficulty, dan **pill reward** `+10 EXP` (biru) + `+5 gold` (amber). State: `todo` | `done` (strikethrough + centang hijau) | `missed` (merah redup). Checkbox besar bulat kanan.
- `PlantCard`: foto/emoji tanaman, nama, tag difficulty (Mudah/Sedang/Menantang), "±30 hari", tag media.

### 6.3 StatBar / StatChip (Habitica + Figma)
- **HPBar**: Progress merah, label "Darah" + `hp/100`, ikon Heart. Warna berubah: >60 merah normal, ≤30 kuning→merah + getar halus (state bahaya).
- **XPBar**: Progress biru, label "EXP" + `xp/need`.
- **GoldCounter**: ikon Coins amber + angka (tabular). Bukan bar.
- **StreakFlame**: ikon Flame orange + angka; animasi "pop" saat +1.
- **LevelBadge**: lingkaran ungu, "Lv. {n}" + tier (Pemula/Berkelanjutan/Professional).
- Versi `mini` untuk header, versi `full` untuk profil/dashboard.

### 6.4 Nav
- `BottomNav` (mobile) + `SideNav` (desktop) — item: ikon + label, aktif = ungu + label tebal.
- Item To-do mobile = FAB-ish center button.

### 6.5 Badge / Achievement
- `BadgeCard`: ikon dalam lingkaran (terkunci = abu, terbuka = gradient), nama, deskripsi. Badge list = ui-copy §19.
- `BadgeToast`: popup saat dapat badge ("Badge baru: {nama}").

### 6.6 Progress tanaman
- `StageStepper`: tahap (Semai→Pindah→Vegetatif→Panen) horizontal, tahap aktif ungu, selesai hijau centang.
- `GrowthRing`: cincin progres `currentDay/expectedHarvest` + % di tengah.
- `PhotoCheckpointCard`: slot foto per milestone (hari + tahap); kosong = placeholder kamera; terisi = thumbnail; tap → detail/ganti.

### 6.7 Tag & chip
- `DifficultyTag`: Mudah=hijau, Sedang=amber, Menantang=merah (soft bg + teks gelap).
- `MediaTag`: Polybag/Pot, Hidroponik (netral ungu-soft).
- `TypeTag`: tipe task (ikon + warna stat).

### 6.8 Maskot & dialog
- `MascotBubble`: maskot + balon pesan (rotasi copy ui-copy §17). Maskot reaktif: senang (task selesai), khawatir (HP rendah).
- `CelebrationOverlay`: layar penuh gradient + confetti + maskot saat level up / panen (ui-copy §12).
- `ConfirmDialog` (shadcn `dialog`): konfirmasi destruktif (logout, hapus foto).

### 6.9 Form & feedback
- `Input`, `Label`, `Form` (shadcn) — radius-md, fokus ring ungu.
- `Toast` (shadcn `sonner`): sukses task ("Selesai! +10 EXP"), error, info.
- `EmptyState`: ikon + judul + deskripsi + CTA (mis. kebun kosong — ui-copy §5).
- `Skeleton`: loading (ui-copy §16).
- `Tabs` (shadcn): Task / Done di To-do.
- `Wizard`: stepper atas (4 langkah) + konten + tombol back/next (ui-copy §8).

### 6.10 Lain
- `Avatar` (shadcn): maskot chibi / inisial.
- `Sheet` (shadcn): menu mobile / filter.
- `Progress` (shadcn): dasar HP/XP.
- `Tooltip`: makna stat.

---

## 7. Motion & feel (Duolingo)
Ada di Fase 12 (Framer Motion), tapi kontraknya:
- **Task done**: checkbox pop + `+10 EXP` melayang naik & fade (400ms), kartu geser ke Done.
- **Streak +1**: flame membesar lalu normal + angka count-up.
- **Level up**: CelebrationOverlay + confetti + maskot, 2.5s, bisa di-skip.
- **Panen**: CelebrationOverlay khusus (ui-copy §12).
- **HP turun**: bar bergetar halus + warna ke merah; toast suportif (bukan alarm).
- **Press feedback**: tombol scale 0.97 (150ms).
- **Reduced motion**: hormati `prefers-reduced-motion` — matikan confetti/float, sisakan perubahan state.

---

## 8. Blueprint layar (route ← `PRD` §7)
| Route | Susunan inti |
|---|---|
| `/` Landing | Hero gradient + maskot + CTA → problem (stat riset) → solusi loop 3 langkah → preview fitur → statistik → footer tim |
| `/onboarding` | 3 slide (ui-copy §3) + progress dot + CTA "Pilih Tanaman Pertamaku" |
| `/login`, `/register` | Card form tengah, logo + maskot, error inline (ui-copy §4) |
| `/app/home` | Header sapaan+streak → stat (HP/EXP/Gold/Level/Streak) → "Misi hari ini" (TaskCards) → kartu tanaman aktif (foto terakhir) → empty garden bila kosong |
| `/app/plants` | Judul + filter chip (Semua/Cepat panen/Mudah/Menantang) → grid PlantCard |
| `/app/plants/[slug]` | Foto/emoji + info (panen/matahari/pot/jarak) → StageStepper → Tips → "Kalau bermasalah" → CTA "Tanam ini" |
| `/app/garden/add` | Wizard 4 langkah (Pilih→Media→Tanggal→Ringkasan) → "Mulai Rencana" → +EXP |
| `/app/plan/[id]` | Header tanaman + GrowthRing + StageStepper → timeline hari + TaskCard per hari → PhotoCheckpointCard di milestone |
| `/app/tasks` | Tabs Task/Done → TaskCards dikelompokkan per tanaman → banner streak bila semua selesai |
| `/app/profile` | Avatar + LevelBadge + tier → stat full → produktivitas (7/30 hari) → koleksi BadgeCard |
| `/app/settings` | Toggle notifikasi, bahasa, ekspor/impor, keluar (ConfirmDialog) |
| `/app/learn` + `[slug]` | Kartu artikel (panduan tanam, hidroponik vs polybag, FAQ) |
| `/kitchen-sink` | Semua komponen + varian (dev review, Fase 1) |

Tiap layar **wajib** punya empty / loading (Skeleton) / error state.

---

## 9. Aksesibilitas
- Kontras ≥ 4.5:1 untuk teks; stat warna **selalu** + ikon/label (jangan warna saja).
- Navigasi keyboard + fokus ring ungu (`--ring`).
- `aria-label` pada ikon tombol; `alt` pada foto tanaman.
- Target sentuh ≥ 44px; bottom-nav tidak menutupi konten (padding safe-area).
- Font dasar ≥ 16px (feedback usability: font landing kemarin terlalu kecil — §14 riset).

---

## 10. Implementasi & anti-slop
- Token → `globals.css` CSS var → `tailwind.config` (shadcn `theme`). **Jangan** hardcode hex di komponen.
- shadcn dulu; bikin komponen produk di `components/` yang membungkus shadcn.
- Semua teks dari `content/ui-copy.md`; label stat dari §18 ui-copy.
- Angka/reward ikut `gameplay-design.md` §3 & konstanta §12 (EXP 10/20/35, gold 5/10/18, HP −5/−8/−12).
- Ikon: **lucide-react** saja (konsisten).
- Gambar tanaman: untuk MVP pakai **emoji** (sudah ada di `plants.json`); aset Figma menyusul (data gap).
- Fase 1 menghasilkan `/kitchen-sink` untuk validasi komponen sebelum dipakai di layar.

## 11. Komponen Figma yang dipertahankan (🎯)
Ambil & poles dari Figma (§13 riset): **stat bar HP/EXP/Gold**, **kartu task +exp/+coins**, **badge**, **bottom-nav tombol tengah**, **carousel/tim**, **tag difficulty**. Sisanya di-redesign ala Duolingo (font rounded, kartu lembut, selebrasi) + Habitica (substansi stat/badge).
