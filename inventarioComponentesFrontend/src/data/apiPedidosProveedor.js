import axios from 'axios';

export const obtenerTodosLosPedidosProveedor = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pedidosprov/allPP');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
      throw error;
    }
  };
  
  export const registrarPedidoProveedor = async (pedido) => {
    try {
      const response = await axios.post('http://localhost:8080/api/pedidosprov/registrarPP', pedido);
      return response.data;
    } catch (error) {
      console.error('Error al registrar el pedido:', error);
      throw error;
    }
  };
  
  
  export const buscarPedidoProveedorPorId = async (codigo) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/pedidosprov/buscarPP/${codigo}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el pedido por codigo:', error);
      throw error;
    }
  };
  
  export const eliminarPedidoProveedor = async (codigo) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/pedidosprov/eliminarPP/${codigo}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
      throw error;
    }
  };
  
  
  export const modificarPedidoProveedor = async (pedido) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/pedidosprov/actualizarPP/${pedido.codigo}`, pedido);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
      throw error;
    }
  };