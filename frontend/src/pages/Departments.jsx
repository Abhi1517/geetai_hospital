import { useEffect, useState } from "react";
import api from "../services/api";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/departments", {
        params: { page: 1, limit: 12 },
      });
      setDepartments(res.data.departments || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Departments</h1>
        <p className="text-slate-600">
          Explore our hospital departments and services.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
          Loading departments...
        </div>
      ) : departments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 shadow-sm">
          No departments available.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((department) => (
            <div
              key={department._id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-100">
                  {department.image ? (
                    <img
                      src={department.image}
                      alt={department.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {department.title}
                  </h2>
                  <p className="text-sm text-slate-500 capitalize">
                    {department.status}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {department.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Departments;
