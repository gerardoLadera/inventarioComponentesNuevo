import React from 'react';
import { useEffect, useState } from 'react';
import FormRegistroPedidoProvee from '../components/FormRegistroPedidoProveedor';
import { useUser } from '../contexts/UserContext';
import { obtenerTodosLosPedidosProveedor,buscarPedidoProveedorPorId,modificarPedidoProveedor,eliminarPedidoProveedor} from '../data/apiPedidosProveedor';
import '../css/proveedores.css'; 
import lupa from '../img/lupaIcon.png';
export default function PedidosProveedor() {
    const [pedidos, setPedidos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [busquedaCodigo, setBusquedaCodigo] = useState('');
    const [pedidoActualizar, setPedidoActualizar] = useState(null);
    const { usuario } = useUser();
    
    useEffect(() => {
        const fetchPedidos = async () => {
          try {
            const pedidosObtenidos = await obtenerTodosLosPedidosProveedor();
            setPedidos(pedidosObtenidos);
          } catch (error) {
            console.error('Error al obtener los pedidos:', error);
          }
        };
        fetchPedidos();
    }, []);

    const handleCrearPedido = (nuevoPedido) => {
        setPedidos([...pedidos, nuevoPedido]);
    };
    
    const handleBusquedaCodigo = async () => {
        if (busquedaCodigo.trim() === '') {
          const pedidosObtenidos = await obtenerTodosLosPedidosProveedor();
          setPedidos(pedidosObtenidos);
          return;
        }   
        try {
          const pedidoEncontrado = await buscarPedidoProveedorPorId(busquedaCodigo);
          setPedidos(pedidoEncontrado ? [pedidoEncontrado] : []);
        } catch (error) {
          console.error('Error al buscar el pedido:', error);
        }
    };

    const handleEliminarPedido = async (codigo) => {
        try {
            await eliminarPedidoProveedor(codigo);
            setPedidos(pedidos.filter(pedido => pedido.codigo !== codigo));
        } catch (error) {
            console.error('Error al eliminar el pedido:', error);
        }
    };

    const handleActualizarPedido = async (pedidoActualizado) => {
      try {
          const pedidoActualizadoResponse = await modificarPedidoProveedor(pedidoActualizado);
          setPedidos(pedidos.map(pedido => pedido.codigo === pedidoActualizado.codigo ? pedidoActualizadoResponse : pedido));
      } catch (error) {
          console.error('Error al actualizar el pedido:', error);
      }
  };

  const handleActualizarClick = (pedido) => {
    setPedidoActualizar(pedido);
    setMostrarFormulario(true);
  };
    
    
      return (
        <div className="usuarios-container">
          <h2>Pedidos a proveedor</h2>
          <div className="usuarios-header">
            <button onClick={() => setMostrarFormulario(true)}>Nuevo Pedido</button>
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
                <FormRegistroPedidoProvee usuario={usuario}
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
                <th>ID Proveedor</th>
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
                  <td>{pedido.codigoProveedor}</td>
                  <td>{pedido.dniUsuario}</td>
                  <td>{pedido.id_producto}</td>
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