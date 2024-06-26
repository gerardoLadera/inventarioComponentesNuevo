//import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import BarraLateral from "./components/BarraLateral";
import RouterWrapper from "./components/RouterWrapper";


export const router = createBrowserRouter([
  {
    element: <RouterWrapper />,
    path: '/sgi',
    children: [
      {
        path: '/sgi/perfil',
        element: <Perfil />,
      },
      // Agrega más rutas aquí según sea necesario
    ],
  },
  {
    path: '/',
    element: <Login />,
  },
]);