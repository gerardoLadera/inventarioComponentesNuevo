import axios from 'axios';

export const login = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:8080/api/usuarios/login', credentials);

    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { success: false, message: 'Credenciales incorrectas' };
    } else {
      console.error('Error durante el inicio de sesión:', error);
      return { success: false, message: 'Ocurrió un error. Inténtalo de nuevo más tarde.' };
    }
  }
};

export const obtenerUsuarios = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/usuarios/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

export const registrarUsuario = async (usuario) => {
  try {
    const response = await axios.post('http://localhost:8080/api/usuarios/registrar', usuario);
    return response.data;
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};


export const obtenerUsuarioPorDNI = async (dni) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/usuarios/buscar/${dni}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario por DNI:', error);
    throw error;
  }
};

export const eliminarUsuario = async (dni) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/usuarios/eliminar/${dni}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};


export const actualizarUsuario = async (usuario) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/usuarios/actualizar/${usuario.dni}`, usuario);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};



export const obtenerEmpleados = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/usuarios/empleados');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    throw error;
  }
};

export const obtenerAdministradores = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/usuarios/administradores');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los administradores:', error);
    throw error;
  }
};