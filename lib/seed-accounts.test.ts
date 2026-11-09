import { describe, expect, it } from "vitest";
import { SEED_ACCOUNTS, findSeedAccount, daysAgoStr } from "@/lib/seed-accounts";
import { getPlantBySlug } from "@/data/plants";
import { currentDayFor } from "@/lib/plant-engine";
import { todayString } from "@/lib/utils";

describe("seed-accounts", () => {
  it("unik username + password ≥6 karakter", () => {
    const usernames = SEED_ACCOUNTS.map((s) => s.username.toLowerCase());
    expect(new Set(usernames).size).toBe(usernames.length);
    for (const s of SEED_ACCOUNTS) {
      expect(s.password.length).toBeGreaterThanOrEqual(6);
      expect(s.plants.length).toBeGreaterThanOrEqual(0);
    }
  });

  it("siap-panen: Kangkung mulai 29 hari lalu → currentDay = 30 = growDaysMax", () => {
    const seed = findSeedAccount("siap-panen")!;
    expect(seed).toBeDefined();
    const spec = seed.plants[0];
    const plant = getPlantBySlug(spec.slug)!;
    const startedAt = daysAgoStr(spec.daysAgo, todayString());
    expect(currentDayFor(startedAt, todayString())).toBe(plant.growDays.max);
  });

  it("selada siap panen butuh 44 hari lalu (max 45)", () => {
    const plant = getPlantBySlug("selada")!;
    const startedAt = daysAgoStr(plant.growDays.max - 1, todayString());
    expect(currentDayFor(startedAt, todayString())).toBe(plant.growDays.max);
  });

  it("baru-kosong tidak punya tanaman & badge", () => {
    const seed = findSeedAccount("baru-kosong")!;
    expect(seed.plants.length).toBe(0);
    expect(seed.badges.length).toBe(0);
    expect(seed.level).toBe(1);
    expect(seed.hp).toBe(100);
  });

  it("hp-rendah ≤30 dan streak-7 ≥7", () => {
    expect(findSeedAccount("hp-rendah")!.hp).toBeLessThanOrEqual(30);
    expect(findSeedAccount("streak-7")!.streak).toBeGreaterThanOrEqual(7);
  });

  it("semua spec slug valid + media tersedia", () => {
    for (const s of SEED_ACCOUNTS) {
      for (const p of s.plants) {
        const plant = getPlantBySlug(p.slug);
        expect(plant, `${s.id}:${p.slug}`).toBeDefined();
        expect(plant!.media).toContain(p.media);
        expect(p.daysAgo).toBeLessThanOrEqual(plant!.growDays.max);
      }
    }
  });
});
