package inventarioComponentesBackend.service;

import java.util.List;
import inventarioComponentesBackend.model.Producto;

public interface ProductoService {

    void registrarProducto(Producto producto);

    Producto buscarProducto(int id);

    boolean eliminarProducto(int idProducto);

    Producto verDetalleProducto(int id);

    List<Producto> obtenerTodosLosProductos();

    void cargarProductosDesdeBaseDeDatos();

    void actualizarProducto(int id, Producto producto);
}
