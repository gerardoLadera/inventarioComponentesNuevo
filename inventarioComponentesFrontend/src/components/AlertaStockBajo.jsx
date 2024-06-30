import React, { useEffect, useState } from 'react';
import { alertaStock } from '../data/apiProductos'; 
import '../css/alertaStockBajo.css'

const StockBajoAlert = () => {
    const [productosBajoStock, setProductosBajoStock] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await alertaStock();
                setProductosBajoStock(data);
            } catch (error) {
                console.error('Error al obtener productos bajo stock en el componente:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>¡Alerta de Stock Bajo!:</h2>
            <ul>
                {productosBajoStock.map(producto => (
                    <li key={producto.id}>{producto.nombre} - Stock: {producto.stock}</li>
                ))}
            </ul>
        </div>
    );
};

export default StockBajoAlert;