//import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Index from "./pages/Index";
import Proveedores from "./pages/Proveedores";
import Usuarios from "./pages/Usuarios";
import RouterWrapper from "./components/RouterWrapper";
import Inventario from "./pages/Inventario";
import Movimiento from "./pages/Movimientos";
import PedidosCliente from "./pages/PedidosDeSalida";
import PedidosProveedor from "./pages/PedidosProveedor";
import ControlCalidad from "./pages/Control";
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
        path: '/sgi/usuarios', 
        element: <Usuarios />,
      },
      {
        path: '/sgi/proveedores', 
        element: <Proveedores />,
      },
      {
        path: '/sgi/inventario', 
        element: <Inventario />,
      },
      {
        path: '/sgi/movimientos', 
        element: <Movimiento/>,
      },
      {
        path: '/sgi/pedidosP', 
        element: <PedidosProveedor/>,
      },
      {
        path: '/sgi/pedidosCliente', 
        element: <PedidosCliente/>,
      },
      {
        path: '/sgi/control', 
        element: <ControlCalidad/>,
      },
      
    ],
  },
  {
    path: '/',
    element: <Login />,
  },
]);