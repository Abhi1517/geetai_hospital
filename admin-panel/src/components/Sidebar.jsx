import { FaUserMd, FaHospital, FaHome, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-4 rounded transition ${
      isActive
        ? "bg-slate-800 text-white"
        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
    }`;

  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen">
      <div className="border-b border-slate-800 p-5">
        <h1 className="text-2xl font-bold">GEETAI CMS</h1>
        <p className="text-sm text-slate-400 mt-1">Hospital admin panel</p>
      </div>

      <nav className="mt-4 space-y-1 px-2">
        <NavLink to="/dashboard" className={linkClass}>
          <FaHome />
          Dashboard
        </NavLink>
        <NavLink to="/doctors" className={linkClass}>
          <FaUserMd />
          Doctors
        </NavLink>
        <NavLink to="/departments" className={linkClass}>
          <FaHospital />
          Departments
        </NavLink>
      </nav>

      <div className="mt-auto px-4 py-6 border-t border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded bg-slate-700 px-4 py-3 text-slate-100 hover:bg-slate-600"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
