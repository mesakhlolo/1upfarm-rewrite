/**
 * Pengingat Notification API best-effort — ui-copy.md §15 + Fase 12.
 * Tanpa push server MVP. Cek harian jam 08:00 saat app terbuka.
 */

export async function requestNotificationPermission(): Promise<NotificationPermission | "unsupported"> {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  try {
    return await Notification.requestPermission();
  } catch {
    return "denied";
  }
}

/**
 * Kirim notifikasi test / pengingat.
 * Copy dari ui-copy §15 bila dipanggil dari halaman.
 */
export function notify(title: string, body: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    new Notification(title, { body, tag: `1upfarm-${title}` });
  } catch {
    // abaikan — best-effort
  }
}

export function scheduleDailyCheck(getTasksToday: () => { tasksToday: number; hp: number; hasPhotoToday: boolean }) {
  // Cek tiap menit; kalau jam 08:00 dan ada tugas, notif siram
  const tick = () => {
    const now = new Date();
    if (now.getHours() === 8 && now.getMinutes() < 1) {
      const { tasksToday, hp, hasPhotoToday } = getTasksToday();
      if (hp > 0 && hp <= 30) notify("Darah tanamanmu menurun", "Darah tanamanmu menurun — rawat sekarang.");
      else if (hasPhotoToday) notify("Waktunya foto bukti tumbuh", "Waktunya foto bukti tumbuh 📸");
      else if (tasksToday > 0) notify("Waktunya siram", "Waktunya siram 💧");
      else notify("Cek tanamanmu hari ini", "Cek tanamanmu hari ini 🌱");
    }
  };
  const id = setInterval(tick, 60_000);
  return () => clearInterval(id);
}
