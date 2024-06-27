import axios from 'axios';

export const obtenerProveedores = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/proveedores/proveedores');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los proveedores:', error);
      throw error;
    }
  };
  
  export const registrarProveedor = async (proveedor) => {
    try {
      const response = await axios.post('http://localhost:8080/api/proveedores/agregar', proveedor);
      return response.data;
    } catch (error) {
      console.error('Error al registrar el proveedor:', error);
      throw error;
    }
  };
  
  
  export const obtenerProveedorPorNombre = async (nombre) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/proveedores/buscar/${nombre}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el proveedor por Nombre:', error);
      throw error;
    }
  };
  
  export const eliminarProveedor = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/proveedores/eliminar/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
      throw error;
    }
  };
  
  
  export const actualizarProveedor = async (proveedor) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/proveedores/actualizar/${proveedor.id}`, proveedor);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
      throw error;
    }
  };