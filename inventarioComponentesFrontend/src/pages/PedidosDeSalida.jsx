import React from 'react';
import { useEffect, useState } from 'react';
import FormRegistroPedidoDeSalida from '../components/FormRegistroPedidoDeSalida';
import { useUser } from '../contexts/UserContext';
import { obtenerTodosLosPedidosDeSalida, buscarPedidoDeSalidaPorId, modificarPedidoDeSalida,eliminarPedidoDeSalida} from '../data/apiPedidosSalida';
import '../css/proveedores.css'; 
import lupa from '../img/lupaIcon.png';
export default function PedidosDeSalida() {
    const [pedidos, setPedidos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [busquedaCodigo, setBusquedaCodigo] = useState('');
    const [pedidoActualizar, setPedidoActualizar] = useState(null);
    const { usuario } = useUser();
    
    useEffect(() => {
        const fetchPedidos = async () => {
          try {
            const pedidosObtenidos = await obtenerTodosLosPedidosDeSalida();
            setPedidos(pedidosObtenidos);
          } catch (error) {
            console.error('Error al obtener los pedidos de salida:', error);
          }
        };
        fetchPedidos();
    }, []);

    const handleCrearPedido = (nuevoPedido) => {
        setPedidos([...pedidos, nuevoPedido]);
    };
    
    const handleBusquedaCodigo = async () => {
        if (busquedaCodigo.trim() === '') {
          const pedidosObtenidos = await obtenerTodosLosPedidosDeSalida();
          setPedidos(pedidosObtenidos);
          return;
        }   
        try {
          const pedidoEncontrado = await  buscarPedidoDeSalidaPorId(busquedaCodigo);
          setPedidos(pedidoEncontrado ? [pedidoEncontrado] : []);
        } catch (error) {
          console.error('Error al buscar el pedido de salida:', error);
        }
    };

    const handleEliminarPedido = async (codigo) => {
        try {
            await eliminarPedidoDeSalida(codigo);
            setPedidos(pedidos.filter(pedido => pedido.codigo !== codigo));
        } catch (error) {
            console.error('Error al eliminar el pedido de salida:', error);
        }
    };

    const handleActualizarPedido = async (pedidoActualizado) => {
      try {
          const pedidoActualizadoResponse = await  modificarPedidoDeSalida(pedidoActualizado);
          setPedidos(pedidos.map(pedido => pedido.codigo === pedidoActualizado.codigo ? pedidoActualizadoResponse : pedido));
      } catch (error) {
          console.error('Error al actualizar el pedido de salida:', error);
      }
  };

  const handleActualizarClick = (pedido) => {
    setPedidoActualizar(pedido);
    setMostrarFormulario(true);
  };
    
    
      return (
        <div className="usuarios-container">
          <h2>Atender Pedidos</h2>
          <div className="usuarios-header">
            <button onClick={() => setMostrarFormulario(true)}>Nuevo Pedido Cliente</button>
            <div className="busqueda-container">
              <button className="busqueda-button" onClick={handleBusquedaCodigo}>
                <img src={lupa} alt="Buscar" className="lupa-icon" />
              </button>
              <input
                type="text"
                placeholder="Buscar por codigo"
                value={busquedaCodigo}
                onChange={(e) => setBusquedaCodigo(e.target.value)}
                className="busqueda-dni"
              />
            </div>
          </div>
          {mostrarFormulario && (
                <FormRegistroPedidoDeSalida usuario={usuario}
                onClose={() => {
                    setMostrarFormulario(false);
                    setPedidoActualizar(null);
                }}
                onPedidoCreado={handleCrearPedido}
                onPedidoActualizado={handleActualizarPedido}
                pedidoActualizar={pedidoActualizar}
                />
            )}
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Codigo</th> 
                <th>DNI Cliente</th>
                <th>DNI Usuario</th>
                <th>ID Producto</th>
                <th>Cantidad</th>
                <th>Hora Pedido</th>
                <th>Fecha Pedido</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido,index) => (
                <tr key={index}>
                  <td>{pedido.codigo}</td> 
                  <td>{pedido.dni_Cliente}</td>
                  <td>{pedido.dniUsuario}</td>
                  <td>{pedido.codigoProducto}</td>
                  <td>{pedido.cantidad}</td>
                  <td>{pedido.horaPedido}</td>
                  <td>{pedido.fechaPedido}</td>
                  <td>
                    <button className='button-actualizar' onClick={() => handleActualizarClick(pedido)}>Actualizar</button>
                    <button onClick={() => handleEliminarPedido(pedido.codigo)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }