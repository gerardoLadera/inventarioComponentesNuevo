//import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import BarraLateral from "./components/BarraLateral";



export const router = createBrowserRouter([
    {   
      element: <BarraLateral/>,
      path: '/sgi',
      children: [
        {
          path: '/sgi/perfil',
          element:<Perfil/>, 
        },

      ], 
    },
    {
    path: '/',
    element: <Login />,
  },
]);