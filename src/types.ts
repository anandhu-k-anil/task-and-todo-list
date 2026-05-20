export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  time: string;
  date: string;
  status: TaskStatus;
}

export interface Project {
  id: string;
  name: string;
  group: string;
  description: string;
  startDate: string;
  endDate: string;
  color: "pink" | "peach" | "yellow" | "mint";
  totalTasks: number;
  completedTasks: number;
}
