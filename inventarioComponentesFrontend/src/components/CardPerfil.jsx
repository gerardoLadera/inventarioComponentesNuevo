import React from 'react';
import adminIcon from "../img/adminIcon.png";
import empleadoIcon from "../img/emepleadoIcon.png";
import '../css/cardPerfil.css'; // Archivo CSS para estilos específicos del componente

export default function CardPerfil({ usuario }) {
  return (
    <div className="card-perfil">
      {usuario && (
        <>
          <div className="avatar-container">
            <img
              src={usuario.rol === 'administrador' ? adminIcon : empleadoIcon}
              alt={usuario.rol === 'administrador' ? 'Administrador' : 'Empleado'}
              className="avatar"
            />
          </div>
          <div className="info-container">
            <h2>{usuario.nombre}</h2>
            <p><span className="attribute-name">Primer Apellido:</span> {usuario.primerApellido}</p>
            <p><span className="attribute-name">Segundo Apellido:</span> {usuario.segundoApellido}</p>
            <p><span className="attribute-name">DNI:</span> {usuario.dni}</p>
            <p><span className="attribute-name">Username:</span> {usuario.username}</p>
            <p><span className="attribute-name">Teléfono:</span> {usuario.telefono}</p>
            <p><span className="attribute-name">Dirección:</span> {usuario.direccion}</p>
            <p><span className="attribute-name">Rol:</span> {usuario.rol}</p>
          </div>
        </>
      )}
    </div>
  );
}

