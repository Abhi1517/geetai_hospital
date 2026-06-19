import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    doctors: 0,
    departments: 0,
    appointments: 0,
    blogs: 0,
  });
  const [latestDoctors, setLatestDoctors] = useState([]);

  const fetchStats = async () => {
    try {
      const statsRes = await api.get("/dashboard/stats");
      setStats(statsRes.data);
      const doctorsRes = await api.get("/doctors", {
        params: { page: 1, limit: 5 },
      });
      setLatestDoctors(doctorsRes.data.doctors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Doctors",
      value: stats.doctors,
      path: "/doctors",
      description: "Manage doctor profiles",
    },
    {
      label: "Departments",
      value: stats.departments,
      path: "/departments",
      description: "Manage hospital departments",
    },
    {
      label: "Appointments",
      value: stats.appointments,
      description: "Upcoming appointments",
    },
    {
      label: "Blogs",
      value: stats.blogs,
      description: "Content articles",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((item) => {
            const cardContent = (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="text-4xl font-semibold mt-3 text-slate-900">
                  {item.value}
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>
            );

            if (item.path) {
              return (
                <Link key={item.label} to={item.path} className="block">
                  {cardContent}
                </Link>
              );
            }

            return <div key={item.label}>{cardContent}</div>;
          })}
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Notifications
                </p>
                <p className="text-sm text-slate-500">
                  Latest dashboard alerts.
                </p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {latestDoctors.length} new doctor(s)
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              You have {latestDoctors.length} recent doctor profile(s) added.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">Activity</p>
              <span className="text-sm text-slate-500">Updated just now</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span>New doctors</span>
                <strong>{latestDoctors.length}</strong>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span>Departments live</span>
                <strong>{stats.departments}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Latest Doctors
            </h2>
            <p className="text-slate-500">
              Recent doctor profiles added to the hospital system.
            </p>
          </div>
          <Link
            to="/doctors"
            className="inline-flex items-center rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            View All Doctors
          </Link>
        </div>

        <div className="space-y-4">
          {latestDoctors.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
              No recent doctors available yet.
            </div>
          ) : (
            latestDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="rounded-xl border border-slate-200 p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {doctor.name}
                    </h3>
                    <p className="text-slate-600">{doctor.specialization}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 capitalize">
                    {doctor.status}
                  </span>
                </div>
                <p className="mt-3 text-slate-500">
                  {doctor.experience} years experience • {doctor.designation}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
