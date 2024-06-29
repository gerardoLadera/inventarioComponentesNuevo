import React from 'react';
import { useEffect, useState } from 'react';
import FormRegistroMovi from '../components/FormRegistroMovi';
import { obtenerTodosLosMovimientos,buscarMovimientoPorId,actualizarMovimiento,eliminarMovimiento} from '../data/apiMovimientos';
import '../css/proveedores.css'; 
import lupa from '../img/lupaIcon.png';
export default function Movimientos() {
    const [movimientos, setMovimientos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [busquedaCodigo, setBusquedaCodigo] = useState('');
    const [movimientoActualizar, setMovActualizar] = useState(null);

    useEffect(() => {
        const fetchMovimientos = async () => {
          try {
            const movimientosObtenidos = await obtenerTodosLosMovimientos();
            setMovimientos(movimientosObtenidos);
          } catch (error) {
            console.error('Error al obtener los movimientos:', error);
          }
        };
        fetchMovimientos();
      }, []);



      const handleCrearMovimiento = (nuevoMovimiento) => {
        setMovimientos([...movimientos, nuevoMovimiento]);
      };
    
      const handleBusquedaCodigo = async () => {
        if (busquedaCodigo.trim() === '') {
          const movimientosObtenidos = await obtenerTodosLosMovimientos();
          setMovimientos(movimientosObtenidos);
          return;
        }   
        try {
          const movimientoEncontrado = await buscarMovimientoPorId(busquedaCodigo);
          setMovimientos(movimientoEncontrado ? [movimientoEncontrado] : []);
        } catch (error) {
          console.error('Error al buscar el movimiento:', error);
        }
      };

      const handleEliminarMovimiento = async (codigo) => {
        try {
            await eliminarMovimiento(codigo);
            setMovimientos(movimientos.filter(movimiento => movimiento.codigo !== codigo));
        } catch (error) {
            console.error('Error al eliminar el movimiento:', error);
        }
    };

    const handleActualizarMovimiento = async (movimientoActualizado) => {
      try {
          const movimientoActualizadoResponse = await actualizarMovimiento(movimientoActualizado);
          setMovimientos(movimientos.map(movimiento => movimiento.codigo === movimientoActualizado.codigo ? movimientoActualizadoResponse : movimiento));
      } catch (error) {
          console.error('Error al actualizar el movimiento:', error);
      }
  };

  const handleActualizarClick = (movimiento) => {
    setMovActualizar(movimiento);
    setMostrarFormulario(true);
};
    
    
      return (
        <div className="usuarios-container">
          <h2>Movimientos</h2>
          <div className="usuarios-header">
            <button onClick={() => setMostrarFormulario(true)}>Nuevo Movimiento</button>
            <div className="busqueda-container">
              <button className="busqueda-button" onClick={handleBusquedaCodigo}>
                <img src={lupa} alt="Buscar" className="lupa-icon" />
              </button>
              <input
                type="text"
                placeholder="Buscar por id"
                value={busquedaCodigo}
                onChange={(e) => setBusquedaCodigo(e.target.value)}
                className="busqueda-dni"
              />
            </div>
          </div>
          {mostrarFormulario && (
                <FormRegistroMovi
                    onClose={() => {
                        setMostrarFormulario(false);
                        setMovActualizar(null);
                    }}
                    onMovimientoCreado={handleCrearMovimiento}
                    onMovimientoActualizado={handleActualizarMovimiento}
                    movimientoActualizar={movimientoActualizar}
                />
            )}
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Codigo</th> 
                <th>Tipo</th>
                <th>Hora</th>
                <th>Fecha</th>
                <th>Id Pedido</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((movimiento,index) => (
                <tr key={index}>
                  <td>{movimiento.codigo}</td> 
                  <td>{movimiento.tipoMovimiento}</td>
                  <td>{movimiento.hora}</td>
                  <td>{movimiento.fechaMovimiento}</td>
                  <td>{movimiento.codigoPedido}</td>
                  <td>
                    <button className='button-actualizar'  onClick={() => handleActualizarClick(movimiento)}>Actualizar</button>
                    <button onClick={() => handleEliminarMovimiento(movimiento.codigo)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }