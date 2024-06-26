import { useState } from 'react';
import '../css/formCrearUsuario.css'; // Importa el archivo CSS para los estilos
import { registrarUsuario } from '../data/apiUsuarios';
export default function FormRegistroUsuario({ onClose, onUsuarioCreado }) {
  const [form, setForm] = useState({
    dni: '',
    username: '',
    password: '',
    nombre: '',
    primerApellido:'',
    segundoApellido:'',
    telefono:'',
    direccion:'',
    rol: 'empleado'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoUsuario = await registrarUsuario(form);
      onUsuarioCreado(nuevoUsuario);
      onClose();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      // Manejo de errores, muestra un mensaje al usuario si es necesario
    }
  };

return (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>DNI</label>
                <input type="text" name="dni" value={form.dni} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label>Usuario</label>
                <input type="text" name="username" value={form.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label>Contraseña</label>
                <input type="text" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label>Nombre</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label>Primer Apellido</label>
                <input type="text" name="primerApellido" value={form.primerApellido} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label>Segundo Apellido</label>
                <input type="text" name="segundoApellido" value={form.segundoApellido} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label>Teléfono</label>
                <input type="text" name="telefono" value={form.telefono} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label>Dirección</label>
                <input type="text" name="direccion" value={form.direccion} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label>Rol</label>
                <select name="rol" value={form.rol} onChange={handleChange} required>
                    <option value="empleado">Empleado</option>
                    <option value="administrador">Administrador</option>
                </select>
                </div>
                <button type="submit">Crear</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    </div>
);
}