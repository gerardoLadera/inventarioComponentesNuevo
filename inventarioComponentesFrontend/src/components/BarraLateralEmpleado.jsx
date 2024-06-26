import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import '../css/barraLateral.css';
import iconoPerfil from "../img/iconoPerfil.png";
import iconoEmple from "../img/iconoEmple.png";
import iconoProve from "../img/iconoProve.png";
import iconoInvent from "../img/iconoInvent.png";
import iconoMovi from "../img/iconoMovi.png";
import iconoPedido from "../img/iconoPedido.png";
import { useUser } from '../contexts/UserContext';
import LinkButton from '../components/LinkButton';
import SGIIcon from "../img/SGIIcon.png";
export default function BarraLateral() {
  const location = useLocation();
  const { usuario } = useUser();

  const getLinkClass = (path) => {
    return location.pathname === path ? 'link active' : 'link';
  };

  return (
    <div className="main">
        <aside className="sidebar">
        <h2>
          <img src={SGIIcon} alt="SGI Icon" className="sgi-icon" /> 
          SGI Components
        </h2>
        <hr />
          <nav>
            <ul>
              <li>
                <Link to="/sgi/perfil">
                  <LinkButton active={location.pathname === '/sgi/perfil'} img={iconoPerfil}>
                    Perfil
                  </LinkButton>
                </Link>
              </li>
              <li>
                <Link to="/usuarios">
                  <LinkButton active={location.pathname === '/usuarios'} img={iconoEmple}>
                    Empleados
                  </LinkButton>
                </Link>
              </li>
              <li>
                <Link to="/empleados">
                  <LinkButton active={location.pathname === '/empleados'} img={iconoProve}>
                    Proveedores
                  </LinkButton>
                </Link>
              </li>
              <li>
                <Link to="/proveedores">
                  <LinkButton active={location.pathname === '/proveedores'} img={iconoInvent}>
                    Inventario
                  </LinkButton>
                </Link>
              </li>
              <li>
                <Link to="/inventario">
                  <LinkButton active={location.pathname === '/inventario'} img={iconoMovi}>
                    Movimientos
                  </LinkButton>
                </Link>
              </li>
              <li>
                <Link to="/movimientos">
                  <LinkButton active={location.pathname === '/movimientos'} img={iconoPedido}>
                    Pedidos
                  </LinkButton>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <section className="section">
          <Outlet context={{ usuario }} />
        </section>
      </div>
  );
}   