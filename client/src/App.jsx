import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Header from "./Components/Layouts/DefaultLayout/Header/Header";
import HomePage from "./Components/Home/Homepage";
import Login from "./Resources/Auth/Login/Login";
import Register from "./Resources/Auth/Register/Register";

import LayoutUser from "./Components/Layouts/layoutUser/layoutUser";
import UserHomePage from "./Resources/User/UserHomePage/UserHomePage";
import Profile from "./Resources/User/Profile/Profile";
import MyProject from "./Resources/User/MyProject/MyProject";
import ViewMyProject from "./Resources/User/MyProject/ViewMyProject";

import ProtectedRoute from "./Components/ProtectRoute/ProtectRoute";

import LayoutAdmin from "./Components/Layouts/layoutAdmin/layoutAdmin";
import HomePageAdmin from "./Resources/Admin/AdminHomePage/homepageAdmin";
import ManageUser from "./Resources/Admin/ManageUser/ManageUser";
import Department from "./Resources/Admin/Department/Department";
import Trophy from "./Resources/Admin/Trophy/Trophy";
import Project from "./Resources/Admin/Projects/Project";


import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "./Services/AuthService";
import Loading from "./Components/Loading/Loading";
import { doLoginAction } from "./Redux/Reducer/userSlice";
// import { loginSuccess, setLoading } from "./Redux/Reducer/userSlice";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.user);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  // const getAccount = async () => {
  //   const res = await AuthService.fetchProfile();
  //   if (res.status === 200 && res.data.id) {
  //     dispatch(doLoginAction(res.data));
  //   }
  // };

  // useEffect(() => {
  //     getAccount();
  // }, []);

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
        <ProtectedRoute>
          <LayoutAdmin />
         </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <HomePageAdmin />,
        },
        {
          path: "manageUser",
          element: <ManageUser />,
        },
        {
          path: "manageStaff",
          element: <ManageUser />,
        },
        {
          path: "project",
          element: <Project />,
        },
        {
          path: "laudatory",
          element: <Trophy />,
        },
        {
          path: "dpm",
          element: <Department />,
        }
      ],
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute>
          <LayoutUser />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <UserHomePage />,
        },
        {
          path: "proFile",
          element: <Profile />,
        },
        {
          path: "project",
          element: <MyProject />,
        },
        {
          path: "viewMyProject",
          element: <ViewMyProject />,
        }
      ],
    },
    {
      path: "/",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
  return (
    <>
      { isLoading === false ||
      window.location.pathname === "/" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/login" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}

      {/* <RouterProvider router={router} /> */}
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
