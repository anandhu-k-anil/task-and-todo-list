import type { Project } from "../types";

const pastel: Record<Project["color"], string> = {
  pink: "bg-pastel-pink",
  peach: "bg-pastel-peach",
  yellow: "bg-pastel-yellow",
  mint: "bg-pastel-mint",
};

interface Props {
  projects: Project[];
  onSelect: (p: Project) => void;
}

export default function TaskGroupsList({ projects, onSelect }: Props) {
  return (
    <>
      <div className="flex items-center justify-between mt-6 mb-3">
        <h2 className="text-base font-semibold">
          Task Groups{" "}
          <span className="ml-1 text-xs text-brand bg-[#EEEAF6] rounded-chip px-2 py-0.5">{projects.length}</span>
        </h2>
      </div>
      <div className="flex flex-col gap-2.5">
        {projects.map((p) => {
          const pct = p.totalTasks === 0 ? 0 : Math.round((p.completedTasks / p.totalTasks) * 100);
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className="bg-white rounded-card p-3 flex items-center gap-3.5 shadow-card text-left"
            >
              <div className={`w-10 h-10 rounded-chip flex items-center justify-center text-lg ${pastel[p.color]}`}>📁</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-[11px] text-muted">{p.totalTasks} Tasks</div>
              </div>
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-[10px] font-semibold text-brand relative"
                style={{ background: `conic-gradient(#6C4EE5 0 ${pct}%, #EEEAF6 ${pct}% 100%)` }}
              >
                <div className="absolute w-8 h-8 rounded-full bg-white" />
                <span className="relative z-10">{pct}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
