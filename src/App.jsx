import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import Loadable from "@/components/Loadable";

import AdminRoute from "./routes/AdminRoute";

const Home = Loadable(lazy(() => import("@/pages/Home")));
import ScrollTop from "@/components/ScrollTop";

export default function App() {
  return (
    <Router>
      <ScrollTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
      </ScrollTop>
    </Router>
  );
}
