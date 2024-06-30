import { useState,useEffect } from 'react';
import '../css/formCrearUsuario.css'; // Importa el archivo CSS para los estilos
import { registrarProducto,actualizarProducto} from '../data/apiProductos';
export default function FormRegistroProducto({ onClose, onProductoCreado, onProductoActualizado,productoActualizar }) {
  const [form, setForm] = useState({
    nombre: '',
    modelo:'',
    marca:'',
    stock:'',
    tipo:'',
    descripcion:'',
  });

  useEffect(() => {
    if (productoActualizar) {
      setForm(productoActualizar);
    }
  }, [productoActualizar]);

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
      if (productoActualizar) {
        const productoActualizado = await actualizarProducto(form);
        onProductoActualizado(productoActualizado);
      } else {
        const nuevoProducto = await registrarProducto(form);
        onProductoCreado(nuevoProducto);
      }
      onClose();
    } catch (error) {
      console.error('Error al registrar el producto:', error);
  }
};

return (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>{productoActualizar ? 'Actualizar Producto' : 'Registrar Producto'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Modelo:</label>
                    <input type="text" name="modelo" value={form.modelo} onChange={handleChange} required />
                </div> 
                <div className="form-group">
                    <label>Marca:</label>
                    <input type="text" name="marca" value={form.marca} onChange={handleChange} required />
                </div> 
                <div className="form-group">
                    <label>Stock:</label>
                    <input type="text" name="stock" value={form.stock} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Tipo:</label>
                    <select name="tipo" value={form.tipo} onChange={handleChange} required>
                        <option value="Almacenamiento">Almacenamiento</option>
                        <option value="Memoria RAM">Memoria RAM</option>
                        <option value="Procesador">Procesador</option>
                        <option value="Placa Madre">Placa Madre</option>
                        <option value="Tarjeta Gráfica">Tarjeta Gráfica</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Periférico">Periférico</option>
                    </select>
                </div> 
                <div className="form-group">
                    <label>Descripción:</label>
                    <input type="text" name="descripcion" value={form.descripcion} onChange={handleChange} required />
                </div>  
                <button type="submit">{productoActualizar ? 'Actualizar' : 'Crear'}</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    </div>
);
}