"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-extrabold text-foreground">Ada yang salah. Coba lagi.</h1>
      <p className="text-sm text-muted-foreground">Progres disimpan lokal. Coba muat ulang.</p>
      <Button size="lg" onClick={() => reset()}>
        Coba lagi
      </Button>
    </main>
  );
}
