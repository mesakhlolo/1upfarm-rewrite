import { describe, expect, it } from "vitest";
import {
  addExp,
  applyDamage,
  applyHeal,
  checkStreak,
  expNeed,
  getTier,
  isHpLow,
  isLayu,
  reviveHp,
} from "@/lib/gamification";

describe("gamification", () => {
  it("expNeed = 50 * L", () => {
    expect(expNeed(1)).toBe(50);
    expect(expNeed(2)).toBe(100);
    expect(expNeed(5)).toBe(250);
  });

  it("addExp overflow ke level berikutnya", () => {
    const r = addExp({ level: 1, xp: 40 }, 20);
    expect(r.level).toBe(2);
    expect(r.xp).toBe(10);
    expect(r.leveledUp).toBe(true);
  });

  it("addExp beberapa level", () => {
    const r = addExp({ level: 1, xp: 0 }, 160);
    // 50 -> L2 (sisa 110), 100 -> L3 (sisa 10)
    expect(r.level).toBe(3);
    expect(r.xp).toBe(10);
  });

  it("HP clamp 0..100, heal tidak melebihi max", () => {
    expect(applyDamage(100, 5)).toBe(95);
    expect(applyDamage(3, 10)).toBe(0);
    expect(applyHeal(98, 10)).toBe(100);
    expect(isHpLow(30)).toBe(true);
    expect(isHpLow(31)).toBe(false);
    expect(isLayu(0)).toBe(true);
    expect(reviveHp()).toBe(50);
  });

  it("tier Pemula/Berkelanjutan/Professional", () => {
    expect(getTier(1)).toBe("Pemula");
    expect(getTier(9)).toBe("Pemula");
    expect(getTier(10)).toBe("Berkelanjutan");
    expect(getTier(24)).toBe("Berkelanjutan");
    expect(getTier(25)).toBe("Professional");
  });

  it("streak +1 saat semua selesai 2 hari berturut", () => {
    const r1 = checkStreak({ streak: 0, lastCompletedDate: null, today: "2026-11-01", allDoneToday: true, streakFreeze: 0 });
    expect(r1.streak).toBe(1);
    const r2 = checkStreak({ streak: r1.streak, lastCompletedDate: r1.lastCompletedDate, today: "2026-11-02", allDoneToday: true, streakFreeze: 0 });
    expect(r2.streak).toBe(2);
  });

  it("streak reset saat bolong >1 hari", () => {
    const r = checkStreak({ streak: 5, lastCompletedDate: "2026-11-01", today: "2026-11-04", allDoneToday: true, streakFreeze: 0 });
    expect(r.streak).toBe(1);
  });

  it("streak freeze menyelamatkan 1 hari bolong", () => {
    const r = checkStreak({ streak: 3, lastCompletedDate: "2026-11-01", today: "2026-11-03", allDoneToday: true, streakFreeze: 1 });
    expect(r.streak).toBe(4);
    expect(r.freezeUsed).toBe(true);
    expect(r.streakFreeze).toBe(0);
  });

  it("tidak double count hari yang sama", () => {
    const r = checkStreak({ streak: 2, lastCompletedDate: "2026-11-01", today: "2026-11-01", allDoneToday: true, streakFreeze: 0 });
    expect(r.streak).toBe(2);
    expect(r.streakGained).toBe(false);
  });
});
