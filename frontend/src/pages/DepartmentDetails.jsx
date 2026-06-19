import { useEffect, useState } from "react";
import api from "../services/api";

function DepartmentDetails() {
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/departments/${id}`);
        setDepartment(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-slate-500">
        Loading department...
      </div>
    );
  }

  if (!department) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-slate-500">
        Department not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              {department.title}
            </h1>
            <p className="mt-3 text-slate-600">{department.description}</p>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 capitalize">
            {department.status}
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Slug</p>
            <p className="mt-2 text-slate-900">{department.slug}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Created</p>
            <p className="mt-2 text-slate-900">
              {new Date(department.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentDetails;
