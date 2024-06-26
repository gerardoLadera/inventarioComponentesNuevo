import React from 'react';
import { useEffect, useState } from 'react';
import FormRegistroUsuario from '../components/FormRegistroUsuario';
import { obtenerUsuarios } from '../data/apiUsuarios';
import '../css/usuarios.css'; // Importa el archivo CSS para los estilos

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

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

      const handleCrearUsuario = (nuevoUsuario) => {
        setUsuarios([...usuarios, nuevoUsuario]);
      };
    
    
      return (
        <div className="usuarios-container">
          <h2>Usuarios</h2>
          <div className="usuarios-header">
            <button onClick={() => setMostrarFormulario(true)}>Crear Usuario</button>
          </div>
            {mostrarFormulario && (<FormRegistroUsuario onClose={() => setMostrarFormulario(false)}
          onUsuarioCreado={handleCrearUsuario}/>)}
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>N°</th> 
                <th>DNI</th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{index + 1}</td> 
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