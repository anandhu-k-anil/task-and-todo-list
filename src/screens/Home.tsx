import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import BottomNav from "../components/BottomNav";
import InProgressCarousel from "../components/InProgressCarousel";
import TaskGroupsList from "../components/TaskGroupsList";

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

        <InProgressCarousel projects={projects.slice(0, 3)} count={inProgress} />
        <TaskGroupsList projects={projects} onSelect={() => navigate("/today")} />
      </div>

      <BottomNav />
    </main>
  );
}
