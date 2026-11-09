import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-extrabold text-foreground">Halaman nggak ditemukan.</h1>
      <Button asChild size="lg">
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </main>
  );
}
