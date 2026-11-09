export { cn } from "cn";

/**
 * Helper tanggal lokal (YYYY-MM-DD) — master-plan §3.
 * Tanpa lib tanggal tambahan; streak & rollover memakai string tanggal lokal.
 */

export function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Hari ini dalam zona lokal aplikasi (YYYY-MM-DD). */
export function todayString(now = new Date()): string {
  return toDateString(now);
}

export function addDaysStr(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return toDateString(date);
}

/** Selisih hari antara dua tanggal lokal (dateStrB - dateStrA). */
export function diffDaysStr(dateStrA: string, dateStrB: string): number {
  const [ay, am, ad] = dateStrA.split("-").map(Number);
  const [by, bm, bd] = dateStrB.split("-").map(Number);
  const ms = new Date(by, bm - 1, bd).getTime() - new Date(ay, am - 1, ad).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

/** Format tanggal id-ID untuk UI ("12 Jul 2026"). */
export function formatDateId(dateStr: string, opts?: Intl.DateTimeFormatOptions): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("id-ID", opts ?? { day: "numeric", month: "short", year: "numeric" }).format(date);
}

/** Format ISO datetime untuk UI id-ID. */
export function formatDateTimeId(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("id-ID", opts).format(date);
}
