// Server Component: daftar materi statis — tanpa JS/hidrasi, prefetch penuh
// agar klik langsung instan (dulu "use client" tanpa hooks, jadi chunk JS
// ikut dimuat sia-sia untuk konten statis).
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { LEARN_ARTICLES } from "@/data/learn";
import { Card } from "@/components/ui/card";

export default function LearnPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Belajar</h1>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">Panduan dari katalog &amp; riset — mudah dibaca di layar kecil.</p>
      </div>

      <div className="flex flex-col gap-3">
        {LEARN_ARTICLES.map((a) => (
          <Link key={a.slug} href={`/app/learn/${a.slug}`} prefetch={true} className="focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
            <Card className="flex flex-row items-center gap-4 rounded-lg p-4 shadow-soft">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary" aria-hidden>
                <BookOpen className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-extrabold text-foreground">{a.title}</span>
                <span className="block truncate text-sm text-muted-foreground">{a.excerpt}</span>
                <span className="mt-1 block text-xs font-medium text-muted-foreground">Sumber: {a.source}</span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
