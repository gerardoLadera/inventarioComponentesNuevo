import React from 'react';
import { useEffect, useState } from 'react';
import '../css/usuarios.css'; // Importa el archivo CSS para los estilos
import { obtenerUsuarios } from '../data/apiUsuarios';
export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
          try {
            const usuariosObtenidos = await obtenerUsuarios();
            setUsuarios(usuariosObtenidos);
          } catch (error) {
            console.error('Error al obtener los usuarios:', error);
          }
        };
        fetchUsuarios();
      }, []);
    
      return (
        <div className="usuarios-container">
          <h2>Usuarios</h2>
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>DNI</th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.dni}</td>
                  <td>{usuario.username}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }