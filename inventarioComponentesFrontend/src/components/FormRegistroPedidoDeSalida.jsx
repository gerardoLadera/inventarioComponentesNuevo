import { useState, useEffect } from 'react';
import '../css/formCrearUsuario.css'; 
import { registrarPedidoDeSalida, modificarPedidoDeSalida } from '../data/apiPedidosSalida';
import {obtenerProductos} from '../data/apiProductos';
//import { registrarMovimiento } from '../data/apiMovimientos';

export default function FormRegistroPedidoSalida({ onClose, onPedidoCreado, onPedidoActualizado, pedidoActualizar,usuario}) {
  const [form, setForm] = useState({
    dni_Cliente:'',
    codigoProducto: '',
    cantidad: '',
    dniUsuario:usuario?.dni || ''
  });

  useEffect(() => {
    if (!usuario || !usuario.dni) {
      alert('Se requiere estar logueado para registrar o actualizar un pedido.');
      onClose();
    } else if (pedidoActualizar) {
      setForm(pedidoActualizar);
    }
  }, [pedidoActualizar, usuario, onClose]);



  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosObtenidos = await obtenerProductos();
        setProductos(productosObtenidos);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);



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
      if (pedidoActualizar) {
        const pedidoActualizado = await modificarPedidoDeSalida(form);
        onPedidoActualizado(pedidoActualizado);
      } else {
        const nuevoPedido = await registrarPedidoDeSalida(form);
        onPedidoCreado(nuevoPedido);
       
    }

      onClose();
    } catch (error) {
      console.error('Error al registrar el pedido:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{pedidoActualizar ? 'Actualizar Pedido' : 'Registrar Pedido Cliente'}</h2>
        <form onSubmit={handleSubmit}>
           <div className="form-group">
             <label>DNI Cliente:</label>
             <input type="text" name="dni_Cliente" value={form.dni_Cliente} onChange={handleChange} required />
           </div>
          <div className="form-group">
            <label>ID Producto:</label>
            <select name="codigoProducto" value={form.codigoProducto} onChange={handleChange} required>
              <option value="">Seleccione un producto</option>
              {productos.map(producto => (
                <option key={producto.id} value={producto.id}>
                  {producto.id}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Cantidad:</label>
            <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>DNI usuario:</label>
            <input type="number" name="dniUsuario" value={form.dniUsuario} onChange={handleChange} disabled={true} required />
          </div>
          <button type="submit">{pedidoActualizar ? 'Actualizar' : 'Crear'}</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}