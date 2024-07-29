import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import Notes from "./components/Notes/Notes";
import Profile from "./components/Profile/Profile";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import ProtectedAuth from "./ProtectedRoutes/ProtectedAuth";

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          ),
        },
        {
          path: "notes",
          element: (
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: (
            <ProtectedRoute>
              <Notfound />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
