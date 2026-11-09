import { describe, expect, it } from "vitest";
import { evaluateBadges } from "@/lib/badge-evaluator";

describe("badge-evaluator", () => {
  it("tunastumbuh saat tambah tanaman pertama", () => {
    const r = evaluateBadges({
      gardenPlantCount: 1,
      photoCount: 0,
      streak: 0,
      totalTasksDone: 0,
      harvestedCount: 0,
      level: 1,
      existingBadgeIds: [],
    });
    expect(r.newlyEarned.map((b) => b.id)).toContain("tunastumbuh");
  });

  it("foto-pertama saat isi foto pertama", () => {
    const r = evaluateBadges({
      gardenPlantCount: 1,
      photoCount: 1,
      streak: 0,
      totalTasksDone: 0,
      harvestedCount: 0,
      level: 1,
      existingBadgeIds: ["tunastumbuh"],
    });
    expect(r.newlyEarned.map((b) => b.id)).toContain("foto-pertama");
  });

  it("green-thumb di 50 task, streak-7 di 7 hari", () => {
    const r = evaluateBadges({
      gardenPlantCount: 1,
      photoCount: 0,
      streak: 7,
      totalTasksDone: 50,
      harvestedCount: 0,
      level: 1,
      existingBadgeIds: [],
    });
    const ids = r.newlyEarned.map((b) => b.id);
    expect(ids).toContain("streak-7");
    expect(ids).toContain("green-thumb");
  });

  it("tidak duplikat badge yang sudah ada", () => {
    const r = evaluateBadges({
      gardenPlantCount: 1,
      photoCount: 0,
      streak: 0,
      totalTasksDone: 0,
      harvestedCount: 0,
      level: 1,
      existingBadgeIds: ["tunastumbuh"],
    });
    expect(r.newlyEarned).toHaveLength(0);
  });

  it("level tier badges 5/15/30", () => {
    const r5 = evaluateBadges({ gardenPlantCount: 0, photoCount: 0, streak: 0, totalTasksDone: 0, harvestedCount: 0, level: 5, existingBadgeIds: [] });
    expect(r5.newlyEarned.map((b) => b.id)).toContain("pemula");
    const r30 = evaluateBadges({ gardenPlantCount: 0, photoCount: 0, streak: 0, totalTasksDone: 0, harvestedCount: 0, level: 30, existingBadgeIds: ["pemula", "berkelanjutan"] });
    expect(r30.newlyEarned.map((b) => b.id)).toContain("professional");
  });
});
