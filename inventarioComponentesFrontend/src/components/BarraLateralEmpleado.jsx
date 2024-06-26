import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import '../css/barraLateral.css';
import iconoPerfil from "../img/iconoPerfil.png";
import iconoInvent from "../img/iconoInvent.png";
import iconoMovi from "../img/iconoMovi.png";
import iconoControl from "../img/iconoCalidad.png"
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
                <Link to="/sgi/inventario">
                  <LinkButton active={location.pathname === '/inventario'} img={iconoInvent}>
                    Inventario
                  </LinkButton>
                </Link>
              </li>
              <li>
                <Link to="/sgi//movimientos">
                  <LinkButton active={location.pathname === '/movimientos'} img={iconoMovi}>
                    Movimientos
                  </LinkButton>
                </Link>
              </li>
              <li>
                <Link to="/sgi/pedidos">
                  <LinkButton active={location.pathname === '/pedidos'} img={iconoPedido}>
                    Atender Pedidos
                  </LinkButton>
                </Link>
              </li>
              <li>
                <Link to="/control">
                  <LinkButton active={location.pathname === '/control'} img={iconoControl}>
                    Control de Calidad
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