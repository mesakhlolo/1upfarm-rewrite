"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Download, Upload, LogOut, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGardenStore } from "@/store/useGardenStore";
import { requestNotificationPermission } from "@/lib/reminder";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const currentUser = useGardenStore((s) => s.currentUser);
  const logout = useGardenStore((s) => s.logout);
  const setNotificationEnabled = useGardenStore((s) => s.setNotificationEnabled);
  const exportData = useGardenStore((s) => s.exportData);
  const importData = useGardenStore((s) => s.importData);

  const [confirmLogout, setConfirmLogout] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleToggleNotification(checked: boolean) {
    if (checked) {
      const perm = await requestNotificationPermission();
      if (perm === "granted" || perm === "unsupported") {
        setNotificationEnabled(true);
        toast.success("Pengingat diaktifkan.");
      } else {
        toast.error("Izin notifikasi ditolak. Cek pengaturan browser.");
      }
    } else {
      setNotificationEnabled(false);
      toast.info("Pengingat dimatikan.");
    }
  }

  function handleExport() {
    const data = exportData();
    const today = new Date().toISOString().slice(0, 10);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `1upfarm-data-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Ekspor selesai.");
  }

  async function handleImportFile(file: File) {
    setBusy(true);
    try {
      const text = await file.text();
      const res = importData(text);
      if (res.ok) toast.success("Impor selesai. Data pulih!");
      else toast.error(res.error ?? "Ada yang salah. Coba lagi.");
    } catch {
      toast.error("File tidak bisa dibaca.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function handleLogout() {
    logout();
    toast.success("Kamu sudah keluar. Progres tetap tersimpan di perangkat ini.");
    router.push("/login");
  }

  if (!currentUser) return <p className="text-base font-semibold text-muted-foreground">Memuat kebunmu…</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold text-foreground">Pengaturan</h1>

      <Card className="rounded-lg divide-y divide-border shadow-soft">
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary" aria-hidden>
              <Bell className="size-5" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-foreground">Notifikasi pengingat</p>
              <p className="text-xs font-medium text-muted-foreground">Pengingat siram &amp; perawatan harian.</p>
            </div>
          </div>
          <label className="relative inline-flex min-h-[44px] cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={currentUser.notificationEnabled}
              onChange={(e) => void handleToggleNotification(e.target.checked)}
              aria-label="Notifikasi pengingat"
            />
            <span className="h-6 w-11 rounded-full bg-muted transition peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring" aria-hidden />
            <span className="absolute left-1 top-1/2 size-4 -translate-y-1/2 rounded-full bg-white shadow transition peer-checked:translate-x-5" aria-hidden />
          </label>
        </div>

        <div className="flex items-center gap-3 p-4">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary" aria-hidden>
            <Globe className="size-5" />
          </span>
          <div>
            <p className="text-sm font-extrabold text-foreground">Bahasa: Indonesia</p>
            <p className="text-xs text-muted-foreground">MVP hanya Bahasa Indonesia.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <p className="text-sm font-extrabold text-foreground">Data</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="button" variant="outline" className="min-h-[44px] flex-1" onClick={handleExport}>
              <Download className="size-4" aria-hidden /> Ekspor data
            </Button>
            <Button type="button" variant="outline" className="min-h-[44px] flex-1" disabled={busy} onClick={() => fileRef.current?.click()}>
              <Upload className="size-4" aria-hidden /> {busy ? "Memproses…" : "Impor data"}
            </Button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="sr-only"
            aria-label="Pilih file impor JSON"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleImportFile(f);
            }}
          />
          <p className="text-xs font-medium text-muted-foreground">
            Foto bukti tumbuh disimpan hanya di perangkat ini. Saat ekspor/impor, foto disertakan dalam JSON lokal — jangan bagikan file ke pihak lain.
          </p>
        </div>

        <div className="p-4">
          <Button type="button" variant="destructive" className="min-h-[44px] w-full" onClick={() => setConfirmLogout(true)}>
            <LogOut className="size-4" aria-hidden /> Keluar
          </Button>
        </div>
      </Card>

      <Dialog open={confirmLogout} onOpenChange={setConfirmLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yakin mau keluar?</DialogTitle>
            <DialogDescription>Progres kebunmu tetap tersimpan di perangkat ini.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmLogout(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Keluar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
