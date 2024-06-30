import axios from 'axios';

export const obtenerTodosLosPedidosDeSalida = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pedidodesalida/allPS');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
      throw error;
    }
  };
  
  export const registrarPedidoDeSalida = async (pedido) => {
    try {
      const response = await axios.post('http://localhost:8080/api/pedidodesalida/registrarPS', pedido);
      return response.data;
    } catch (error) {
      console.error('Error al registrar el pedido:', error);
      throw error;
    }
  };
  
  
  export const buscarPedidoDeSalidaPorId = async (codigo) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/pedidodesalida/buscarPS/${codigo}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el pedido por codigo:', error);
      throw error;
    }
  };
  
  export const eliminarPedidoDeSalida = async (codigo) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/pedidodesalida/eliminarPS/${codigo}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
      throw error;
    }
  };
  
  
  export const modificarPedidoDeSalida = async (pedido) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/pedidodesalida/actualizarPS/${pedido.codigo}`, pedido);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
      throw error;
    }
  };