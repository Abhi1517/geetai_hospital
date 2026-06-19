import { useEffect, useState } from "react";

import api from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await api.get("/doctors");

    setDoctors(res.data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>

      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>

            <th>Specialization</th>

            <th>Experience</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.name}</td>

              <td>{doc.specialization}</td>

              <td>
                {doc.experience}
                Years
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
