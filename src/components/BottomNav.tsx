import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const cls = (path: string) =>
    `w-8 h-8 flex items-center justify-center text-lg ${
      pathname === path ? "text-brand" : "text-muted"
    }`;

  return (
    <nav className="absolute left-0 right-0 bottom-0 h-20 bg-white flex items-center justify-around px-5 shadow-[0_-6px_18px_rgba(60,40,120,.06)]">
      <button aria-label="Home" className={cls("/home")} onClick={() => navigate("/home")}>🏠</button>
      <button aria-label="Tasks" className={cls("/today")} onClick={() => navigate("/today")}>📋</button>
      <button
        aria-label="Add project"
        onClick={() => navigate("/projects/new")}
        className="w-14 h-14 rounded-full bg-brand text-white text-3xl flex items-center justify-center shadow-cta -translate-y-4"
      >
        +
      </button>
      <button aria-label="Calendar" className={cls("/calendar")}>📅</button>
      <button aria-label="Profile" className={cls("/profile")}>👤</button>
    </nav>
  );
}
