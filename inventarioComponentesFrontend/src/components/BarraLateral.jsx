import React from 'react';
import {  Outlet, Link, useLocation  } from 'react-router-dom';
import '../css/barraLateral.css';
import ProfileIcon from "../img/icono_antecedentes.png"
import LinkButton from "../components/LinkButton";
import { useUser } from '../contexts/UserContext';

export default function BarraLateral  ()  {
const location = useLocation();
const { usuario } = useUser();
  return (
    <div className="sidebar">
      <h2>SGI Components</h2>
      <aside>
        <nav>
            <ul>
            <li>
                <Link to={'/sgi/perfil'}><LinkButton active={location.pathname==='/perfil'}
                    img={ProfileIcon}>
                        Perfil
                </LinkButton></Link>
            </li>
            <li>
                <Link to={'/usuarios'}><LinkButton active={location.pathname==='/'}
                    img={ProfileIcon}>
                        Usuarios
                </LinkButton></Link>
            </li>
            <li>
                <Link to={'/empleados'}><LinkButton active={location.pathname==='/'}
                    img={ProfileIcon}>
                        Empleados
                </LinkButton></Link>
            </li>
            <li>
                <Link to={'/proveedores'}><LinkButton active={location.pathname==='/'}
                    img={ProfileIcon}>
                        Proveedores
                </LinkButton></Link>
            </li>
            <li>
                <Link to={'/inventario'}><LinkButton active={location.pathname==='/'}
                    img={ProfileIcon}>
                        Inventario
                </LinkButton></Link>
            </li>
            <li>
                <Link to={"/movimientos"}><LinkButton active={location.pathname==='/'}
                    img={ProfileIcon}>
                        Movimientos
                </LinkButton></Link>
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

