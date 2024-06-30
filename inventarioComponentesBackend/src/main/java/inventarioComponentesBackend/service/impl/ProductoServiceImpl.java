package inventarioComponentesBackend.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Stack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import inventarioComponentesBackend.model.Producto;
import inventarioComponentesBackend.repository.ProductoRepository;
import inventarioComponentesBackend.service.ProductoService;
import jakarta.annotation.PostConstruct;

@Service
public class ProductoServiceImpl implements ProductoService{
    @Autowired
    private ProductoRepository productoRepository;

    private Nodo lista;
    
    private Stack<Producto> productosBajoStock = new Stack<>(); 


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
        if (producto.getId() == null || producto.getId().isEmpty()) {
            producto.setId(generarNuevoCodigo());
        }
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
    public Producto buscarProducto(String id) {
        Nodo temp = lista;
        while (temp != null) {
            if (temp.producto.getId().equals(id)) {
                return temp.producto;
            }
            temp = temp.sgte;
        }
        return null;
    }

    // Método para eliminar un producto de la lista enlazada
    @Override
    public boolean eliminarProducto(String idProducto) {
        if (lista == null) {
            return false;
        }
        if (lista.producto.getId().equals(idProducto)) {
            Producto productoAEliminar = lista.producto;
            lista= lista.sgte;
            productoRepository.delete(productoAEliminar);
            return true;
        }
        Nodo temp = lista;
        while (temp.sgte != null) {
            if (temp.sgte.producto.getId().equals(idProducto)) {
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
    public Producto verDetalleProducto(String id) {
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
    @Override
    public void actualizarProducto(String id, Producto productoActualizado) {
        Nodo temp = lista;
        while (temp != null) {
            if (temp.producto.getId().equals(id)) {
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


    private String generarNuevoCodigo() {
        Optional<Producto> ultimoProducto = productoRepository.findTopByOrderByIdDesc();
        if (ultimoProducto.isPresent()) {
            int ultimoId = Integer.parseInt(ultimoProducto.get().getId());
            return String.format("%03d", ultimoId + 1);
        } else {
            return "001";
        }
    }

    @Override
    public List<Producto> alertaStock() {
        productosBajoStock.clear();
        Nodo temp = lista;
        while (temp != null) {
            if (temp.producto.getStock() < 20) { 
                productosBajoStock.push(temp.producto);
            }
            temp = temp.sgte;
        }
        return new ArrayList<>(productosBajoStock);
    }

    @Override
    public List<Producto> obtenerProductosPorTipo(String tipo) {
        Map<String, List<Producto>> productosPorTipoMap = new HashMap<>();
        List<Producto> listaProductos = obtenerTodosLosProductos();

        for (Producto producto : listaProductos) {
            String tipoProducto = producto.getTipo();
            productosPorTipoMap.putIfAbsent(tipoProducto, new LinkedList<>());
            productosPorTipoMap.get(tipoProducto).add(producto);
        }

        return productosPorTipoMap.getOrDefault(tipo, new LinkedList<>());
    }


}
