import React from 'react';
import '../css/cardPerfil.css'; // Archivo CSS para estilos específicos del componente

export default function CardPerfil({ usuario }) {
  return (
    <div className="card-perfil">
      {usuario && (
        <>
          <div className="avatar-container">
            <img
              src={usuario.rol === 'administrador' ? '/img/admin.png' : '/img/empleado.png'}
              alt={usuario.rol === 'administrador' ? 'Administrador' : 'Empleado'}
              className="avatar"
            />
          </div>
          <div className="info-container">
            <h2>{usuario.nombre}</h2>
            <p>Primer Apellido: {usuario.primerApellido}</p>
            <p>Segundo Apellido: {usuario.segundoApellido}</p>
            <p>DNI: {usuario.dni}</p>
            <p>Username: {usuario.username}</p>
            <p>Teléfono: {usuario.telefono}</p>
            <p>Dirección: {usuario.direccion}</p>
            <p>Rol: {usuario.rol}</p>
            
          </div>
        </>
      )}
    </div>
  );
}

