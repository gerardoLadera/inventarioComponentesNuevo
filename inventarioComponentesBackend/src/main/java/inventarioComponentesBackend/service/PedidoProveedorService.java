package inventarioComponentesBackend.service;

import java.util.List;

import inventarioComponentesBackend.model.PedidoProveedor;

public interface PedidoProveedorService {
    
    void registrarPedidoProveedor(PedidoProveedor pedidoproveedor);

    PedidoProveedor buscarPedidoProveedorPorId(String id);

    void modificarPedidoProveedor(String id, PedidoProveedor PPActualizado);

    boolean eliminarPedidoProveedor(String id);

    void cargarPedidosProveedorDesdeBaseDeDatos();

    List<PedidoProveedor> obtenerTodosLosPedidosProveedor();
}
