package inventarioComponentesBackend.service.impl;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import inventarioComponentesBackend.model.Proveedor;
import inventarioComponentesBackend.repository.ProveedorRepository;
import inventarioComponentesBackend.service.ProveedorService;
import jakarta.annotation.PostConstruct;


@Service
public class ProveedorServiceImpl implements ProveedorService{

    private Nodo listaProveedores;

    @Autowired
    private ProveedorRepository proveedorRepository;

private class Nodo {
        Proveedor proveedor;
        Nodo sgte = null;

        Nodo(Proveedor proveedor) {
            this.proveedor = proveedor;
        }
    }

    @PostConstruct
    public void init() {
        cargarProveedoresDesdeBaseDeDatos();
    }

    @Override
    public void agregarProveedor(Proveedor proveedor) {
        Nodo nuevoNodo = new Nodo(proveedor);
        if (listaProveedores == null) {
            listaProveedores = nuevoNodo;
        } else {
            Nodo temp = listaProveedores;
            while (temp.sgte != null) {
                temp = temp.sgte;
            }
            temp.sgte = nuevoNodo;
        }
        proveedorRepository.save(proveedor);
    }

    @Override
    public Proveedor buscarProveedorPorId(int id) {
        Nodo temp = listaProveedores;
        while (temp != null) {
            if (temp.proveedor.getId() == id) {
                return temp.proveedor;
            }
            temp = temp.sgte;
        }
        return null;
    }

    @Override
    public boolean eliminarProveedor(int idProveedor) {
        if (listaProveedores == null) {
            return false;
        }
        if (listaProveedores.proveedor.getId() == idProveedor) {
            Proveedor proveedorAEliminar = listaProveedores.proveedor;
            listaProveedores = listaProveedores.sgte;
            proveedorRepository.delete(proveedorAEliminar);
            return true;
        }
        Nodo temp = listaProveedores;
        while (temp.sgte != null) {
            if (temp.sgte.proveedor.getId() == idProveedor) {
                Proveedor proveedorAEliminar = temp.sgte.proveedor;
                temp.sgte = temp.sgte.sgte;
                proveedorRepository.delete(proveedorAEliminar);
                return true;
            }
            temp = temp.sgte;
        }
        return false;
    }

    @Override
    public void cargarProveedoresDesdeBaseDeDatos() {
        List<Proveedor> proveedoresEnBaseDeDatos = proveedorRepository.findAll();
        for (Proveedor proveedor : proveedoresEnBaseDeDatos) {
            agregarProveedor(proveedor);
        }
    }


    @Override
    public List<Proveedor> obtenerProveedores() {
        List<Proveedor> lista = new LinkedList<>();
        Nodo temp = listaProveedores;
        while (temp != null) {
            lista.add(temp.proveedor);
            temp = temp.sgte;
        }
        return lista;
    }


    @Override
    public void actualizarProveedor(int id, Proveedor proveedorActualizado) {
        Nodo temp = listaProveedores;
        while (temp != null) {
            if (temp.proveedor.getId() == id) {
                temp.proveedor.setNombre(proveedorActualizado.getNombre());
                temp.proveedor.setDireccion(proveedorActualizado.getDireccion());
                temp.proveedor.setTelefono(proveedorActualizado.getTelefono());
                temp.proveedor.setCorreo(proveedorActualizado.getCorreo());
                proveedorRepository.save(temp.proveedor);
                return;
            }
            temp = temp.sgte;
        }
        throw new IllegalArgumentException("Proveedor no encontrado");
    }


}
