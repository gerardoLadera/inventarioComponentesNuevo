package inventarioComponentesBackend.service;

import java.util.List;
import java.util.Map;

import inventarioComponentesBackend.model.Producto;

public interface ProductoService {

    void registrarProducto(Producto producto);

    Producto buscarProducto(String id);

    boolean eliminarProducto(String idProducto);

    Producto verDetalleProducto(String id);

    List<Producto> obtenerTodosLosProductos();

    void cargarProductosDesdeBaseDeDatos();
    
    List<Producto> alertaStock();

    List<Producto> obtenerProductosPorTipo(String tipo);

    void actualizarProducto(String id, Producto productoActualizado);
}
