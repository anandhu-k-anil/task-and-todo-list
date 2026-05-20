import { Routes, Route } from "react-router-dom";
import LetsStart from "./screens/LetsStart";
import Home from "./screens/Home";
import TodaysTasks from "./screens/TodaysTasks";
import AddProject from "./screens/AddProject";

export default function App() {
  return (
    <div className="phone-shell">
      <Routes>
        <Route path="/" element={<LetsStart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/today" element={<TodaysTasks />} />
        <Route path="/projects/new" element={<AddProject />} />
      </Routes>
    </div>
  );
}
