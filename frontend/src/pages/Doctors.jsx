import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async (query = "") => {
    try {
      setLoading(true);
      const res = await api.get("/doctors", {
        params: { q: query, page: 1, limit: 12 },
      });
      setDoctors(res.data.doctors || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Our Doctors</h1>
          <p className="mt-2 text-slate-600">
            Browse specialist profiles and choose the right doctor for your
            care.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctor or specialty"
            className="w-full max-w-sm rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => fetchDoctors(search)}
            className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
          Loading doctors...
        </div>
      ) : doctors.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 shadow-sm">
          No doctors found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-100">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
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
                    {doctor.name}
                  </h2>
                  <p className="text-sm text-slate-500">{doctor.designation}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                {doctor.specialization}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {doctor.experience} yrs exp
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 capitalize">
                  {doctor.status}
                </span>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <Link
                  to={`/doctors/${doctor._id}`}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  View Profile
                </Link>
                <span className="text-sm text-slate-500">{doctor.timings}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Doctors;
