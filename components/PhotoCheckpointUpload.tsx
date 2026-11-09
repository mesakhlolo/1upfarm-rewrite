"use client";

import { useRef, useState } from "react";
import { Camera, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { compressPhoto } from "@/lib/image";
import { cn } from "@/lib/utils";

/**
 * PhotoCheckpointUpload — ui-copy §10 + photo-checkpoint-spec §4-§7.
 * Judul "Bukti tumbuh". CTA "Ambil / Unggah Foto". Sukses "Keren! +{hp} HP, +{exp} EXP."
 * Tanpa foto: "Nanti saja".
 */
export function PhotoCheckpointUpload({
  plantName,
  stage,
  day,
  existingImage,
  onUpload,
  onDismiss,
}: {
  plantName: string;
  stage: string;
  day: number;
  existingImage?: string;
  onUpload: (dataUrl: string) => void;
  onDismiss?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setBusy(true);
    try {
      const dataUrl = await compressPhoto(file);
      onUpload(dataUrl);
    } catch {
      setError("Kamera nggak bisa diakses. Unggah foto dari galeri.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-extrabold text-foreground">Bukti tumbuh</p>
          <p className="text-xs font-medium text-muted-foreground">
            {plantName} • Hari {day} • {stage}
          </p>
          <p className="text-xs text-muted-foreground">Foto tanamanmu di tahap ini.</p>
        </div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Nanti saja"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-5" aria-hidden />
          </button>
        ) : null}
      </div>

      {existingImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={existingImage} alt={`Bukti tumbuh ${plantName} tahap ${stage}`} className="h-40 w-full rounded-md object-cover" />
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted/50 text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          aria-label="Ambil atau unggah foto"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Camera className="size-5" aria-hidden />
          </span>
          <span className="text-sm font-bold">{busy ? "Memuat…" : "Ambil / Unggah Foto"}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        aria-label="Pilih foto tanaman"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
      />

      {error ? (
        <p role="alert" className="text-sm font-semibold text-danger">
          {error}
        </p>
      ) : null}
      {busy ? (
        <p className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden /> Mengompresi foto…
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className={cn(existingImage && "hidden")}
        >
          <Camera className="size-4" aria-hidden /> Ganti foto
        </Button>
        {existingImage ? (
          <Button type="button" size="sm" variant="outline" onClick={() => inputRef.current?.click()} disabled={busy}>
            <Camera className="size-4" aria-hidden /> Ambil / Unggah Foto
          </Button>
        ) : null}
        {existingImage ? <p className="text-xs font-bold text-stat-growth">Keren! +5 HP, +10 EXP.</p> : null}
        {!existingImage && onDismiss ? (
          <Button type="button" size="sm" variant="ghost" onClick={onDismiss}>
            Nanti saja
          </Button>
        ) : null}
      </div>
    </div>
  );
}
