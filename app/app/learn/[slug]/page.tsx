import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { getLearnArticle } from "@/data/learn";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function LearnDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary" aria-hidden>
          <BookOpen className="size-5" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">{article.title}</h1>
          <p className="text-sm font-semibold text-muted-foreground">{article.excerpt}</p>
        </div>
      </div>

      <Card className="rounded-lg p-5 shadow-soft">
        <div className="flex flex-col gap-4 text-base leading-7 text-foreground prose prose-sm max-w-none">
          {article.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-7 font-medium text-foreground">
              {p}
            </p>
          ))}
          {article.bullets?.length ? (
            <ul className="flex list-disc flex-col gap-2 pl-5">
              {article.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <p className="mt-6 border-t border-border pt-3 text-xs font-medium text-muted-foreground">
          Sumber: {article.source} • Konten dari docs/, bukan karangan.
        </p>
      </Card>

      <Button asChild variant="outline" className="min-h-[44px]">
        <Link href="/app/learn">Kembali ke Belajar</Link>
      </Button>
    </div>
  );
}
