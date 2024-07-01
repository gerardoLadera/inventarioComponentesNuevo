import React from 'react';
import { useLocation } from 'react-router-dom';
import CardPerfil from '../components/CardPerfil';
import { useUser } from '../contexts/UserContext';
import cajas_Perfil from "../img/cajas_Perfil.png";
import '../css/perfil.css'; 

export default function Perfil (){
  const { usuario } = useUser();
  //const location = useLocation();
  //const usuario = location.state?.usuario || null;

  return (
    <div className="perfil-container">
      <div className="card-perfil-container">
         <CardPerfil usuario={usuario} />
      </div>
      <div className="imagen-container">
        <img src={cajas_Perfil} alt="Imagen de ejemplo" className="imagen" />
      </div>
    </div>
  );
}