import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project, Task, TaskStatus } from "./types";

interface AppState {
  projects: Project[];
  tasks: Task[];
  addProject: (p: Omit<Project, "id" | "totalTasks" | "completedTasks">) => Project;
  setTaskStatus: (id: string, status: TaskStatus) => void;
  overallProgress: () => number;
}

const seedProjects: Project[] = [
  {
    id: "p-office",
    name: "Office Project",
    group: "Work",
    description: "Office work projects.",
    startDate: "2026-05-01",
    endDate: "2026-06-30",
    color: "pink",
    totalTasks: 23,
    completedTasks: 16,
  },
  {
    id: "p-personal",
    name: "Personal Project",
    group: "Personal",
    description: "Personal side projects.",
    startDate: "2026-05-01",
    endDate: "2026-06-30",
    color: "peach",
    totalTasks: 30,
    completedTasks: 16,
  },
  {
    id: "p-study",
    name: "Daily Study",
    group: "Learning",
    description: "Daily learning goals.",
    startDate: "2026-05-01",
    endDate: "2026-06-30",
    color: "yellow",
    totalTasks: 30,
    completedTasks: 26,
  },
];

const seedTasks: Task[] = [
  { id: "t1", projectId: "p-office", title: "Market Research", time: "12:00 PM", date: "2026-05-25", status: "done" },
  { id: "t2", projectId: "p-office", title: "Competitive Analysis", time: "12:00 PM", date: "2026-05-25", status: "in-progress" },
  { id: "t3", projectId: "p-personal", title: "Create Low-fidelity Wireframe", time: "12:00 PM", date: "2026-05-25", status: "todo" },
  { id: "t4", projectId: "p-study", title: "How to pitch a Design Sprint", time: "09:00 PM", date: "2026-05-25", status: "todo" },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      projects: seedProjects,
      tasks: seedTasks,
      addProject: (p) => {
        const newProj: Project = {
          ...p,
          id: `p-${Date.now()}`,
          totalTasks: 0,
          completedTasks: 0,
        };
        set((s) => ({ projects: [...s.projects, newProj] }));
        return newProj;
      },
      setTaskStatus: (id, status) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),
      overallProgress: () => {
        const tasks = get().tasks;
        if (tasks.length === 0) return 0;
        const done = tasks.filter((t) => t.status === "done").length;
        return Math.round((done / tasks.length) * 100);
      },
    }),
    { name: "task-manager-store" }
  )
);
