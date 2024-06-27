package inventarioComponentesBackend.service;

import java.util.List;

import inventarioComponentesBackend.model.Proveedor;

public interface ProveedorService {

    void agregarProveedor(Proveedor proveedor);

    List<Proveedor> obtenerProveedores();

    Proveedor buscarProveedorPorNombre(String nombre);

    boolean eliminarProveedor(int idProveedor);

    void cargarProveedoresDesdeBaseDeDatos();
    
    void actualizarProveedor(int id, Proveedor proveedorActualizado);
}
