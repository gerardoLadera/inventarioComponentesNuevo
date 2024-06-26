//import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Index from "./pages/Index";

import Usuarios from "./pages/Usuarios";
import RouterWrapper from "./components/RouterWrapper";


export const router = createBrowserRouter([
  {
    element: <RouterWrapper />,
    path: '/sgi',
    children: [
      {
        index: true,
        element: <Index/>
      },
      {
        path: '/sgi/perfil',
        element: <Perfil />,
      },
      {
        path: '/sgi/usuarios', // Nueva ruta para Usuarios
        element: <Usuarios />,
      },
      // Agrega más rutas aquí según sea necesario
    ],
  },
  {
    path: '/',
    element: <Login />,
  },
]);