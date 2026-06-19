import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/doctors/${id}`);
        setDoctor(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-slate-500">
        Loading doctor profile...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-slate-500">
        Doctor not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link
        to="/doctors"
        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        &larr; Back to doctors
      </Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-72 overflow-hidden rounded-3xl bg-slate-100">
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
          <div className="mt-6 space-y-3">
            <div>
              <p className="text-sm text-slate-500">Experience</p>
              <p className="text-lg font-semibold text-slate-900">
                {doctor.experience} years
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Status</p>
              <p className="text-lg font-semibold text-slate-900 capitalize">
                {doctor.status}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Timings</p>
              <p className="text-lg font-semibold text-slate-900">
                {doctor.timings}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-900">
              {doctor.name}
            </h1>
            <p className="mt-2 text-xl text-indigo-600">{doctor.designation}</p>
            <p className="mt-4 text-slate-600">{doctor.specialization}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">About</h2>
            <p className="mt-4 text-slate-600 leading-7">
              {doctor.about || "No additional biography available."}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 text-slate-900">
                {doctor.email || "Not available"}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Phone</p>
              <p className="mt-2 text-slate-900">
                {doctor.phone || "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
