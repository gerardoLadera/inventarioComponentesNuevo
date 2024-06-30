import React from 'react';
import { useEffect, useState } from 'react';
import FormRegistroProducto from '../components/FormRegistroProducto';
import ModalDetalleProducto from '../components/ModalVerDetalle';
import {alertaStock,obtenerProductos, obtenerProductoPorId, actualizarProducto, eliminarProducto, obtenerProductosPorTipo } from '../data/apiProductos';
import AlertaStock from '../components/AlertaStockBajo';
import '../css/usuarios.css'; // Importa el archivo CSS para los estilos
import lupa from '../img/lupaIcon.png';

export default function Inventario() {
    const [productos, setProductos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [busquedaId, setBusquedaId] = useState('');
    const [productoActualizar, setProductoActualizar] = useState(null);
    const [productoDetalle, setProductoDetalle] = useState(null);
    const [mostrarAlertaStockBajo, setMostrarAlertaStockBajo] = useState(false);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosObtenidos = await obtenerProductos();
                setProductos(productosObtenidos);
                const productosBajoStock = await alertaStock();
                if (productosBajoStock.length > 0) {
                    setMostrarAlertaStockBajo(true);
                }
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };
        fetchProductos();
        
    }, []);

    const handleCrearProducto = (nuevoProducto) => {
        setProductos([...productos, nuevoProducto]);
    };

    const handleBusquedaId = async () => {
        if (busquedaId.trim() === '') {
            const productosObtenidos = await obtenerProductos();
            setProductos(productosObtenidos);
            return;
        }
        try {
            const productoEncontrado = await obtenerProductoPorId(busquedaId);
            setProductos(productoEncontrado ? [productoEncontrado] : []);
        } catch (error) {
            console.error('Error al buscar el producto:', error);
        }
    };

    const handleEliminarProducto = async (id) => {
        try {
            await eliminarProducto(id);
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    const handleActualizarProducto = async (productoActualizado) => {
        try {
            const productoActualizadoResponse = await actualizarProducto(productoActualizado);
            setProductos(productos.map(producto => producto.id === productoActualizado.id ? productoActualizadoResponse : producto));
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };

    const handleActualizarClick = (producto) => {
        setProductoActualizar(producto);
        setMostrarFormulario(true);
    };

    const handleFiltrarPorTipo = async (tipo) => {
        try {
            let productosFiltrados;
            if (tipo) {
                productosFiltrados = await obtenerProductosPorTipo(tipo);
            } else {
                productosFiltrados = await obtenerProductos();
            }
            setProductos(productosFiltrados);
        } catch (error) {
            console.error(`Error al obtener los productos por tipo (${tipo}):`, error);
        }
    };

    const handleVerDetalleProducto = (producto) => {
        setProductoDetalle(producto);
    };

    return (
        <div className="usuarios-container">
            <h2>Inventario</h2>
            <div className="usuarios-header">
                <button onClick={() => setMostrarFormulario(true)}>Nuevo Producto</button>
                <div className="busqueda-container">
                    <button className="busqueda-button" onClick={handleBusquedaId}>
                        <img src={lupa} alt="Buscar" className="lupa-icon" />
                    </button>
                    <input
                        type="text"
                        placeholder="Buscar por ID"
                        value={busquedaId}
                        onChange={(e) => setBusquedaId(e.target.value)}
                        className="busqueda-dni"
                    />
                </div>
                <div className="filtro-rol-container">
                    <label>Filtrar por tipo:</label>
                    <select className='barrafiltro' onChange={(e) => handleFiltrarPorTipo(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Almacenamiento">Almacenamiento</option>
                        <option value="Memoria RAM">Memoria RAM</option>
                        <option value="Procesador">Procesador</option>
                        <option value="Placa Madre">Placa Madre</option>
                        <option value="Tarjeta Gráfica">Tarjeta Gráfica</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Periférico">Periférico</option>
                    </select>
                </div>
            </div>
            {mostrarFormulario && (
                <FormRegistroProducto
                    onClose={() => {
                        setMostrarFormulario(false);
                        setProductoActualizar(null);
                    }}
                    onProductoCreado={handleCrearProducto}
                    onProductoActualizado={handleActualizarProducto}
                    productoActualizar={productoActualizar}
                />
            )}
             {productoDetalle && (
                <ModalDetalleProducto
                    producto={productoDetalle}
                    onClose={() => setProductoDetalle(null)}
                />
            )}
             {mostrarAlertaStockBajo && (
                <div className="alerta-stock-bajo">
                    <AlertaStock />
                </div>
            )}
            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Stock</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => (
                        <tr key={index}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.marca}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.tipo}</td>
                            <td>
                                <button className='button-actualizar' onClick={() => handleActualizarClick(producto)}>Actualizar</button>
                                <button onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
                                <button className='detalle'  onClick={() => handleVerDetalleProducto(producto)}>Ver Detalle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}