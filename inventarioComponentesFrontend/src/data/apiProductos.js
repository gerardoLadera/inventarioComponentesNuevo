import axios from 'axios';

export const obtenerProductos = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/productos/productos');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
};

export const obtenerProductoPorId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/productos/buscar/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw error;
    }
};

export const registrarProducto = async (producto) => {
    try {
        const response = await axios.post('http://localhost:8080/api/productos/registrar', producto);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el producto:', error);
        throw error;
    }
};

export const actualizarProducto = async (producto) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/productos/actualizar/${producto.id}`, producto);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    }
};

export const eliminarProducto = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/productos/eliminar/${id}`);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    }
};

export const obtenerProductosPorTipo = async (tipo) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/productos/clasificar/${tipo}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los productos por tipo:', error);
        throw error;
    }
};


export const alertaStock = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/productos/alertaStock');
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos bajo stock:', error);
        throw error;
    }
};