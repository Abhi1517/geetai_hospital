import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Doctors from "../pages/Doctors";
import AddDoctor from "../pages/AddDoctor";
import EditDoctor from "../pages/EditDoctor";
import Departments from "../pages/Departments";
import AddDepartment from "../pages/AddDepartment";
import EditDepartment from "../pages/EditDepartment";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors/add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddDoctor />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditDoctor />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Doctors />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Departments />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments/add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddDepartment />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditDepartment />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
