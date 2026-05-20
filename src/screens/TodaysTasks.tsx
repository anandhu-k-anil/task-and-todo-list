import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import type { TaskStatus } from "../types";
import BottomNav from "../components/BottomNav";

type Filter = "all" | "todo" | "in-progress" | "done";

const days = [
  { d: 23, w: "Fri" },
  { d: 24, w: "Sat" },
  { d: 25, w: "Sun" },
  { d: 26, w: "Mon" },
  { d: 27, w: "Tue" },
];

const statusStyle: Record<TaskStatus, { label: string; cls: string }> = {
  done: { label: "Done", cls: "bg-[#E6F7EE] text-status-done" },
  "in-progress": { label: "In Progress", cls: "bg-[#FFEFE0] text-status-warn" },
  todo: { label: "To-do", cls: "bg-pastel-pink text-status-todo" },
};

export default function TodaysTasks() {
  const navigate = useNavigate();
  const tasks = useStore((s) => s.tasks);
  const projects = useStore((s) => s.projects);
  const [activeDay, setActiveDay] = useState(25);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);

  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? "";

  return (
    <main className="min-h-screen pb-24">
      <div className="px-6 pt-6 overflow-y-auto no-scrollbar" style={{ height: "calc(100vh - 80px)" }}>
        <header className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="w-9 h-9 rounded-chip bg-white flex items-center justify-center shadow-card">←</button>
          <h1 className="text-lg font-semibold">Today&apos;s Tasks</h1>
          <button aria-label="Notifications" className="w-9 h-9 rounded-chip bg-white flex items-center justify-center shadow-card">🔔</button>
        </header>

        <div className="flex justify-between gap-2 mt-5">
          {days.map(({ d, w }) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`flex-1 h-[78px] rounded-[18px] flex flex-col items-center justify-center ${
                activeDay === d
                  ? "bg-brand text-white shadow-cta"
                  : "bg-white text-ink shadow-card"
              }`}
            >
              <div className="text-lg font-semibold">{d}</div>
              <div className={`text-[11px] mt-1 ${activeDay === d ? "text-white/80" : "text-muted"}`}>{w}</div>
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-5 overflow-x-auto no-scrollbar pb-1">
          {([
            ["all", "All"],
            ["todo", "To do"],
            ["in-progress", "In Progress"],
            ["done", "Completed"],
          ] as [Filter, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-none px-4 h-9 rounded-full text-sm font-medium ${
                filter === key ? "bg-brand text-white shadow-cta" : "bg-white text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-5">
          {filtered.length === 0 && (
            <div className="text-center text-muted text-sm py-8">No tasks for this filter.</div>
          )}
          {filtered.map((t) => (
            <div key={t.id} className="bg-white rounded-card p-3.5 flex justify-between items-center shadow-card">
              <div>
                <div className="text-[11px] text-muted mb-1">{projectName(t.projectId)}</div>
                <div className="text-[15px] font-semibold mb-1.5">{t.title}</div>
                <div className="text-[11px] text-muted">🕐 {t.time}</div>
              </div>
              <div className={`text-[11px] font-medium px-2.5 py-1 rounded-chip ${statusStyle[t.status].cls}`}>
                {statusStyle[t.status].label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
