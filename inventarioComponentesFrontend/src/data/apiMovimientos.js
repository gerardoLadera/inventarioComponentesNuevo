import axios from 'axios';

export const obtenerTodosLosMovimientos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/movimientos/todos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los movimientos:', error);
      throw error;
    }
  };
  
  export const registrarMovimiento = async (movimiento) => {
    try {
      const response = await axios.post('http://localhost:8080/api/movimientos/registrar', movimiento);
      return response.data;
    } catch (error) {
      console.error('Error al registrar el movimiento:', error);
      throw error;
    }
  };
  
  
  export const buscarMovimientoPorId = async (codigo) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/movimientos/buscar/${codigo}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el movimiento por codigo:', error);
      throw error;
    }
  };
  
  export const eliminarMovimiento = async (codigo) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/movimientos/eliminar/${codigo}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el movimiento:', error);
      throw error;
    }
  };
  
  
  export const actualizarMovimiento = async (movimiento) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/movimientos/actualizar/${movimiento.codigo}`, movimiento);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el movimiento:', error);
      throw error;
    }
  };