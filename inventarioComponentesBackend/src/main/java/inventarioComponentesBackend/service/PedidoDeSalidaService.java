package inventarioComponentesBackend.service;

import java.util.List;

import inventarioComponentesBackend.model.PedidoDeSalida;

public interface PedidoDeSalidaService {

    void registrarPedidoDeSalida(PedidoDeSalida pedidoDeSalida);

    PedidoDeSalida buscarPedidoDeSalidaPorId(String id);

    void modificarPedidoDeSalida(String id, PedidoDeSalida pedidoDeSalidaActualizado);

    boolean eliminarPedidoDeSalida(String id);

    void cargarPedidosDeSalidaDesdeBaseDeDatos();

    List<PedidoDeSalida> obtenerTodosLosPedidosDeSalida();
}
