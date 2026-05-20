import type { Project } from "../types";

const pastel: Record<Project["color"], string> = {
  pink: "bg-pastel-pink",
  peach: "bg-pastel-peach",
  yellow: "bg-pastel-yellow",
  mint: "bg-pastel-mint",
};

interface Props {
  projects: Project[];
  count: number;
}

export default function InProgressCarousel({ projects, count }: Props) {
  return (
    <>
      <div className="flex items-center justify-between mt-6 mb-3">
        <h2 className="text-base font-semibold">
          In Progress{" "}
          <span className="ml-1 text-xs text-brand bg-[#EEEAF6] rounded-chip px-2 py-0.5">{count}</span>
        </h2>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-1">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`flex-none w-40 h-28 rounded-card p-3.5 flex flex-col justify-between relative ${pastel[p.color]}`}
          >
            <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/70 flex items-center justify-center text-sm">📅</div>
            <div className="text-[10px] text-muted">{p.group}</div>
            <div className="text-[13px] font-semibold leading-tight">{p.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
