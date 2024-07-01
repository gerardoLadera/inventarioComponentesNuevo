import axios from 'axios';

export const obtenerTodosLosLotes = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/lotes/todos');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los lotes:', error);
        throw error;
    }
};



export const validarLote = async (id, aprobado) => {
    const response = await axios.post(`http://localhost:8080/api/lotes/validar/${id}`, null, { params: { aprobado } });
    return response.data;
};

export const registrarLote = async (lote) => {
    try {
        const response = await axios.post('http://localhost:8080/api/lotes/registrar', lote);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el lote:', error);
        throw error;
    }
}

export const eliminarLote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/lotes/eliminar/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el lote:', error);
      throw error;
    }
  };