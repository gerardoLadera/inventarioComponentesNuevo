package inventarioComponentesBackend.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import inventarioComponentesBackend.model.PedidoProveedor;
import inventarioComponentesBackend.repository.PedidoProveedorRepository;
import inventarioComponentesBackend.service.PedidoProveedorService;
import jakarta.annotation.PostConstruct;

@Service
public class PedidoProveedorServiceImpl implements PedidoProveedorService {

    @Autowired
    private PedidoProveedorRepository PPRepository;

    private Nodo listaPP;

    private class Nodo {
        PedidoProveedor pedido;
        PedidoProveedorServiceImpl.Nodo sgte = null;
        PedidoProveedorServiceImpl.Nodo ant = null;

        Nodo(PedidoProveedor pedido) {
            this.pedido = pedido;
        }
    }

    @PostConstruct
    public void init() {
        cargarPedidosProveedorDesdeBaseDeDatos();
    }

    @Override
    public void registrarPedidoProveedor(PedidoProveedor pedido) {
        if (pedido.getCodigo() == null || pedido.getCodigo().isEmpty()) {
            pedido.setCodigo(generarNuevoCodigoPP());
        }
        PedidoProveedorServiceImpl.Nodo nuevoNodo = new PedidoProveedorServiceImpl.Nodo(pedido);
        if (listaPP == null) {
            listaPP = nuevoNodo;
        } else {
            PedidoProveedorServiceImpl.Nodo actual = listaPP;
            while (actual.sgte != null) {
                actual = actual.sgte;
            }
            actual.sgte = nuevoNodo;
            nuevoNodo.ant = actual;
        }
        PPRepository.save(pedido);
    }

    @Override
    public PedidoProveedor buscarPedidoProveedorPorId(String id) {
        PedidoProveedorServiceImpl.Nodo actual = listaPP;
        while (actual != null) {
            if (actual.pedido.getCodigo().equals(id)) {
                return actual.pedido;
            }
            actual = actual.sgte;
        }
        return null;
    }

    @Override
    public void modificarPedidoProveedor(String id, PedidoProveedor PPActualizado) {
        PedidoProveedorServiceImpl.Nodo actual = listaPP;
        while (actual != null) {
            if (actual.pedido.getCodigo().equals(id)) {
                actual.pedido.setId_producto(PPActualizado.getId_producto());
                actual.pedido.setDniUsuario(PPActualizado.getDniUsuario());
                actual.pedido.setCodigoProveedor(PPActualizado.getCodigoProveedor());
                actual.pedido.setCantidad(PPActualizado.getCantidad());
                actual.pedido.setHoraPedido(PPActualizado.getHoraPedido());
                actual.pedido.setFechaPedido(PPActualizado.getFechaPedido());
                PPRepository.save(actual.pedido);
                return;
            }
            actual = actual.sgte;
        }
        throw new IllegalArgumentException("PedidoProveedor no encontrado");
    }

    @Override
    public boolean eliminarPedidoProveedor(String id) {
        if (listaPP == null) {
            return false;
        }
        if (listaPP.pedido.getCodigo().equals(id)) {
            PedidoProveedor pedidoAEliminar = listaPP.pedido;
            listaPP.sgte.ant = null;
            listaPP = listaPP.sgte;
            PPRepository.delete(pedidoAEliminar);
            return true;
        }
        PedidoProveedorServiceImpl.Nodo actual = listaPP;
        while (actual.sgte != null) {
            if (actual.pedido.getCodigo().equals(id)) {
                PedidoProveedor pedidoAEliminar = actual.pedido;
                actual.ant.sgte = actual.sgte;
                actual.sgte.ant = actual.ant;
                PPRepository.delete(pedidoAEliminar);
                return true;
            }
            actual = actual.sgte;
        }
        return false;
    }

    @Override
    public void cargarPedidosProveedorDesdeBaseDeDatos() {
        List<PedidoProveedor> pedidosEnBaseDeDatos = PPRepository.findAll();
        for (PedidoProveedor pedido : pedidosEnBaseDeDatos) {
            registrarPedidoProveedor(pedido);
        }
    }

    @Override
    public List<PedidoProveedor> obtenerTodosLosPedidosProveedor() {
        List<PedidoProveedor> lista = new LinkedList<>();
        PedidoProveedorServiceImpl.Nodo actual = listaPP;
        while (actual != null) {
            lista.add(actual.pedido);
            actual = actual.sgte;
        }
        return lista;
    }

    private String generarNuevoCodigoPP() {
        Optional<PedidoProveedor> ultimoPedido = PPRepository.findTopByOrderByCodigoDesc();
        if (ultimoPedido.isPresent()) {
            int ultimoCodigo = Integer.parseInt(ultimoPedido.get().getCodigo());
            return String.format("%04d", ultimoCodigo + 1);
        } else {
            return "0001";
        }
    }
}
