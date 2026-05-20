import { useNavigate } from "react-router-dom";

export default function LetsStart() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen px-6 flex flex-col">
      <section className="h-[360px] flex items-center justify-center relative">
        <div className="absolute w-24 h-24 rounded-full bg-[#F9C8D6]/60 top-8 left-2 blur-sm" />
        <div className="absolute w-16 h-16 rounded-full bg-[#C8E2F9]/60 top-6 right-6 blur-sm" />
        <div className="absolute w-12 h-12 rounded-full bg-[#F9E5C8]/60 bottom-10 right-4 blur-sm" />
        <div className="absolute w-20 h-20 rounded-full bg-[#D5F9C8]/60 bottom-6 left-6 blur-sm" />
        <div className="text-[120px] drop-shadow-[0_8px_14px_rgba(60,40,120,0.18)]" role="img" aria-label="Person with laptop">🧑🏽‍💻</div>
      </section>

      <h1 className="text-2xl font-semibold text-center leading-tight mt-6">
        Task Management &amp;<br />To-Do List
      </h1>
      <p className="text-sm text-muted text-center leading-relaxed mt-4 px-3">
        This productive tool is designed to help you better manage your task project-wise conveniently!
      </p>

      <div className="mt-auto mb-12">
        <button
          onClick={() => navigate("/home")}
          className="relative w-full h-14 rounded-cta bg-brand text-white text-lg font-semibold shadow-cta flex items-center justify-center"
        >
          Let&apos;s Start
          <span className="absolute right-5 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">→</span>
        </button>
      </div>
    </main>
  );
}
