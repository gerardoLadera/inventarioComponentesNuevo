import React from 'react';
import { useEffect, useState } from 'react';
import FormRegistroProve from '../components/FormRegistroProve';
import { obtenerProveedores,obtenerProveedorPorNombre,actualizarProveedor,eliminarProveedor} from '../data/apiProveedores';
import '../css/proveedores.css'; // Importa el archivo CSS para los estilos
import lupa from '../img/lupaIcon.png';
export default function Proveedores() {
    const [proveedores, setProveedores] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [proveedorActualizar, setProveedorActualizar] = useState(null);

    useEffect(() => {
        const fetchProveedores = async () => {
          try {
            const proveedoresObtenidos = await obtenerProveedores();
            setProveedores(proveedoresObtenidos);
          } catch (error) {
            console.error('Error al obtener los proveedores:', error);
          }
        };
        fetchProveedores();
      }, []);



      const handleCrearProveedor = (nuevoProveedor) => {
        setProveedores([...proveedores, nuevoProveedor]);
      };
    
      const handleBusquedaNombre = async () => {
        if (busquedaNombre.trim() === '') {
          const proveedoresObtenidos = await obtenerProveedores();
          setProveedores(proveedoresObtenidos);
          return;
        }   
        try {
          const proveedorEncontrado = await obtenerProveedorPorNombre(busquedaNombre);
          setProveedores(proveedorEncontrado ? [proveedorEncontrado] : []);
        } catch (error) {
          console.error('Error al buscar el proveedor:', error);
        }
      };

      const handleEliminarProveedor = async (id) => {
        try {
            await eliminarProveedor(id);
            setProveedores(proveedores.filter(proveedor => proveedor.id !== id));
        } catch (error) {
            console.error('Error al eliminar el proveedor:', error);
        }
    };

    const handleActualizarProveedor = async (proveedorActualizado) => {
      try {
          const proveedorActualizadoResponse = await actualizarProveedor(proveedorActualizado);
          setProveedores(proveedores.map(proveedor => proveedor.id === proveedorActualizado.id ? proveedorActualizadoResponse : proveedor));
      } catch (error) {
          console.error('Error al actualizar el proveedor:', error);
      }
  };

  const handleActualizarClick = (proveedor) => {
    setProveedorActualizar(proveedor);
    setMostrarFormulario(true);
};
    
    
      return (
        <div className="usuarios-container">
          <h2>Proveedores</h2>
          <div className="usuarios-header">
            <button onClick={() => setMostrarFormulario(true)}>Nuevo Proveedor</button>
            <div className="busqueda-container">
              <button className="busqueda-button" onClick={handleBusquedaNombre}>
                <img src={lupa} alt="Buscar" className="lupa-icon" />
              </button>
              <input
                type="text"
                placeholder="Buscar por nombre"
                value={busquedaNombre}
                onChange={(e) => setBusquedaNombre(e.target.value)}
                className="busqueda-dni"
              />
            </div>
          </div>
          {mostrarFormulario && (
                <FormRegistroProve
                    onClose={() => {
                        setMostrarFormulario(false);
                        setProveedorActualizar(null);
                    }}
                    onProveedorCreado={handleCrearProveedor}
                    onProveedorActualizado={handleActualizarProveedor}
                    proveedorActualizar={proveedorActualizar}
                />
            )}
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Id</th> 
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor,index) => (
                <tr key={index}>
                  <td>{proveedor.id}</td> 
                  <td>{proveedor.nombre}</td>
                  <td>{proveedor.telefono}</td>
                  <td>{proveedor.correo}</td>
                  <td>{proveedor.direccion}</td>
                  <td>
                    <button className='button-actualizar'  onClick={() => handleActualizarClick(proveedor)}>Actualizar</button>
                    <button onClick={() => handleEliminarProveedor(proveedor.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
