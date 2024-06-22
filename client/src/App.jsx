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
import Login from "./Resources/Auth/Login/Login";
import Register from "./Resources/Auth/Register/Register";

import User from "./Components/Layouts/layoutUser/layoutUser";
import ProtectedRoute from "./Components/ProtectRoute/ProtectRoute";

import LayoutAdmin from "./Components/Layouts/layoutAdmin/layoutAdmin";
import HomePageAdmin from "./Resources/Admin/AdminHomePage/homepageAdmin";
import ManageUser from "./Resources/Admin/ManageUser/ManageUser";
import { ToastContainer } from "react-toastify";


const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
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
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={["fade", "scale"]}
              />
              {/* Same as */}
              <ToastContainer />
      
    </>
  );
}

export default App;
