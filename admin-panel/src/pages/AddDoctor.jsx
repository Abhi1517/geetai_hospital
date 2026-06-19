import { useState } from "react";

import api from "../services/api";

function AddDoctor() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    qualification: "",
    specialization: "",
    experience: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/doctors", form);

    alert("Doctor Added");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Doctor Name"
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <button>Save Doctor</button>
    </form>
  );
}

export default AddDoctor;
