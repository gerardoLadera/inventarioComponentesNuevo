import { useState,useEffect } from 'react';
import '../css/formCrearUsuario.css'; // Importa el archivo CSS para los estilos
import { registrarMovimiento,actualizarMovimiento} from '../data/apiMovimientos';
export default function FormRegistroMovi({ onClose, onMovimientoCreado, onMovimientoActualizado,movimientoActualizar }) {
  const [form, setForm] = useState({
    tipoMovimiento: '',
    codigoPedido: '',
    descripcion:'',
  });

  useEffect(() => {
    if (movimientoActualizar) {
      setForm(movimientoActualizar);
    }
  }, [movimientoActualizar]);

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
      if (movimientoActualizar) {
        const movimientoActualizado = await actualizarMovimiento(form);
        onMovimientoActualizado(movimientoActualizado);
      } else {
        const nuevoMovimiento = await registrarMovimiento(form);
        onMovimientoCreado(nuevoMovimiento);
      }
      onClose();
    } catch (error) {
      console.error('Error al registrar el movimiento:', error);
  }
};

return (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>{movimientoActualizar ? 'Actualizar Movimiento' : 'Crear Movimiento'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Tipo:</label>
                  <select name="tipoMovimiento" value={form.tipoMovimiento} onChange={handleChange} required>
                      <option value="Entrada">Entrada</option>
                      <option value="Salida">Salida</option>
                  </select>
                </div>
                <div className="form-group">
                    <label>Id Pedido:</label>
                    <input type="text" name="codigoPedido" value={form.codigoPedido} onChange={handleChange} required />
                </div> 
                <div className="form-group">
                    <label>Descripción:</label>
                    <input type="text" name="descripcion" value={form.descripcion} onChange={handleChange} required />
                </div>
    
                <button type="submit">{movimientoActualizar ? 'Actualizar' : 'Crear'}</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    </div>
);
}