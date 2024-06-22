package inventarioComponentesBackend.service;

import java.util.List;

import inventarioComponentesBackend.model.Movimiento;

public interface MovimientoService {

    void registrarMovimiento(Movimiento movimiento);

    Movimiento buscarMovimientoPorId(String id);

    void modificarMovimiento(String id, Movimiento movimientoActualizado);

    boolean eliminarMovimiento(String id);

    void cargarMovimientosDesdeBaseDeDatos();

    List<Movimiento> obtenerTodosLosMovimientos();

    
}
