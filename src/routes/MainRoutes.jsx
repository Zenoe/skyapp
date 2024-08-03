import { lazy } from "react";

// project import
import Loadable from "@/components/Loadable";
// import MainLayout from "@/layout/MainLayout";

import { Navigate } from "react-router-dom";

const Home = Loadable(lazy(() => import("@/pages/Home")));

// const Admin = Loadable(lazy(() => import("@/pages/Admin")));
const MainRoutes = {
  path: "/",
  // element: <MainLayout />,
  children: [
    // Redirect from '/' to '/dashboard'
    { index: true, element: <Navigate to="/home" replace /> },
    // { index: true, element: <Home /> },
    // {
    //   path: "/test",
    //   element: <TestPage />,
    // },
    {
      path: "home",
      element: <Home />,
    },
    // {
    //   path: "admin",
    //   element: <Admin />,
    // },
  ],
};

export default MainRoutes;
