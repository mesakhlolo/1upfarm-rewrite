import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Home, ListTodo, Sprout, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BottomNav — design-system §5 (mobile <768px).
 * 5 slot: Home · Tanaman · [To-do tengah menonjol] · Belajar · Profil.
 * Belum di-mount ke route produksi (hanya preview di /kitchen-sink).
 */
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  prominent?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/app/home", label: "Home", icon: Home },
  { href: "/app/plants", label: "Tanaman", icon: Sprout },
  { href: "/app/tasks", label: "To-do", icon: ListTodo, prominent: true },
  { href: "/app/learn", label: "Belajar", icon: BookOpen },
  { href: "/app/profile", label: "Profil", icon: User },
];

export function BottomNav({ activeHref, className }: { activeHref?: string; className?: string }) {
  return (
    <nav
      aria-label="Navigasi utama"
      className={cn("fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 pt-1 backdrop-blur lg:hidden", className)}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeHref === item.href;
          const Icon = item.icon;
          if (item.prominent) {
            return (
              <li key={item.href} className="flex flex-col items-center">
                <Link
                  href={item.href}
                  prefetch={true}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className="flex min-h-11 min-w-11 -translate-y-4 flex-col items-center justify-center rounded-full bg-primary-gradient p-3 text-primary-foreground shadow-pop outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Icon className="size-6" aria-hidden />
                </Link>
                <span className={cn("pb-1 text-xs", isActive ? "font-extrabold text-primary" : "font-bold text-muted-foreground")}>
                  {item.label}
                </span>
              </li>
            );
          }
          return (
            <li key={item.href} className="flex flex-col items-center">
              <Link
                href={item.href}
                prefetch={true}
                aria-current={isActive ? "page" : undefined}
                className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className={cn("size-5", isActive ? "text-primary" : "text-muted-foreground")} aria-hidden />
                <span className={cn("text-xs", isActive ? "font-extrabold text-primary" : "font-bold text-muted-foreground")}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
