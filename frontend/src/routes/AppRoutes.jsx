import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Doctors from "../pages/Doctors";
import DoctorDetails from "../pages/DoctorDetails";
import Departments from "../pages/Departments";
import DepartmentDetails from "../pages/DepartmentDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:id" element={<DepartmentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
