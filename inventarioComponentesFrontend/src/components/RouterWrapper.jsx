import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import BarraLateralAdmin from './BarraLateral';
import BarraLateralEmpleado from './BarraLateralEmpleado';

export default function RouterWrapper() {
  const { usuario } = useUser();

  const getBarraLateral = () => {
    if (usuario?.rol === 'administrador') {
      return <BarraLateralAdmin />;
    } else if (usuario?.rol === 'empleado') {
      return <BarraLateralEmpleado />;
    } else {
      return <BarraLateralAdmin />; 
    }
  };

  return (
    <>
      {getBarraLateral()}
      <Outlet />
    </>
  );
}