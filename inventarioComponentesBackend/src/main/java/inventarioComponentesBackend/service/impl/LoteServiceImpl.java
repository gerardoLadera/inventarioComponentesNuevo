package inventarioComponentesBackend.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import inventarioComponentesBackend.model.Lote;
import inventarioComponentesBackend.model.Producto;
import inventarioComponentesBackend.repository.LoteRepository;
import inventarioComponentesBackend.service.LoteService;
import inventarioComponentesBackend.service.ProductoService;
import jakarta.annotation.PostConstruct;

@Service
public class LoteServiceImpl implements LoteService{

        @Autowired
        private LoteRepository loteRepository;

        @Autowired
        private ProductoService productoService;
        

        private Nodo listaLotes;

    private class Nodo {
        Lote lote;
        Nodo siguiente;
        Nodo anterior;

        Nodo(Lote lote) {
            this.lote = lote;
        }
    }

    @PostConstruct
    public void init() {
        cargarLotesDesdeBaseDeDatos();
    }

    @Override
    public void registrarLote(Lote lote) {
        if (lote.getId() == null || lote.getId().isEmpty()) {
            lote.setId(generarNuevoCodigoLote());
        }
        if (lote.getFechaRecepcion() == null || lote.getFechaRecepcion().isEmpty()) {
            Date fecha = new Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            lote.setFechaRecepcion(dateFormat.format(fecha));
        }

        Nodo nuevoNodo = new Nodo(lote);
        if (listaLotes == null) {
            listaLotes = nuevoNodo;
        } else {
            Nodo actual = listaLotes;
            while (actual.siguiente != null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
            nuevoNodo.anterior = actual;
        }

        loteRepository.save(lote);
    }

    @Override
    public Lote buscarLotePorId(String id) {
        Nodo actual = listaLotes;
        while (actual != null) {
            if (actual.lote.getId().equals(id)) {
                return actual.lote;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    @Override
    public void modificarLote(String id, Lote loteActualizado) {
        Nodo actual = listaLotes;
        while (actual != null) {
            if (actual.lote.getId().equals(id)) {
                actual.lote.setCodigoMovimiento(loteActualizado.getCodigoMovimiento());
                actual.lote.setCodigoProducto(loteActualizado.getCodigoProducto());
                actual.lote.setCantidad(loteActualizado.getCantidad());
                loteRepository.save(actual.lote);
                return;
            }
            actual = actual.siguiente;
        }
        throw new IllegalArgumentException("Lote no encontrado");
    }

    @Override
    public boolean eliminarLote(String id) {
        Nodo actual = listaLotes;
        while (actual != null) {
            if (actual.lote.getId().equals(id)) {
                loteRepository.delete(actual.lote);
                if (actual.anterior != null) {
                    actual.anterior.siguiente = actual.siguiente;
                }
                if (actual.siguiente != null) {
                    actual.siguiente.anterior = actual.anterior;
                }
                if (actual == listaLotes) {
                    listaLotes = actual.siguiente;
                }
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    @Override
    public List<Lote> obtenerTodosLosLotes() {
        List<Lote> lista = new java.util.LinkedList<>();
        Nodo actual = listaLotes;
        while (actual != null) {
            lista.add(actual.lote);
            actual = actual.siguiente;
        }
        return lista;
    }

    @Override
    public void cargarLotesDesdeBaseDeDatos() {
        listaLotes = null; 
        List<Lote> lotesEnBaseDeDatos = loteRepository.findAll();
        for (Lote lote : lotesEnBaseDeDatos) {
            registrarLote(lote);
        }
    }

    @Override
    public boolean validarCalidadLote(String id, boolean aprobado) {
        Nodo actual = listaLotes;
        while (actual != null) {
            if (actual.lote.getId().equals(id)) {
                actual.lote.setCalidadAprobada(aprobado);
                if (aprobado) {
                    int cantidad = actual.lote.getCantidad();
                    String codigoProducto = actual.lote.getCodigoProducto();
                    Producto producto = productoService.buscarProducto(codigoProducto);

                    int stockActualizado = producto.getStock() + cantidad;
                    producto.setStock(stockActualizado);
                    productoService.actualizarProducto(codigoProducto, producto);
                }
                loteRepository.save(actual.lote);
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    private String generarNuevoCodigoLote() {
        Optional<Lote> ultimoLote = loteRepository.findTopByOrderByIdDesc();
        if (ultimoLote.isPresent()) {
            int ultimoCodigo = Integer.parseInt(ultimoLote.get().getId());
            return String.format("%04d", ultimoCodigo + 1);
        } else {
            return "0001";
        }
    }
}
