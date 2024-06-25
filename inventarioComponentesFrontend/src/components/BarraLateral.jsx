import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import '../css/barraLateral.css';
import ProfileIcon from "../img/icono_antecedentes.png";
import { useUser } from '../contexts/UserContext';
import LinkButton from '../components/LinkButton';

export default function BarraLateral() {
  const location = useLocation();
  const { usuario } = useUser();

  const getLinkClass = (path) => {
    return location.pathname === path ? 'link active' : 'link';
  };

  return (
    <div className="sidebar">
      <h2>SGI Components</h2>
      <hr />
      <aside>
        <nav>
          <ul>
            <li>
              <Link to="/sgi/perfil">
                <LinkButton active={location.pathname === '/sgi/perfil'} img={ProfileIcon}>
                  Perfil
                </LinkButton>
              </Link>
            </li>
            <li>
              <Link to="/usuarios">
                <LinkButton active={location.pathname === '/usuarios'} img={ProfileIcon}>
                  Empleados
                </LinkButton>
              </Link>
            </li>
            <li>
              <Link to="/empleados">
                <LinkButton active={location.pathname === '/empleados'} img={ProfileIcon}>
                  Proveedores
                </LinkButton>
              </Link>
            </li>
            <li>
              <Link to="/proveedores">
                <LinkButton active={location.pathname === '/proveedores'} img={ProfileIcon}>
                  Inventario
                </LinkButton>
              </Link>
            </li>
            <li>
              <Link to="/inventario">
                <LinkButton active={location.pathname === '/inventario'} img={ProfileIcon}>
                  Movimientos
                </LinkButton>
              </Link>
            </li>
            <li>
              <Link to="/movimientos">
                <LinkButton active={location.pathname === '/movimientos'} img={ProfileIcon}>
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

