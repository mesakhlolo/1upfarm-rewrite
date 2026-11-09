"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskCard } from "@/components/TaskCard";
import { EmptyState } from "@/components/EmptyState";
import { Card } from "@/components/ui/card";
import { useGardenStore } from "@/store/useGardenStore";
import { tasksForDate } from "@/lib/plant-engine";
import { todayString } from "@/lib/utils";
import { toast } from "sonner";
import type { StoredTask } from "@/store/useGardenStore";

type TabVal = "todo" | "done";

export default function TasksPage() {
  const router = useRouter();
  const myTasks = useGardenStore((s) => s.myTasks);
  const myPlants = useGardenStore((s) => s.myPlants);
  const completeTask = useGardenStore((s) => s.completeTask);
  const toggleTaskBack = useGardenStore((s) => s.toggleTaskBack);
  const [tab, setTab] = useState<TabVal>("todo");
  const today = todayString();

  const todayTasks = useMemo(() => tasksForDate(myTasks, today), [myTasks, today]);
  const doneToday = todayTasks.filter((t) => t.status === "done");
  const todoToday = todayTasks.filter((t) => t.status === "todo");
  const missedToday = todayTasks.filter((t) => t.status === "missed");

  // Semua task (bukan hanya hari ini) untuk Done tab: tampilkan yang sudah done
  const allDone = useMemo(() => myTasks.filter((t) => t.status === "done").slice(-20).reverse(), [myTasks]);
  const allMissed = useMemo(() => myTasks.filter((t) => t.status === "missed").slice(-20).reverse(), [myTasks]);

  const allDoneToday = todayTasks.length > 0 && doneToday.length === todayTasks.length;

  // Kelompok per tanaman untuk Task tab
  const groupedTodo = useMemo(() => {
    const map = new Map<string, StoredTask[]>();
    for (const t of todoToday) {
      const arr = map.get(t.plantName) ?? [];
      arr.push(t);
      map.set(t.plantName, arr);
    }
    return [...map.entries()];
  }, [todoToday]);

  function handleComplete(task: StoredTask) {
    const res = completeTask(task.id);
    if (res.ok) {
      toast.success(`Selesai! +${task.exp} EXP, +${task.gold} gold.`);
      if (res.newBadges?.length) toast.success(`Badge baru: ${res.newBadges.length} badge!`);
      if (res.streakGained) toast.success("Semua misi hari ini selesai. Streak +1 🔥");
    }
  }

  function handleUndo(task: StoredTask) {
    toggleTaskBack(task.id);
    toast.info("Task dikembalikan ke To-do.");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">To-do</h1>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">{todayTasks.length} misi hari ini • {doneToday.length} selesai</p>
      </div>

      {allDoneToday ? (
        <Card className="rounded-lg border-stat-growth/30 bg-stat-growth/5 p-4" role="status">
          <p className="text-base font-extrabold text-foreground">Semua misi hari ini selesai. Streak +1 🔥</p>
        </Card>
      ) : null}

      {/* Banner missed kemarin */}
      {missedToday.length > 0 ? (
        <Card className="rounded-lg border-stat-hp/20 bg-stat-hp/5 p-4">
          <p className="text-sm font-bold text-foreground">
            Kamu melewatkan {missedToday.length} misi — HP berkurang. Yuk kejar hari ini.
          </p>
        </Card>
      ) : null}

      <Tabs value={tab} onValueChange={(v) => setTab(v as TabVal)} className="flex flex-col gap-4">
        <TabsList aria-label="Tab task" className="w-full max-w-xs">
          <TabsTrigger value="todo" aria-label="Tab Task">
            Task
          </TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>

        <TabsContent value="todo" className="flex flex-col gap-6">
          {myPlants.length === 0 ? (
            <EmptyState
              title="Kebunmu masih kosong"
              description="Pilih tanaman pertamamu dan mulai hari ini."
              actionLabel="Tambah Tanaman"
              onAction={() => router.push("/app/plants")}
            />
          ) : todayTasks.length === 0 ? (
            <EmptyState title="Mantap! Semua misi hari ini beres 🎉" description="Streak kamu bertambah." />
          ) : (
            <>
              {groupedTodo.length === 0 && allDoneToday ? (
                <EmptyState title="Semua misi hari ini selesai. Streak +1 🔥" description="Buka Done untuk lihat riwayat." />
              ) : (
                groupedTodo.map(([plantName, tasks]) => (
                  <section key={plantName} aria-label={`Tanaman ${plantName}`} className="flex flex-col gap-3">
                    <h2 className="text-base font-extrabold text-foreground">{plantName}</h2>
                    <div className="flex flex-col gap-3">
                      {tasks.map((t) => (
                        <div key={t.id}>
                          <TaskCard
                            title={t.title}
                            type={t.type as "Siram" | "Pupuk" | "Cek hama" | "Pangkas" | "Panen" | "Foto"}
                            difficulty={t.difficulty === "easy" ? "Mudah" : t.difficulty === "medium" ? "Sedang" : "Menantang"}
                            exp={t.exp}
                            gold={t.gold}
                            status={t.status}
                            plantName={t.plantName}
                            onToggle={() => handleComplete(t)}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                ))
              )}

              {allMissed.length > 0 ? (
                <section aria-label="Misi terlewat" className="flex flex-col gap-3">
                  <h2 className="text-sm font-extrabold text-muted-foreground">Terlewat</h2>
                  <div className="flex flex-col gap-3 opacity-80">
                    {allMissed.slice(0, 5).map((t) => (
                      <TaskCard
                        key={t.id}
                        title={t.title}
                        type={t.type as "Siram" | "Pupuk" | "Cek hama" | "Pangkas" | "Panen" | "Foto"}
                        difficulty={t.difficulty === "easy" ? "Mudah" : t.difficulty === "medium" ? "Sedang" : "Menantang"}
                        exp={t.exp}
                        gold={t.gold}
                        status="missed"
                        plantName={t.plantName}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          )}
        </TabsContent>

        <TabsContent value="done" className="flex flex-col gap-3">
          {allDone.length === 0 ? (
            <EmptyState title="Belum ada task yang selesai." />
          ) : (
            allDone.map((t) => (
              <div key={t.id}>
                <TaskCard
                  title={t.title}
                  type={t.type as "Siram" | "Pupuk" | "Cek hama" | "Pangkas" | "Panen" | "Foto"}
                  difficulty={t.difficulty === "easy" ? "Mudah" : t.difficulty === "medium" ? "Sedang" : "Menantang"}
                  exp={t.exp}
                  gold={t.gold}
                  status="done"
                  plantName={t.plantName}
                  onToggle={() => handleUndo(t)}
                />
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
