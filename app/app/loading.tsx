"use client";

// Loading boundary segmen /app — skeleton hanya muncul jika navigasi >300ms.
// Navigasi cepat di bawah 300ms tidak menampilkan skeleton sama sekali,
// sehingga terasa instan seperti Duolingo/Habitica (halaman lama
// dipertahankan Next sampai chunk baru siap). Teks hanya sr-only.
import { useEffect, useState } from "react";

export default function AppLoading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div aria-live="polite" className="flex flex-col gap-6">
      <span className="sr-only">Memuat…</span>
      <div className="flex animate-pulse flex-col gap-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="size-11 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="h-3 w-1/3 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
