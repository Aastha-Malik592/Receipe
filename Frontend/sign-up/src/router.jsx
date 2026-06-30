import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";

import Home from "./pages/home";



import FavoriteRecipes from "./pages/favorite-recipes";

import ProtectedRoute from "./layouts/protected-route";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <Signup />,
  },

  {
    path: "/home",

    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },

 

  {
    path: "/favorites",

    element: (
      <ProtectedRoute>
        <FavoriteRecipes />
      </ProtectedRoute>
    ),
  },
]);

export default Router;
