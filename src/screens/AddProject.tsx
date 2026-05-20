import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import type { Project } from "../types";

const colors: Project["color"][] = ["pink", "peach", "yellow", "mint"];

export default function AddProject() {
  const navigate = useNavigate();
  const addProject = useStore((s) => s.addProject);

  const [group, setGroup] = useState("Work");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("2026-05-01");
  const [endDate, setEndDate] = useState("2026-06-30");
  const [color, setColor] = useState<Project["color"]>("peach");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }
    addProject({ group, name: name.trim(), description, startDate, endDate, color });
    navigate("/home");
  };

  return (
    <main className="min-h-screen pb-32">
      <form onSubmit={submit} className="px-6 pt-6 overflow-y-auto no-scrollbar" style={{ height: "calc(100vh - 110px)" }}>
        <header className="flex items-center justify-between">
          <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="w-9 h-9 rounded-chip bg-white flex items-center justify-center shadow-card">←</button>
          <h1 className="text-lg font-semibold">Add Project</h1>
          <button type="button" aria-label="Notifications" className="w-9 h-9 rounded-chip bg-white flex items-center justify-center shadow-card">🔔</button>
        </header>

        <label className="block mt-5">
          <span className="text-xs text-muted ml-1">Task Group</span>
          <input
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="w-full mt-1.5 bg-white rounded-cta px-4 py-3.5 text-sm font-semibold shadow-card outline-none focus:ring-2 focus:ring-brand"
          />
        </label>

        <label className="block mt-3.5">
          <span className="text-xs text-muted ml-1">Project Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Grocery Shopping App"
            className="w-full mt-1.5 bg-white rounded-cta px-4 py-3.5 text-sm font-semibold shadow-card outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        {error && <div role="alert" className="text-status-todo text-xs mt-1 ml-1">{error}</div>}

        <label className="block mt-3.5">
          <span className="text-xs text-muted ml-1">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="What is this project about?"
            className="w-full mt-1.5 bg-white rounded-cta px-4 py-3.5 text-sm leading-relaxed shadow-card outline-none focus:ring-2 focus:ring-brand resize-none"
          />
        </label>

        <div className="flex gap-3 mt-3.5">
          <label className="block flex-1">
            <span className="text-xs text-muted ml-1">Start Date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full mt-1.5 bg-white rounded-cta px-4 py-3.5 text-sm font-semibold shadow-card outline-none focus:ring-2 focus:ring-brand"
            />
          </label>
          <label className="block flex-1">
            <span className="text-xs text-muted ml-1">End Date</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full mt-1.5 bg-white rounded-cta px-4 py-3.5 text-sm font-semibold shadow-card outline-none focus:ring-2 focus:ring-brand"
            />
          </label>
        </div>

        <div className="mt-4">
          <div className="text-xs text-muted ml-1 mb-1.5">Card Color</div>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`color ${c}`}
                onClick={() => setColor(c)}
                className={`w-10 h-10 rounded-chip bg-pastel-${c} ${color === c ? "ring-2 ring-brand" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="fixed left-0 right-0 bottom-0 px-6 pb-6 pt-2 bg-bg" style={{ maxWidth: 420, margin: "0 auto" }}>
          <button
            type="submit"
            className="w-full h-14 rounded-cta bg-brand text-white text-lg font-semibold shadow-cta"
          >
            Add Project
          </button>
        </div>
      </form>
    </main>
  );
}
