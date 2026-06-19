import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      <section className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-700">
            GEETAI Hospital
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Trusted healthcare made simple.
          </h1>
          <p className="max-w-2xl text-slate-600">
            Browse hospital departments, discover specialist doctors, and book
            care with confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/doctors"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Explore Doctors
            </Link>
            <Link
              to="/departments"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Departments
            </Link>
          </div>
        </div>
        <div className="rounded-4xl bg-linear-to-br from-indigo-100 via-slate-100 to-white p-8 shadow-lg">
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Find Care Quickly
            </h2>
            <p className="text-sm text-slate-600 leading-7">
              Search doctors by specialty, compare experience, and find the
              right department for your needs.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Expert Doctors",
            body: "Verified specialists across every medical discipline.",
          },
          {
            title: "Hospital Departments",
            body: "Browse department services and care teams.",
          },
          {
            title: "Patient-first care",
            body: "Empathetic support backed by reliable healthcare.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {card.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{card.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
