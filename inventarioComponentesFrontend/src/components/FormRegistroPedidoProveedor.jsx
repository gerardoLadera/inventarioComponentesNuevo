import { useState, useEffect } from 'react';
import '../css/formCrearUsuario.css'; 
import { registrarPedidoProveedor, modificarPedidoProveedor } from '../data/apiPedidosProveedor';
import { obtenerProveedores } from '../data/apiProveedores';
import {obtenerProductos} from '../data/apiProductos';
import { registrarMovimiento } from '../data/apiMovimientos';

export default function FormRegistroPedidoProvee({ onClose, onPedidoCreado, onPedidoActualizado, pedidoActualizar,usuario}) {
  const [form, setForm] = useState({
    codigoProveedor: '',
    id_producto: '',
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

  const [proveedores, setProveedores] = useState([]);
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const proveedoresObtenidos = await obtenerProveedores();
        setProveedores(proveedoresObtenidos);
      } catch (error) {
        console.error('Error al obtener los proveedores:', error);
      }
    };

    fetchProveedores();
  }, []);


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
        const pedidoActualizado = await modificarPedidoProveedor(form);
        onPedidoActualizado(pedidoActualizado);
      } else {
        const nuevoPedido = await registrarPedidoProveedor(form);
        onPedidoCreado(nuevoPedido);
        const movimiento = {
            tipoMovimiento: 'Entrada',
            codigoPedido: nuevoPedido.codigo, 
            descripcion: form.id_producto
          };
          await registrarMovimiento(movimiento);
    }

      onClose();
    } catch (error) {
      console.error('Error al registrar el pedido:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{pedidoActualizar ? 'Actualizar Pedido' : 'Crear Pedido'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID Proveedor:</label>
            <select name="codigoProveedor" value={form.codigoProveedor} onChange={handleChange} required>
              <option value="">Seleccione un proveedor</option>
              {proveedores.map(proveedor => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.id}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>ID Producto:</label>
            <select name="id_producto" value={form.id_producto} onChange={handleChange} required>
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