import { useState,useEffect } from 'react';
import '../css/formCrearUsuario.css'; // Importa el archivo CSS para los estilos
import { registrarProveedor,actualizarProveedor} from '../data/apiProveedores';
export default function FormRegistroProve({ onClose, onProveedorCreado, onProveedorActualizado,proveedorActualizar }) {
  const [form, setForm] = useState({
    name: '',
    correo: '',
    telefono: '',
    direccion:''
  });

  useEffect(() => {
    if (proveedorActualizar) {
      setForm(proveedorActualizar);
    }
  }, [proveedorActualizar]);

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
      if (proveedorActualizar) {
        const proveedorActualizado = await actualizarProveedor(form);
        onProveedorActualizado(proveedorActualizado);
      } else {
        const nuevoProveedor = await registrarProveedor(form);
        onProveedorCreado(nuevoProveedor);
      }
      onClose();
    } catch (error) {
      console.error('Error al registrar el proveedor:', error);
  }
};

return (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>{proveedorActualizar ? 'Actualizar Proveedor' : 'Crear Proveedor'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Correo:</label>
                    <input type="text" name="correo" value={form.correo} onChange={handleChange} required />
                </div> 
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input type="text" name="telefono" value={form.telefono} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Dirección:</label>
                    <input type="text" name="direccion" value={form.direccion} onChange={handleChange} required />
                </div>
                <button type="submit">{proveedorActualizar ? 'Actualizar' : 'Crear'}</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    </div>
);
}