"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Users, Trash2, LogIn, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEED_ACCOUNTS } from "@/lib/seed-accounts";
import { useGardenStore } from "@/store/useGardenStore";
import { toast } from "sonner";

export default function DevSeedPage() {
  const router = useRouter();
  const loginWithSeed = useGardenStore((s) => s.loginWithSeed);
  const resetTestAccounts = useGardenStore((s) => s.resetTestAccounts);
  const ageCurrentPlants = useGardenStore((s) => s.ageCurrentPlants);
  const currentUser = useGardenStore((s) => s.currentUser);
  const myPlants = useGardenStore((s) => s.myPlants);
  const [busy, setBusy] = useState<string | null>(null);

  async function onLogin(id: string) {
    setBusy(id);
    const res = await loginWithSeed(id);
    setBusy(null);
    if (!res.ok) {
      toast.error(res.error ?? "Ada yang salah. Coba lagi.");
      return;
    }
    toast.success("Selamat datang kembali!");
    router.replace("/app/home");
  }

  function onAge(days: number) {
    if (!currentUser) {
      toast.error("Masuk dulu sebagai salah satu akun di bawah.");
      return;
    }
    const res = ageCurrentPlants(days);
    if (!res.ok) {
      toast.error("Tidak ada tanaman untuk dituakan.");
      return;
    }
    toast.success(`Tanaman dituakan +${days} hari. Buka /app/plan untuk cek tombol panen.`);
  }

  function onReset() {
    resetTestAccounts();
    toast.success("Semua akun test dihapus. Klik Masuk lagi untuk seed ulang dari awal.");
  }

  return (
    <main className="flex min-h-screen flex-col gap-6 bg-background px-4 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div>
          <Link href="/login" className="inline-flex min-h-[44px] items-center gap-1 text-sm font-bold text-primary underline-offset-4 hover:underline">
            <ArrowLeft className="size-4" aria-hidden /> Kembali ke Masuk
          </Link>
          <h1 className="mt-2 text-2xl font-extrabold text-foreground">Dev Seed — Akun Test</h1>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            Pura-pura jadi user dengan case berbeda-beda. Semua data tersimpan di localStorage (
            <code className="rounded bg-muted px-1">1upfarm-garden</code>) seperti akun register asli. Password semua{" "}
            <code className="rounded bg-muted px-1">test1234</code> kecuali <code className="rounded bg-muted px-1">demo / demo123</code>.
          </p>
        </div>

        <Card className="flex flex-col gap-3 rounded-lg p-4 shadow-soft">
          <h2 className="flex items-center gap-2 text-base font-extrabold text-foreground">
            <Clock className="size-5 text-primary" aria-hidden /> Mesin waktu — selesaikan 1 tanaman tanpa nunggu 30–120 hari
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm font-semibold text-muted-foreground">
            <li>
              <strong className="text-foreground">Paling cepat (1 klik):</strong> masuk sebagai{" "}
              <button type="button" className="font-extrabold text-primary underline underline-offset-4" onClick={() => void onLogin("siap-panen")}>
                panen (Kangkung hari ke-30)
              </button>{" "}
              → langsung ada tombol <strong className="text-foreground">Panen Sekarang</strong>.
            </li>
            <li>
              <strong className="text-foreground">Wizard backdate:</strong> Daftar akun baru → Tambah Tanaman →{" "}
              <em>Pilih tanggal</em> → isi <code className="rounded bg-muted px-1">hari ini − (growDays.max − 1)</code>. Kangkung/Bayam/Pakcoy max
              30 → 29 hari lalu. Selada max 45 → 44 hari lalu. Tomat 120 → 119 hari lalu.
            </li>
            <li>
              <strong className="text-foreground">Tombol di bawah (akun yang sedang masuk):</strong> menggeser{" "}
              <code className="rounded bg-muted px-1">startedAt</code> + semua <code className="rounded bg-muted px-1">dateStr</code> task ke
              lampau. Cek lagi <code className="rounded bg-muted px-1">/app/plan/{"{id}"}</code>.
            </li>
            <li>
              <strong className="text-foreground">Console (manual):</strong> DevTools → Application → Local Storage → edit JSON key{" "}
              <code className="rounded bg-muted px-1">1upfarm-garden</code>, ubah <code className="rounded bg-muted px-1">gardenPlants[*].startedAt</code>{" "}
              ke tanggal lampau yang sama, simpan, refresh.
            </li>
          </ol>
          <p className="text-sm font-semibold text-muted-foreground">
            Sedang masuk: {currentUser ? `${currentUser.displayName} (@${currentUser.username}) • ${myPlants.length} tanaman` : "belum masuk"}
          </p>
          <div className="flex flex-wrap gap-2">
            {[7, 14, 29, 44].map((d) => (
              <Button key={d} type="button" variant="outline" className="min-h-[44px]" onClick={() => onAge(d)}>
                Tua-kan +{d} hari
              </Button>
            ))}
          </div>
          <p className="text-xs font-semibold text-muted-foreground">
            Tip: Kangkung (30 hari) adalah yang tercepat untuk panen pertama. Panen muncul saat{" "}
            <code className="rounded bg-muted px-1">currentDay &gt;= growDaysMax</code>.
          </p>
        </Card>

        <section aria-labelledby="daftar-akun" className="flex flex-col gap-3">
          <h2 id="daftar-akun" className="flex items-center gap-2 text-lg font-extrabold text-foreground">
            <Users className="size-5 text-primary" aria-hidden /> Daftar akun ({SEED_ACCOUNTS.length})
          </h2>
          {SEED_ACCOUNTS.map((s) => (
            <Card key={s.id} className="flex flex-col gap-3 rounded-lg p-4 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-base font-extrabold text-foreground">{s.title}</p>
                  <p className="mt-0.5 text-sm font-bold text-primary">
                    {s.username} / {s.password}
                  </p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{s.description}</p>
                </div>
                <Button type="button" size="lg" className="min-h-[44px] shrink-0 bg-primary-gradient text-white" disabled={busy === s.id} onClick={() => void onLogin(s.id)}>
                  <LogIn className="size-4" aria-hidden /> {busy === s.id ? "Masuk…" : "Masuk sebagai"}
                </Button>
              </div>
              <ul className="list-disc space-y-1 pl-5 text-xs font-semibold text-muted-foreground">
                {s.expect.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </Card>
          ))}
        </section>

        <Card className="flex flex-col gap-3 rounded-lg p-4 shadow-soft">
          <h2 className="text-base font-extrabold text-foreground">Reset</h2>
          <p className="text-sm font-semibold text-muted-foreground">
            Hapus semua akun seed di atas dari localStorage. Akun register manual lain tidak dihapus. Masuk lagi setelah reset = seed ulang dari awal.
          </p>
          <Button type="button" variant="outline" className="min-h-[44px]" onClick={onReset}>
            <Trash2 className="size-4" aria-hidden /> Reset semua akun test
          </Button>
          <Button asChild variant="outline" className="min-h-[44px]">
            <Link href="/app/home">Ke Home (akun saat ini)</Link>
          </Button>
          <Button asChild variant="outline" className="min-h-[44px]">
            <Link href="/login">Ke Login (manual)</Link>
          </Button>
        </Card>
      </div>
    </main>
  );
}
