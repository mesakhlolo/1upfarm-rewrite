import { describe, expect, it } from "vitest";
import { getPlantBySlug } from "@/data/plants";
import { currentDayFor, generateTasks, tasksForDate } from "@/lib/plant-engine";

describe("plant-engine", () => {
  it("generateTasks selada hari 1 ada task", () => {
    const plant = getPlantBySlug("selada")!;
    const tasks = generateTasks(plant, "gp-1", "2026-11-01");
    expect(tasks.length).toBeGreaterThan(0);
    const day1 = tasksForDate(tasks, "2026-11-01");
    expect(day1.length).toBeGreaterThanOrEqual(1);
    expect(day1.length).toBeLessThanOrEqual(2);
  });

  it("cap 2 task per hari", () => {
    const plant = getPlantBySlug("cabai-rawit")!;
    const tasks = generateTasks(plant, "gp-2", "2026-11-01");
    const byDate = new Map<string, number>();
    for (const t of tasks) byDate.set(t.dateStr, (byDate.get(t.dateStr) ?? 0) + 1);
    for (const count of byDate.values()) expect(count).toBeLessThanOrEqual(2);
  });

  it("recurring siram tiap hari di rentang", () => {
    const plant = getPlantBySlug("selada")!;
    const tasks = generateTasks(plant, "gp-1", "2026-11-01");
    const day2 = tasksForDate(tasks, "2026-11-02");
    // Hari 2: Siram (recurring) ada
    expect(day2.some((t) => t.type === "Siram")).toBe(true);
  });

  it("photo checkpoint muncul di hari milestone", () => {
    const plant = getPlantBySlug("selada")!;
    const tasks = generateTasks(plant, "gp-1", "2026-11-01");
    // Day 7 = foto milestone + siram + cek hama (cap 2) → Foto harus ada (prioritas tinggi)
    const hasPhotoDay = tasks.some((t) => t.day === 7 && t.type === "Foto");
    expect(hasPhotoDay).toBe(true);
  });

  it("ID deterministik unik", () => {
    const plant = getPlantBySlug("kangkung")!;
    const a = generateTasks(plant, "gp-x", "2026-11-01");
    const b = generateTasks(plant, "gp-x", "2026-11-01");
    expect(a.map((t) => t.id)).toEqual(b.map((t) => t.id));
    expect(new Set(a.map((t) => t.id)).size).toBe(a.length);
  });

  it("currentDayFor", () => {
    expect(currentDayFor("2026-11-01", "2026-11-01")).toBe(1);
    expect(currentDayFor("2026-11-01", "2026-11-02")).toBe(2);
    expect(currentDayFor("2026-11-01", "2026-10-31")).toBe(1);
  });

  it("reward easy 10 EXP / 5 HP penalty", () => {
    const plant = getPlantBySlug("selada")!;
    const tasks = generateTasks(plant, "gp-1", "2026-11-01");
    expect(tasks[0].exp).toBe(10);
    expect(tasks[0].gold).toBe(5);
    expect(tasks[0].hpPenalty).toBe(5);
  });

  it("reward hard 35 EXP / 18 gold / 12 penalty", () => {
    const plant = getPlantBySlug("cabai-rawit")!;
    const tasks = generateTasks(plant, "gp-2", "2026-11-01");
    expect(tasks[0].exp).toBe(35);
    expect(tasks[0].gold).toBe(18);
    expect(tasks[0].hpPenalty).toBe(12);
  });
});
