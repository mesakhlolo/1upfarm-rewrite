# 1UpFarm

Duolingo untuk menanam makanan sendiri di lahan sempit. Web app mobile-first yang memandu pemula merawat tanaman nyata sampai panen pertama.

Sumber kebenaran produk, konten, dan desain ada di `docs/`. Aturan kerja agent ada di `AGENTS.md`.

## Stack

- Next.js 16 (App Router) + TypeScript strict
- Tailwind CSS v4 + shadcn/ui + lucide-react
- Vitest untuk unit test logic

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

> Turbopack aktif (`next dev --turbopack` / `next build --turbopack`) — default bundler Next.js 16. Dulu scaffold memakai Webpack karena Turbopack terblokir Windows SmartScreen di native Windows; sejak pindah ke WSL (Ubuntu) Turbopack berjalan bebas dan jauh lebih cepat (dev ready ±275ms, build ±4.7s di WSL2 vs Webpack ±8.3s).
> Lihat [Setup wajib di WSL](#setup-wajib-di-wsl) & [Troubleshooting Windows Smart App Control](#troubleshooting-windows-smart-app-control) sebelum jalan di Windows native.

> **Jangan menilai kecepatan navigasi dari `npm run dev`.** Untuk uji performa/rasa "instan" pakai production: `npm run build && npm run start`. Lihat bagian [Performa navigasi: dev vs production](#performa-navigasi-dev-vs-production-jangan-bingung) di bawah.

## Setup wajib di WSL

| Cek         | Harus                                                                  | Cara cek                                                                |
| ----------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Distro      | Ubuntu di WSL2 (bukan WSL1)                                            | `wsl.exe --status` → `Default Version: 2`                               |
| Lokasi repo | Filesystem Linux native (`~/projects/1upfarm`, **bukan** `/mnt/c/...`) | `pwd` → `/home/<user>/projects/1upfarm`; `mount \| grep " / "` → `ext4` |
| Node + npm  | Node 22+ & npm 10+                                                     | `node -v && npm -v`                                                     |
| VS Code     | Dibuka dari WSL (`code .` di terminal WSL)                             | Status bar hijau `WSL: Ubuntu`                                          |

> Kenapa bukan `/mnt/c`? `/mnt/c` = filesystem 9P dari Windows: lambat, `node_modules`/`.next` berkasnya dipindai Defender terus-menerus, dan binary Turbopack/SWC bisa terblokir Smart App Control. Di `~/projects/1upfarm` (ext4) tidak ada pemindaian Windows sama sekali.

Setup sekali:

```bash
npm ci
sudo npx playwright install --with-deps chromium   # butuh password sudo; library sistem libnspr4/libnss3
npm run build && npm run typecheck && npm run lint && npm run test && npm run test:e2e
```

### `.wslconfig` (opsional, di Windows)

Buat file `C:\Users\<kamu>\.wslconfig` lalu `wsl --shutdown`:

```ini
[wsl2]
memory=8GB
processors=4
localhostForwarding=true

[experimental]
autoMemoryReclaim=gradual
networkingMode=mirrored
```

## Troubleshooting Windows Smart App Control

**Gejala di Windows native (bukan bug kode):**

| Gejala                                                                                                    | Penyebab                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next dev --turbopack` gagal / "blocked" / window langsung mati, `npm run dev` error sebelum route tampil | Binary native Turbopack (`@next/swc-win32-x64-msvc`, `lightningcss`) adalah executables/DLL unsigned fresh → Smart App Control (App Control / Intelligent Security Graph) memblokirnya dengan keputusan AI, bukan karena malware. SmartScreen menandai file baru yang belum dikenal reputasinya. Webpack lolos karena murni JavaScript (JS tidak kena blokir App Control). |
| `npm install` / `npx playwright install` gagal download atau browser Chromium terblokir                   | Postinstall Playwright mengunduh executable Chromium baru (unsigned) → Smart App Control / Defender memblokir eksekusi dan memperlambat scan realtime di `node_modules`.                                                                                                                                                                                                   |
| Build di `/mnt/c/...` sangat lambat / file `node_modules` korup                                           | Defender real-time scanning + filesystem 9P WSL↔Windows. Bukan error Next.js.                                                                                                                                                                                                                                                                                              |

**Kenapa pindah ke WSL menyelesaikan:** Smart App Control & SmartScreen hanya memeriksa aplikasi Windows (`.exe`/`.dll` Windows). Di WSL2, Node + Turbopack = binary Linux ELF di filesystem ext4 — tidak dipindai Defender, tidak dievaluasi App Control. Repo ini **sudah** di `~/projects/1upfarm` (ext4) dan diverifikasi hijau: `build`, `typecheck`, `lint`, `test` (23/23), `test:e2e` (4/4).

**Kalau terpaksa tetap di Windows native (tidak disarankan):**

1. Matikan Smart App Control **tidak** dirkomendasikan — butuh reset GPU/driver bersih, tidak bisa diaktifkan lagi tanpa reset Windows. Alternatif aman: Windows Security → Virus & threat protection → Exclusion untuk folder `node_modules` + `.next` (anda atas risiko sendiri).
2. Pakai Webpack sementara: `next dev --webpack` / `next build --webpack` (murni JS, lolos blokir) — tapi ±2× lebih lambat dan bukan yang di-package (`package.json` memakai `--turbopack`).
3. Jangan install Playwright Chromium di Windows native untuk repo ini — jalankan e2e di WSL.

## Scripts

| Script                 | Fungsi                         |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Development server (Turbopack) |
| `npm run build`        | Production build (Turbopack)   |
| `npm run start`        | Jalankan hasil build           |
| `npm run lint`         | ESLint                         |
| `npm run typecheck`    | Generate tipe Next.js + tsc    |
| `npm run test`         | Vitest (run sekali)            |
| `npm run test:watch`   | Vitest watch                   |
| `npm run format`       | Prettier tulis                 |
| `npm run format:check` | Prettier cek                   |

Pre-commit hook menjalankan `lint` + `typecheck`.

## Performa navigasi: dev vs production (jangan bingung)

Aplikasi ini SPA-like (Next.js App Router) dengan navigasi client-side via `<Link>`, data lokal di Zustand — navigasi antar halaman **tidak** fetch backend, jadi di production seharusnya terasa instan seperti Duolingo/Habitica. Kalau di dev klik pertama terasa "lag/loading", itu **bukan bug** — itu perilaku dev server:

| Aspek                     | `npm run dev` (Turbopack)                                                                                                                                                                                                                                                                                                                             | `npm run build && npm run start` (production)                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Prefetch `<Link>`         | **Mati total — by design, bukan config.** Di source Next.js (`app-router-utils.ts`), `createPrefetchURL()` selalu `return null` saat `NODE_ENV === 'development'` ("Don't prefetch during development (improves compilation performance)"). Ini berlaku untuk `<Link>` maupun `router.prefetch()` — warmup di `app/app/layout.tsx` jadi no-op di dev. | Aktif saat link masuk viewport + warmup `router.prefetch()` di `app/app/layout.tsx` |
| Kompilasi route           | JIT per route saat pertama diklik → klik pertama lambat, klik kedua cepat. Turbopack mempercepat ini, tapi tetap tidak bisa 0ms seperti prod.                                                                                                                                                                                                         | Sudah ter-build → klik pertama pun cepat                                            |
| `staleTimes` router cache | —                                                                                                                                                                                                                                                                                                                                                     | `dynamic: 30, static: 180` di `next.config.ts` (default Next 16 `dynamic: 0`)       |

**Cara uji yang benar:**

```bash
npm run build
npm run start
```

Lalu login → tap `Home → Tanaman → To-do → Belajar → Profil → materi`. Klik pertama pun harusnya langsung tampil (atau skeleton nyaris tanpa jeda), tanpa perlu "pemanasan manual".

**Keputusan yang sudah diambil (konteks fix lag):**

- Nav memakai `<Link prefetch={true}>` (bukan `<a href>`), plus pemanasan semua tujuan nav di `app/app/layout.tsx` setelah hydrate — agar chunk + RSC dimuat di background sebelum user mengetuk.
- `app/app/loading.tsx` memberi skeleton instan saat navigasi (teks hanya `sr-only`), supaya klik tidak terasa freeze sambil chunk dimuat. Teks "Memuat kebunmu…" hanya tersisa sekali saat boot pertama di layout.
- Guard login terpusat di `app/app/layout.tsx` (`_hasHydrated` dari Zustand `persist`), bukan di tiap halaman — data lokal sinkron, tidak ada loading per halaman.
- Grafik Recharts (`ProductivityChart`) lazy-load (`next/dynamic`, `ssr: false`) di Home + Profil agar halaman tidak terblokir lib berat.
- Belajar: daftar materi Server Component (statis, chunk khusus cuma ±2.6 KB) dan detail memakai `generateStaticParams()` + `dynamicParams = false` — semua 5 materi ter-pre-render (SSG) saat build, bukan di-render on-demand per klik.

## Status

Fase 0 (fondasi) selesai. Layar produk dimulai pada Fase 1 — lihat `docs/product/build-plan.md`.
