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

> Scaffold ini memakai Webpack (`next dev --webpack` / `next build --webpack`) karena Turbopack tidak tersedia di lingkungan build saat ini.

## Scripts

| Script                 | Fungsi                       |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Development server (Webpack) |
| `npm run build`        | Production build (Webpack)   |
| `npm run start`        | Jalankan hasil build         |
| `npm run lint`         | ESLint                       |
| `npm run typecheck`    | Generate tipe Next.js + tsc  |
| `npm run test`         | Vitest (run sekali)          |
| `npm run test:watch`   | Vitest watch                 |
| `npm run format`       | Prettier tulis               |
| `npm run format:check` | Prettier cek                 |

Pre-commit hook menjalankan `lint` + `typecheck`.

## Status

Fase 0 (fondasi) selesai. Layar produk dimulai pada Fase 1 — lihat `docs/product/build-plan.md`.
