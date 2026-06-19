import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import FormInput from "../components/FormInput";

function EditDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    description: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDepartment = async () => {
      try {
        const res = await api.get(`/departments/${id}`);
        setForm({
          title: res.data.title || "",
          slug: res.data.slug || "",
          image: res.data.image || "",
          description: res.data.description || "",
          status: res.data.status || "active",
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadDepartment();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.put(`/departments/${id}`, form);
      navigate("/departments");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Department</h1>
        <p className="text-slate-500">Update department details and status.</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 space-y-4"
      >
        <FormInput
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Department Title"
          required
        />
        <FormInput
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="department-slug"
        />
        <FormInput
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            className="w-full border border-slate-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Department description"
          />
        </div>
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
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Update Department"}
        </button>
      </form>
    </div>
  );
}

export default EditDepartment;
