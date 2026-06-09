import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-900">Task Manager</h1>
          <p className="text-sm text-slate-500">Organized task management for your day.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            {user?.name}
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <FiLogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
