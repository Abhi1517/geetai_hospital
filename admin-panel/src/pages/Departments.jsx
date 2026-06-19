import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchDepartments = async (pageNumber = 1, query = search) => {
    try {
      setLoading(true);
      const res = await api.get("/departments", {
        params: {
          q: query,
          page: pageNumber,
          limit: 8,
        },
      });
      setDepartments(res.data.departments);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments(1);
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/departments/${deleteId}`);
      setDeleteId(null);
      fetchDepartments(page);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="text-slate-500">
            Manage hospital departments and details.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search departments"
            className="border px-4 py-3 rounded w-full sm:w-72"
          />
          <button
            onClick={() => fetchDepartments(1)}
            className="bg-blue-600 text-white px-5 py-3 rounded"
          >
            Search
          </button>
          <Link
            to="/departments/add"
            className="bg-green-600 text-white px-5 py-3 rounded"
          >
            Add Department
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : departments.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-slate-500">
                  No departments found.
                </td>
              </tr>
            ) : (
              departments.map((department) => (
                <tr key={department._id} className="border-t">
                  <td className="p-4">{department.title}</td>
                  <td className="p-4 capitalize">{department.status}</td>
                  <td className="p-4">
                    {new Date(department.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 space-x-2">
                    <Link
                      to={`/departments/edit/${department._id}`}
                      className="text-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteId(department._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={fetchDepartments}
      />

      <ConfirmModal
        title="Delete Department"
        message="Are you sure you want to delete this department?"
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default Departments;
