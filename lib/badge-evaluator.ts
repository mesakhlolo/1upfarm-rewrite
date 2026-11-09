import { BADGES, type Badge } from "@/data/badges";

export interface BadgeInputState {
  gardenPlantCount: number;
  photoCount: number;
  streak: number;
  totalTasksDone: number;
  harvestedCount: number;
  level: number;
  existingBadgeIds: string[];
}

export function evaluateBadges(state: BadgeInputState): { newlyEarned: Badge[]; allEarned: Badge[] } {
  const earned = new Set(state.existingBadgeIds);
  const newly: Badge[] = [];

  const award = (id: string) => {
    if (!earned.has(id)) {
      const badge = BADGES.find((b) => b.id === id);
      if (badge) {
        earned.add(id);
        newly.push(badge);
      }
    }
  };

  if (state.gardenPlantCount >= 1) award("tunastumbuh");
  if (state.photoCount >= 1) award("foto-pertama");
  if (state.streak >= 7) award("streak-7");
  if (state.totalTasksDone >= 50) award("green-thumb");
  if (state.harvestedCount >= 1) award("panen-pertama");
  if (state.level >= 5) award("pemula");
  if (state.level >= 15) award("berkelanjutan");
  if (state.level >= 30) award("professional");

  const allEarned = BADGES.filter((b) => earned.has(b.id));
  return { newlyEarned: newly, allEarned };
}
