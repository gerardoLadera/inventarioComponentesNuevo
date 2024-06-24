//import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import CardPerfil from "./components/CardPerfil";
import Perfil from "./pages/Perfil";

export const router = createBrowserRouter([
    {
        element:<Perfil />,
        path: '/perfil',
      },
  
    {
    path: "/",
    element: <Login />,
  },
]);