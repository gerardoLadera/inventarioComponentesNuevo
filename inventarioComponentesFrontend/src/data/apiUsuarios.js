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