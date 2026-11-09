import { DIFFICULTY_REWARDS, type Plant } from "@/data/plants";
import { addDaysStr } from "@/lib/utils";

export type TaskType = "Siram" | "Pupuk" | "Cek hama" | "Pangkas" | "Panen" | "Foto";
export type TaskStatus = "todo" | "done" | "missed";

export interface EngineTask {
  id: string;
  gardenPlantId: string;
  plantSlug: string;
  plantName: string;
  day: number;
  dateStr: string;
  title: string;
  type: TaskType;
  difficulty: Plant["difficulty"];
  exp: number;
  gold: number;
  hpPenalty: number;
  status: TaskStatus;
  isPhaseTask?: boolean;
  isPhotoCheckpoint?: boolean;
}

const TYPE_MAP: Record<string, TaskType> = {
  water: "Siram",
  fertilize: "Pupuk",
  check: "Cek hama",
  prune: "Pangkas",
  harvest: "Panen",
  photo: "Foto",
};

function mapType(raw: string, label: string): TaskType {
  const lower = label.toLowerCase();
  if (lower.includes("siram") || raw === "water") return "Siram";
  if (lower.includes("pupuk") || raw === "fertilize") return "Pupuk";
  if (lower.includes("hama") || lower.includes("siangi") || raw === "check") return "Cek hama";
  if (lower.includes("pangkas") || raw === "prune") return "Pangkas";
  if (lower.includes("panen") || raw === "harvest") return "Panen";
  if (lower.includes("foto") || raw === "photo") return "Foto";
  const mapped = TYPE_MAP[raw];
  return mapped ?? "Siram";
}

function inferTypeFromPhaseTitle(title: string): TaskType {
  const t = title.toLowerCase();
  if (t.includes("panen")) return "Panen";
  if (t.includes("pupuk")) return "Pupuk";
  if (t.includes("pangkas")) return "Pangkas";
  if (t.includes("siram")) return "Siram";
  if (t.includes("hama") || t.includes("cek")) return "Cek hama";
  return "Siram";
}

/**
 * Generate task 1..N dari phases + recurring + photoCheckpoints.
 * Sumber: plants.json phases/recurring/photoCheckpoints + gameplay §3 (1–2 task/hari).
 * Cap 2 task per hari per tanaman.
 */
export function generateTasks(plant: Plant, gardenPlantId: string, startedAtDateStr: string): EngineTask[] {
  const reward = DIFFICULTY_REWARDS[plant.difficulty];
  const maxDay = plant.growDays.max;
  const tasks: EngineTask[] = [];

  for (let day = 1; day <= maxDay; day++) {
    const dateStr = addDaysStr(startedAtDateStr, day - 1);
    type Cand = { title: string; type: TaskType; priority: number; idSuffix: string; isPhase?: boolean; isPhoto?: boolean };
    const candidates: Cand[] = [];

    // Phase task: kalau hari ini = startDay fase
    for (const phase of plant.phases) {
      if (phase.startDay === day) {
        candidates.push({
          title: phase.task,
          type: inferTypeFromPhaseTitle(phase.task),
          priority: 0,
          idSuffix: `phase-${phase.id}`,
          isPhase: true,
        });
      }
    }

    // Recurring
    for (const rec of plant.careSchedule) {
      if (day >= rec.startDay && day <= rec.endDay) {
        const offset = day - rec.startDay;
        if (rec.everyDays <= 1 || offset % rec.everyDays === 0) {
          candidates.push({
            title: rec.label,
            type: mapType(rec.type, rec.label),
            priority: 1,
            idSuffix: `rec-${rec.type}-${rec.label}`,
          });
        }
      }
    }

    // Photo checkpoint — prioritas sama dengan phase agar tidak terbuang cap 2/hari
    for (const cp of plant.photoCheckpoints) {
      if (cp.day === day) {
        candidates.push({
          title: `Foto bukti tumbuh — ${cp.stage}`,
          type: "Foto",
          priority: 0,
          idSuffix: `photo-${cp.stage}`,
          isPhoto: true,
        });
      }
    }

    if (candidates.length === 0) continue;

    candidates.sort((a, b) => a.priority - b.priority);
    const limited = candidates.slice(0, 2);

    for (const c of limited) {
      tasks.push({
        id: `${gardenPlantId}-d${day}-${c.idSuffix}`,
        gardenPlantId,
        plantSlug: plant.slug,
        plantName: plant.name,
        day,
        dateStr,
        title: c.title,
        type: c.type,
        difficulty: plant.difficulty,
        exp: reward.exp,
        gold: reward.gold,
        hpPenalty: reward.hpPenalty,
        status: "todo",
        isPhaseTask: c.isPhase,
        isPhotoCheckpoint: c.isPhoto,
      });
    }
  }

  return tasks;
}

/** Task untuk tanggal tertentu (untuk dashboard/to-do). */
export function tasksForDate(tasks: EngineTask[], dateStr: string): EngineTask[] {
  return tasks.filter((t) => t.dateStr === dateStr);
}

/** Hitung currentDay dari startedAt ke today (min 1). */
export function currentDayFor(startedAtDateStr: string, todayDateStr: string): number {
  const [sy, sm, sd] = startedAtDateStr.split("-").map(Number);
  const [ty, tm, td] = todayDateStr.split("-").map(Number);
  const ms = new Date(ty, tm - 1, td).getTime() - new Date(sy, sm - 1, sd).getTime();
  const diff = Math.round(ms / (1000 * 60 * 60 * 24));
  return Math.max(1, diff + 1);
}
