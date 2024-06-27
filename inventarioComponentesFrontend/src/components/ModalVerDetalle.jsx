import React from 'react';
import '../css/modalDetalleProducto.css'; // Importa el archivo CSS para los estilos

const ModalDetalleProducto = ({ producto, onClose }) => {
    if (!producto) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Detalles del Producto</h2>
                <div className="detalle-item"><strong>ID:</strong> {producto.id}</div>
                <div className="detalle-item"><strong>Nombre:</strong> {producto.nombre}</div>
                <div className="detalle-item"><strong>Modelo:</strong> {producto.modelo}</div>
                <div className="detalle-item"><strong>Marca:</strong> {producto.marca}</div>
                <div className="detalle-item"><strong>Stock:</strong> {producto.stock}</div>
                <div className="detalle-item"><strong>Tipo:</strong> {producto.tipo}</div>
                <div className="detalle-item"><strong>Descripción:</strong> {producto.descripcion}</div>
                {/* Añade más campos si es necesario */}
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default ModalDetalleProducto;
