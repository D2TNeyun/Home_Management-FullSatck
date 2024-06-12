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
import LayoutAdmin from "./Components/Layouts/layoutAdmin/layoutAdmin";
import User from "./Components/Layouts/layoutUser/layoutUser";
import ProtectedRoute from "./Components/ProtectRoute/ProtectRoute";

// function App() {

//   return (
//     <>

//    <BrowserRouter>
//    <Header/>
//    <Outlet/>
//       <div className="app-container">
//           <Routes>
//               <Route path='/home' element={<HomePage/> } />
//               <Route path='/admin' element={<Admin/> } />
//               <Route path='/user' element={<User/> } />
//           </Routes>
//       </div>
//    </BrowserRouter>
//     </>
//   )
// }

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
            // path: "*",
            // element: <Navigate to="/admin" replace />,
          }
        ]
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
