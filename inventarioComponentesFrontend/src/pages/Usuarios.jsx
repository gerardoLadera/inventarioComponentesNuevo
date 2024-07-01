import React from 'react';
import { useEffect, useState } from 'react';
import FormRegistroUsuario from '../components/FormRegistroUsuario';
import { obtenerEmpleados,obtenerAdministradores,obtenerUsuarios,obtenerUsuarioPorDNI,actualizarUsuario,eliminarUsuario} from '../data/apiUsuarios';
import '../css/usuarios.css'; 
import lupa from '../img/lupaIcon.png';
export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [busquedaDni, setBusquedaDni] = useState('');
    const [usuarioActualizar, setUsuarioActualizar] = useState(null);
    

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
    
      const handleBusquedaDni = async () => {
        if (busquedaDni.trim() === '') {
          const usuariosObtenidos = await obtenerUsuarios();
          setUsuarios(usuariosObtenidos);
          return;
        }   
        try {
          const usuarioEncontrado = await obtenerUsuarioPorDNI(busquedaDni);
          setUsuarios(usuarioEncontrado ? [usuarioEncontrado] : []);
        } catch (error) {
          console.error('Error al buscar el usuario:', error);
        }
      };

      const handleEliminarUsuario = async (dni) => {
        try {
            await eliminarUsuario(dni);
            setUsuarios(usuarios.filter(usuario => usuario.dni !== dni));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    const handleActualizarUsuario = async (usuarioActualizado) => {
      try {
          const usuarioActualizadoResponse = await actualizarUsuario(usuarioActualizado);
          setUsuarios(usuarios.map(usuario => usuario.dni === usuarioActualizado.dni ? usuarioActualizadoResponse : usuario));
      } catch (error) {
          console.error('Error al actualizar el usuario:', error);
      }
  };

  const handleActualizarClick = (usuario) => {
    setUsuarioActualizar(usuario);
    setMostrarFormulario(true);
};

const handleFiltrarPorRol = async (rol) => {
  try {
      let usuariosFiltrados;
      if (rol === 'empleado') {
          usuariosFiltrados = await obtenerEmpleados();
      } else if (rol === 'administrador') {
          usuariosFiltrados = await obtenerAdministradores();
      } else {
          usuariosFiltrados = await obtenerUsuarios();
      }
      setUsuarios(usuariosFiltrados);
  } catch (error) {
      console.error(`Error al obtener los usuarios por rol (${rol}):`, error);
  }
};

    
    
      return (
        <div className="usuarios-container">
          <h2>Usuarios</h2>
          <div className="usuarios-header">
            <button onClick={() => setMostrarFormulario(true)}>Nuevo Usuario</button>
            <div className="busqueda-container">
              <button className="busqueda-button" onClick={handleBusquedaDni}>
                <img src={lupa} alt="Buscar" className="lupa-icon" />
              </button>
              <input
                type="text"
                placeholder="Buscar por DNI"
                value={busquedaDni}
                onChange={(e) => setBusquedaDni(e.target.value)}
                className="busqueda-dni"
              />
            </div>
            <div className="filtro-rol-container">
              <label>Filtrar por rol:</label>
              <select className='barrafiltro'  onChange={(e) => handleFiltrarPorRol(e.target.value)}>
                <option value="">Todos</option>
                <option value="empleado">Empleado</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
          </div>
          {mostrarFormulario && (
                <FormRegistroUsuario
                    onClose={() => {
                        setMostrarFormulario(false);
                        setUsuarioActualizar(null);
                    }}
                    onUsuarioCreado={handleCrearUsuario}
                    onUsuarioActualizado={handleActualizarUsuario}
                    usuarioActualizar={usuarioActualizar}
                />
            )}
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>N°</th> 
                <th>DNI</th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Acciones</th>
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
                  <td>
                    <button className='button-actualizar'  onClick={() => handleActualizarClick(usuario)}>Actualizar</button>
                    <button onClick={() => handleEliminarUsuario(usuario.dni)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }