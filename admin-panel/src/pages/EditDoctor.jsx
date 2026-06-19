import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import FormInput from "../components/FormInput";

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    designation: "",
    qualification: "",
    specialization: "",
    experience: "",
    about: "",
    timings: "",
    phone: "",
    email: "",
    status: "active",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const res = await api.get(`/doctors/${id}`);
        setForm({
          name: res.data.name || "",
          designation: res.data.designation || "",
          qualification: res.data.qualification || "",
          specialization: res.data.specialization || "",
          experience: res.data.experience || "",
          about: res.data.about || "",
          timings: res.data.timings || "",
          phone: res.data.phone || "",
          email: res.data.email || "",
          status: res.data.status || "active",
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadDoctor();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (imageFile) {
        data.append("image", imageFile);
      }
      await api.put(`/doctors/${id}`, data);
      navigate("/doctors");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Doctor</h1>
        <p className="text-slate-500">
          Update doctor profile and availability.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 space-y-4"
      >
        <FormInput
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Designation"
          name="designation"
          value={form.designation}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Qualification"
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Specialization"
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Experience (years)"
          name="experience"
          type="number"
          value={form.experience}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Timings"
          name="timings"
          value={form.timings}
          onChange={handleChange}
          placeholder="09:00 AM - 05:00 PM"
        />
        <FormInput
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded px-4 py-3"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">About</label>
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            rows="4"
            className="w-full border border-slate-300 rounded px-4 py-3"
            placeholder="Doctor biography and overview"
          />
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Update Doctor"}
        </button>
      </form>
    </div>
  );
}

export default EditDoctor;
