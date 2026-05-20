import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "./store";

describe("store", () => {
  beforeEach(() => {
    useStore.persist.clearStorage();
    useStore.setState({
      projects: [],
      tasks: [
        { id: "a", projectId: "p", title: "A", time: "1", date: "d", status: "done" },
        { id: "b", projectId: "p", title: "B", time: "1", date: "d", status: "todo" },
      ],
    });
  });

  it("computes overallProgress as a rounded percentage", () => {
    expect(useStore.getState().overallProgress()).toBe(50);
  });

  it("returns 0 when there are no tasks", () => {
    useStore.setState({ tasks: [] });
    expect(useStore.getState().overallProgress()).toBe(0);
  });

  it("addProject creates a project with zero task counters", () => {
    const created = useStore.getState().addProject({
      name: "X",
      group: "G",
      description: "",
      startDate: "2026-01-01",
      endDate: "2026-02-01",
      color: "mint",
    });
    expect(created.totalTasks).toBe(0);
    expect(created.completedTasks).toBe(0);
    expect(useStore.getState().projects).toHaveLength(1);
  });

  it("setTaskStatus updates the status of a single task", () => {
    useStore.getState().setTaskStatus("b", "in-progress");
    expect(useStore.getState().tasks.find((t) => t.id === "b")?.status).toBe("in-progress");
  });
});
