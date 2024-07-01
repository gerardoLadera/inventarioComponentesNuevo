import React from 'react';
import adminIcon from "../img/adminIcon.png";
import empleadoIcon from "../img/emepleadoIcon.png";
import '../css/cardPerfil.css'; 


export default function CardPerfil({ usuario }) {  
  return (
    <div className="card-perfil">
        <>
          <div className="avatar-container">
            <img
              src={usuario?.rol === 'administrador' ? adminIcon : empleadoIcon}
              alt={usuario?.rol === 'administrador' ? 'Administrador' : 'Empleado'}
              className="avatar"
            />
          </div>
          <div className="info-container">
            <h2>{usuario?.nombre||"No disponible"}</h2>
            <p><span className="attribute-name">Primer Apellido:</span> {usuario?.primerApellido || "No disponible"}</p>
            <p><span className="attribute-name">Segundo Apellido:</span> {usuario?.segundoApellido || "No disponible"}</p>
            <p><span className="attribute-name">DNI:</span> {usuario?.dni || "No disponible"}</p>
            <p><span className="attribute-name">Username:</span> {usuario?.username || "No disponible"}</p>
            <p><span className="attribute-name">Teléfono:</span> {usuario?.telefono || "No disponible"}</p>
            <p><span className="attribute-name">Dirección:</span> {usuario?.direccion || "No disponible"}</p>
            <p><span className="attribute-name">Rol:</span> {usuario?.rol || "No disponible"}</p>
          </div>
        </>
    </div>
  );
}

