
import React, { useEffect, useState } from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import BarraLateralAdmin from './BarraLateral';
import BarraLateralEmpleado from './BarraLateralEmpleado';

export default function RouterWrapper() {
  const { usuario } = useUser();
  const [redirigir, setRedirigir] = useState(false);

  useEffect(() => {
    const rolValido = usuario?.rol === 'administrador' || usuario?.rol === 'empleado';

    if (!rolValido && !redirigir) {
      alert("Rol no definido. Contacto con un administrador.");
      setRedirigir(true);
    }
  }, [usuario, redirigir]);

  if (redirigir) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {usuario?.rol === 'administrador' && <BarraLateralAdmin />}
      {usuario?.rol === 'empleado' && <BarraLateralEmpleado />}
      <Outlet />
    </>
  );
}