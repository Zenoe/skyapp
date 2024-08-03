import { Navigate, Route, Routes } from "react-router-dom";
import AdminHome from "../admin/pages/AdminHome";
import AdminLayout from "../admin/AdminLayout";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="adminhome" replace />} />
        <Route path="adminhome" element={<AdminHome />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
