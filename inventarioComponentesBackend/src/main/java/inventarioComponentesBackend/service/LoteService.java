package inventarioComponentesBackend.service;

import java.util.List;

import inventarioComponentesBackend.model.Lote;

public interface LoteService {
    void registrarLote(Lote lote);

    Lote buscarLotePorId(String id);

    void modificarLote(String id, Lote loteActualizado);

    boolean eliminarLote(String id);

    List<Lote> obtenerTodosLosLotes();

    void cargarLotesDesdeBaseDeDatos();
    
    boolean validarCalidadLote(String id, boolean aprobado);
}

