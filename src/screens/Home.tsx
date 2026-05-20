import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import BottomNav from "../components/BottomNav";

const pastel: Record<string, string> = {
  pink: "bg-pastel-pink",
  peach: "bg-pastel-peach",
  yellow: "bg-pastel-yellow",
  mint: "bg-pastel-mint",
};

export default function Home() {
  const navigate = useNavigate();
  const projects = useStore((s) => s.projects);
  const tasks = useStore((s) => s.tasks);
  const overall = useStore((s) => s.overallProgress)();
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;

  return (
    <main className="min-h-screen pb-24">
      <div className="px-6 pt-6 overflow-y-auto no-scrollbar" style={{ height: "calc(100vh - 80px)" }}>
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F9C8D6] to-[#C8E2F9] flex items-center justify-center text-xl" aria-hidden>👩🏽</div>
            <div>
              <div className="text-xs text-muted">Hello!</div>
              <div className="text-base font-semibold">Livia Vaccaro</div>
            </div>
          </div>
          <button aria-label="Notifications" className="w-10 h-10 rounded-chip bg-white flex items-center justify-center shadow-card">🔔</button>
        </header>

        <section className="mt-5 rounded-card p-5 text-white flex justify-between items-center shadow-cta" style={{ background: "linear-gradient(135deg,#7459EC,#5436CC)" }}>
          <div>
            <div className="text-[15px] leading-snug max-w-[170px] font-medium">Your today&apos;s task<br />almost done!</div>
            <button onClick={() => navigate("/today")} className="mt-3 bg-white/20 border border-white/40 text-white text-xs font-medium px-4 py-2 rounded-full">View Task</button>
          </div>
          <div className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center" style={{ background: `conic-gradient(#fff 0 ${overall}%, rgba(255,255,255,.25) ${overall}% 100%)` }}>
            <div className="absolute w-[52px] h-[52px] rounded-full" style={{ background: "linear-gradient(135deg,#7459EC,#5436CC)" }} />
            <span className="relative z-10 font-semibold text-sm">{overall}%</span>
          </div>
        </section>

        <div className="flex items-center justify-between mt-6 mb-3">
          <h2 className="text-base font-semibold">In Progress <span className="ml-1 text-xs text-brand bg-[#EEEAF6] rounded-chip px-2 py-0.5">{inProgress}</span></h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-1">
          {projects.slice(0, 3).map((p) => (
            <div key={p.id} className={`flex-none w-40 h-28 rounded-card p-3.5 flex flex-col justify-between relative ${pastel[p.color]}`}>
              <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/70 flex items-center justify-center text-sm">📅</div>
              <div className="text-[10px] text-muted">{p.group}</div>
              <div className="text-[13px] font-semibold leading-tight">{p.name}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 mb-3">
          <h2 className="text-base font-semibold">Task Groups <span className="ml-1 text-xs text-brand bg-[#EEEAF6] rounded-chip px-2 py-0.5">{projects.length}</span></h2>
        </div>
        <div className="flex flex-col gap-2.5">
          {projects.map((p) => {
            const pct = p.totalTasks === 0 ? 0 : Math.round((p.completedTasks / p.totalTasks) * 100);
            return (
              <button
                key={p.id}
                onClick={() => navigate("/today")}
                className="bg-white rounded-card p-3 flex items-center gap-3.5 shadow-card text-left"
              >
                <div className={`w-10 h-10 rounded-chip flex items-center justify-center text-lg ${pastel[p.color]}`}>📁</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-[11px] text-muted">{p.totalTasks} Tasks</div>
                </div>
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-[10px] font-semibold text-brand relative" style={{ background: `conic-gradient(#6C4EE5 0 ${pct}%, #EEEAF6 ${pct}% 100%)` }}>
                  <div className="absolute w-8 h-8 rounded-full bg-white" />
                  <span className="relative z-10">{pct}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
