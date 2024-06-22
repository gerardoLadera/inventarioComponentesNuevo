package inventarioComponentesBackend.service.impl;

import java.util.LinkedList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import inventarioComponentesBackend.model.Producto;
import inventarioComponentesBackend.repository.ProductoRepository;
import inventarioComponentesBackend.service.ProductoService;
import jakarta.annotation.PostConstruct;

@Service
public class ProductoServiceImpl implements ProductoService{

    private Nodo lista;
    
    @Autowired
    private ProductoRepository productoRepository;


    private class Nodo {
        Producto producto;
        Nodo sgte = null;

        Nodo(Producto producto) {
            this.producto = producto;
        }
    }

    @PostConstruct
    public void init() {
        cargarProductosDesdeBaseDeDatos();
    }

    // Método para agregar un producto a la lista enlazada 
    @Override
    public void registrarProducto(Producto producto) {
        Nodo nuevoNodo = new Nodo(producto);
        Nodo temp = lista;
        if (lista == null) {
            lista = nuevoNodo;
        } else {
            while (temp.sgte != null) {
                temp = temp.sgte;
            }
            temp.sgte = nuevoNodo;
        }
        productoRepository.save(producto);
    }
    // Método para buscar un producto por ID en la lista de productos
    @Override
    public Producto buscarProducto(int id) {
        Nodo temp = lista;
        while (temp != null) {
            if (temp.producto.getId()==(id)) {
                return temp.producto;
            }
            temp = temp.sgte;
        }
        return null;
    }

    // Método para eliminar un producto de la lista enlazada
    @Override
    public boolean eliminarProducto(int idProducto) {
        if (lista == null) {
            return false;
        }
        if (lista.producto.getId()== idProducto) {
            Producto productoAEliminar = lista.producto;
            lista= lista.sgte;
            productoRepository.delete(productoAEliminar);
            return true;
        }
        Nodo temp = lista;
        while (temp.sgte != null) {
            if (temp.sgte.producto.getId()== idProducto) {
                Producto productoAEliminar = temp.sgte.producto;
                temp.sgte = temp.sgte.sgte;
                productoRepository.delete(productoAEliminar);
                return true;
            }
            temp = temp.sgte;
        }
        return false;
    }

    @Override
    public void cargarProductosDesdeBaseDeDatos() {
        List<Producto> productosEnBaseDeDatos = productoRepository.findAll();
        for (Producto producto : productosEnBaseDeDatos) {
            registrarProducto(producto);
        }
    }

    // Método para ver el detalle de un producto
    @Override
    public Producto verDetalleProducto(int id) {
        Producto producto = buscarProducto(id);
        if (producto != null) {
            return producto;
        } else {
            throw new IllegalArgumentException("Producto no encontrado");
        }
    }

    // Método auxiliar para obtener todos los productos de la lista enlazada
    @Override
    public List<Producto> obtenerTodosLosProductos() {
        List<Producto> listaProductos = new LinkedList<>();
        Nodo temp = lista;
        while (temp != null) {
            listaProductos.add(temp.producto);
            temp = temp.sgte;
        }
        return listaProductos;
    }

    public void actualizarProducto(int id, Producto productoActualizado) {
        Nodo temp = lista;
        while (temp != null) {
            if (temp.producto.getId()== id) {
                temp.producto.setNombre(productoActualizado.getNombre());
                temp.producto.setModelo(productoActualizado.getModelo());
                temp.producto.setTipo(productoActualizado.getTipo());
                temp.producto.setMarca(productoActualizado.getMarca());
                temp.producto.setDescripcion(productoActualizado.getDescripcion());
                temp.producto.setStock(productoActualizado.getStock());
                productoRepository.save(temp.producto);
                return;
            }
            temp = temp.sgte;
        }
        throw new IllegalArgumentException("Producto no encontrado");
    }


}
