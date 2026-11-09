"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGardenStore, DEMO_USERNAME, DEMO_PASSWORD } from "@/store/useGardenStore";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const login = useGardenStore((s) => s.login);
  const loginWithDemo = useGardenStore((s) => s.loginWithDemo);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const res = await login(username, password);
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? "Username atau password salah.");
      return;
    }
    toast.success("Selamat datang kembali!");
    router.replace("/app/home");
  }

  async function onDemo() {
    setError(null);
    setBusy(true);
    const res = await loginWithDemo();
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? "Ada yang salah. Coba lagi.");
      return;
    }
    toast.success("Selamat datang kembali!");
    router.replace("/app/home");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md rounded-xl shadow-pop">
        <CardHeader>
          <CardTitle>Masuk</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-sm font-bold text-foreground">
                Username
              </label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-bold text-foreground">
                Password
              </label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
            </div>
            {error ? (
              <p role="alert" className="text-sm font-semibold text-danger">
                {error}
              </p>
            ) : null}
            <Button type="submit" size="lg" disabled={busy} className="min-h-[44px] bg-primary-gradient text-white">
              {busy ? "Memproses…" : "Masuk"}
            </Button>
            <div className="rounded-lg bg-muted px-4 py-3 text-center">
              <p className="text-xs font-semibold text-muted-foreground">
                Akun demo: <span className="font-extrabold text-foreground">{DEMO_USERNAME}</span> /{" "}
                <span className="font-extrabold text-foreground">{DEMO_PASSWORD}</span>
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-2 min-h-[44px] w-full"
                disabled={busy}
                onClick={() => void onDemo()}
              >
                Coba akun demo
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <a href="/register" className="font-bold text-primary underline underline-offset-4">
                Daftar
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
