import React from 'react';
import { useLocation } from 'react-router-dom';
import CardPerfil from '../components/CardPerfil';
import '../css/perfil.css'; // Estilos específicos de la página de perfil

const Perfil = () => {
  const location = useLocation();
  const usuario = location.state?.usuario || null;

  return (
    <div className="perfil-container">
      <div className="card-perfil-container">
        {usuario && <CardPerfil usuario={usuario} />}
      </div>
      <div className="imagen-container">
        <img src="/img/ejemplo-imagen.jpg" alt="Imagen de ejemplo" className="imagen" />
      </div>
    </div>
  );
};

export default Perfil;