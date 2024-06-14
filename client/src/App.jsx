import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Header from "./Components/Layouts/DefaultLayout/Header/Header";
import HomePage from "./Components/Home/Homepage";
import User from "./Components/Layouts/layoutUser/layoutUser";
import ProtectedRoute from "./Components/ProtectRoute/ProtectRoute";

import LayoutAdmin from "./Components/Layouts/layoutAdmin/layoutAdmin";
import HomePageAdmin from "./Resources/Admin/AdminHomePage/homepageAdmin";
import ManageUser from "./Resources/Admin/ManageUser/ManageUser";


const Layout = () => {
  return (
    <div>
      {/* <Toaster position='top-right' /> */}
      <Header />
      <Outlet />
      {/* <OnTopButton />
      <Footer /> */}
    </div>
  );
};
function App() {
  // const isLoading = useSelector((state) => state.user.isLoading);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <Error />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        // { path: "/admin", element: <LayoutAdmin /> },
        // { path: "user",element: <User />,},
        // {
        //   path: "*",
        //   element: <Navigate to="/" replace />,
        // },
      ],
    },
    {
      path: "/admin",
      element: (
        // <ProtectedRoute>
        <LayoutAdmin />
        // </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <HomePageAdmin />,
        },
        {
          path: "manageUser",
          element: <ManageUser />,
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
