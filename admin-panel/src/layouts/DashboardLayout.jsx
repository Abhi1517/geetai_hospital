import { useLocation, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/doctors": "Doctors",
  "/doctors/add": "Add Doctor",
  "/doctors/edit": "Edit Doctor",
  "/departments": "Departments",
  "/departments/add": "Add Department",
  "/departments/edit": "Edit Department",
};

function DashboardLayout({ children }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "GEETAI CMS";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">Admin Panel</p>
              <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            </div>
            {isDashboard ? (
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/doctors/add"
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Add Doctor
                </Link>
                <Link
                  to="/departments/add"
                  className="rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900"
                >
                  Add Department
                </Link>
              </div>
            ) : (
              <div className="text-sm text-slate-500">
                Manage your hospital data quickly.
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
