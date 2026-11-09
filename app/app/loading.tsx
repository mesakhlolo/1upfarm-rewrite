// Loading boundary segmen /app — menampilkan skeleton instan saat navigasi
// (chunk/RSC dimuat di background), bukan layar freeze. Teks hanya sr-only
// agar tidak terasa seperti "loading" tiap pindah halaman.
export default function AppLoading() {
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
