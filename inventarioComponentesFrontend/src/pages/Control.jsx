import React from 'react';
import { useEffect, useState } from 'react';
import { obtenerTodosLosLotes, validarLote, eliminarLote} from '../data/apiLotes';
import '../css/pedido.css'; // Importa el archivo CSS para los estilos
import lupa from '../img/lupaIcon.png';
export default function Control() {
    const [lotes, setLotes] = useState([]);


    useEffect(() => {
        const fetchLotes = async () => {
            try {
                const response = await obtenerTodosLosLotes();
                setLotes(response);
            } catch (error) {
                console.error('Error al obtener los lotes:', error);
            }
        };
        fetchLotes();
    }, []);

    const handleCrearLote = (nuevoLote) => {
        setLotes([...lotes, nuevoLote]);
    }


    const handleValidarCalidad = async (id, aprobado) => {
        try {
            await validarLote(id, aprobado);
            const lotesActualizados = lotes.map((lote) =>
                lote.id === id ? { ...lote, calidadAprobada: aprobado ,validado:true} : lote
            );
            setLotes(lotesActualizados);
        } catch (error) {
            console.error('Error al validar la calidad del lote:', error);
        }
    };

    const handleEliminarLote = async (id) => {
        try {
            await eliminarLote(id);
            const lotesActualizados = lotes.filter((lote) => lote.id !== id);
            setLotes(lotesActualizados);
        } catch (error) {
            console.error('Error al eliminar el lote:', error);
        }
    };
    
    return(
        <div className="lotes">
            <h1>Lotes</h1>
            <table className="tabla">
                <thead>
                    <tr className="tabla">
                        <th>ID</th>
                        <th>Código Movimiento</th>
                        <th>Código Producto</th>
                        <th>Cantidad</th>
                        <th>Fecha Recepción</th>
                        <th>Calidad Aprobada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="tabla-body">
                 { lotes.map((lote,index) => (
                        <tr className="tabla-row" key={index}>
                            <td>{lote.id}</td>
                            <td>{lote.codigoMovimiento}</td>
                            <td>{lote.codigoProducto}</td>
                            <td>{lote.cantidad}</td>
                            <td>{lote.fechaRecepcion}</td>
                            <td>{lote.calidadAprobada ? 'Sí' : 'No'}</td>
                            <td>
                            {lote.calidadAprobada ? (
                                    'Aprobado' 
                                ) : (
                                    <button onClick={() => handleValidarCalidad(lote.id, !lote.calidadAprobada)}>Aprobar</button>
                                )}
                                <button onClick={() => handleEliminarLote(lote.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}