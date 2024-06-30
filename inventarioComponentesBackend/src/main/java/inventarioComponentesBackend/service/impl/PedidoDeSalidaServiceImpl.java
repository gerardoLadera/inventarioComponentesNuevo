package inventarioComponentesBackend.service.impl;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import inventarioComponentesBackend.model.Movimiento;
import inventarioComponentesBackend.model.PedidoDeSalida;
import inventarioComponentesBackend.model.Producto;
import inventarioComponentesBackend.repository.PedidoDeSalidaRepository;
import inventarioComponentesBackend.service.MovimientoService;
import inventarioComponentesBackend.service.PedidoDeSalidaService;
import inventarioComponentesBackend.service.ProductoService;
import jakarta.annotation.PostConstruct;

@Service
public class PedidoDeSalidaServiceImpl implements PedidoDeSalidaService {

    @Autowired
    private PedidoDeSalidaRepository pedidoDeSalidaRepository;

    @Autowired
    private MovimientoService movimientoService;
    
    @Autowired
    private ProductoService productoService;

    private Nodo listaPedidosDeSalida;

    private class Nodo {
        PedidoDeSalida pedido;
        Nodo sgte = null;

        Nodo(PedidoDeSalida pedido) {
            this.pedido = pedido;
        }
    }

    @PostConstruct
    public void init() {
        cargarPedidosDeSalidaDesdeBaseDeDatos();
    }

    @Override
    public void registrarPedidoDeSalida(PedidoDeSalida pedidoDeSalida) {

        if (pedidoDeSalida.getCodigo() == null || pedidoDeSalida.getCodigo().isEmpty()) {
            pedidoDeSalida.setCodigo(generarNuevoCodigo());
        }

        if (pedidoDeSalida.getFechaPedido() == null || pedidoDeSalida.getFechaPedido().isEmpty()) {
            Date fecha = new Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            pedidoDeSalida.setFechaPedido(dateFormat.format(fecha));
        }
        if (pedidoDeSalida.getHoraPedido() == null || pedidoDeSalida.getHoraPedido().isEmpty()) {
            long currentTimeMillis = System.currentTimeMillis();
            Time horaa = new Time(currentTimeMillis);
            SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
            pedidoDeSalida.setHoraPedido(timeFormat.format(horaa));
        }
        Nodo nuevoNodo = new Nodo(pedidoDeSalida);
        if (listaPedidosDeSalida == null) {
            listaPedidosDeSalida = nuevoNodo;
        } else {
            Nodo actual = listaPedidosDeSalida;
            while (actual.sgte != null) {
                actual = actual.sgte;
            }
            actual.sgte = nuevoNodo;
        }
        pedidoDeSalidaRepository.save(pedidoDeSalida);
        disminuirStockProducto(pedidoDeSalida.getCodigoProducto(),pedidoDeSalida.getCantidad());
        registrarMovimiento(pedidoDeSalida);
    }

    @Override
    public PedidoDeSalida buscarPedidoDeSalidaPorId(String id) {
        Nodo actual = listaPedidosDeSalida;
        while (actual != null) {
            if (actual.pedido.getCodigo().equals(id)) {
                return actual.pedido;
            }
            actual = actual.sgte;
        }
        return null;
    }

    @Override
    public void modificarPedidoDeSalida(String id, PedidoDeSalida pedidoDeSalidaActualizado) {
        Nodo actual = listaPedidosDeSalida;
        while (actual != null) {
            if (actual.pedido.getCodigo().equals(id)) {
                actual.pedido.setDni_Cliente(pedidoDeSalidaActualizado.getDni_Cliente());
                actual.pedido.setDniUsuario(pedidoDeSalidaActualizado.getDniUsuario());
                actual.pedido.setCodigoProducto(pedidoDeSalidaActualizado.getCodigoProducto());
                actual.pedido.setCantidad(pedidoDeSalidaActualizado.getCantidad());
                pedidoDeSalidaRepository.save(actual.pedido);

                actualizarMovimiento(actual.pedido, "Salida de Producto con ID:"+pedidoDeSalidaActualizado.getCodigoProducto());
                return;
            }
            actual = actual.sgte;
        }
        throw new IllegalArgumentException("El pedido de salida con el ID proporcionado no existe.");
    }

    @Override
    public boolean eliminarPedidoDeSalida(String id) {
        if (listaPedidosDeSalida == null) {
            return false;
        }
        if (listaPedidosDeSalida.pedido.getCodigo().equals(id)) {
            PedidoDeSalida pedidoAEliminar = listaPedidosDeSalida.pedido;
            listaPedidosDeSalida = listaPedidosDeSalida.sgte;
            pedidoDeSalidaRepository.delete(pedidoAEliminar);

            eliminarMovimiento(id);
            return true;
        }
        Nodo actual = listaPedidosDeSalida;
        while (actual.sgte != null) {
            if (actual.sgte.pedido.getCodigo().equals(id)) {
                PedidoDeSalida pedidoAEliminar = actual.sgte.pedido;
                actual.sgte = actual.sgte.sgte;
                pedidoDeSalidaRepository.delete(pedidoAEliminar);

                eliminarMovimiento(id);
                return true;
            }
            actual = actual.sgte;
        }
        return false;
    }

    @Override
    public void cargarPedidosDeSalidaDesdeBaseDeDatos() {
        List<PedidoDeSalida> pedidosDeSalida = pedidoDeSalidaRepository.findAll();
        for (PedidoDeSalida pedidoDeSalida : pedidosDeSalida) {
            registrarPedidoDeSalidaEnLista(pedidoDeSalida);
        }
    }

    @Override
    public List<PedidoDeSalida> obtenerTodosLosPedidosDeSalida() {
        List<PedidoDeSalida> lista = new LinkedList<>();
        Nodo actual = listaPedidosDeSalida;
        while (actual != null) {
            lista.add(actual.pedido);
            actual = actual.sgte;
        }
        return lista;
    }

    private void registrarPedidoDeSalidaEnLista(PedidoDeSalida pedidoDeSalida) {
        Nodo nuevoNodo = new Nodo(pedidoDeSalida);
        if (listaPedidosDeSalida == null) {
            listaPedidosDeSalida = nuevoNodo;
        } else {
            Nodo actual = listaPedidosDeSalida;
            while (actual.sgte != null) {
                actual = actual.sgte;
            }
            actual.sgte = nuevoNodo;
        }
    }

    private void registrarMovimiento(PedidoDeSalida pedidoDeSalida) {
        Movimiento movimiento = new Movimiento();
        movimiento.setTipoMovimiento("Salida");
        movimiento.setFechaMovimiento(pedidoDeSalida.getFechaPedido());
        movimiento.setHora(pedidoDeSalida.getHoraPedido());
        movimiento.setDescripcion("Salida de Producto con ID:"+pedidoDeSalida.getCodigoProducto());
        movimiento.setCodigoPedido(pedidoDeSalida.getCodigo());
        movimientoService.registrarMovimiento(movimiento);
    }

    private void actualizarMovimiento(PedidoDeSalida pedidoDeSalida, String descripcion) {
        List<Movimiento> movimientos = movimientoService.obtenerTodosLosMovimientos();
        for (Movimiento movimiento : movimientos) {
            if (movimiento.getCodigoPedido().equals(pedidoDeSalida.getCodigo())) {
                movimiento.setDescripcion(descripcion);
                movimiento.setFechaMovimiento(pedidoDeSalida.getFechaPedido());
                movimiento.setHora(pedidoDeSalida.getHoraPedido());
                movimientoService.modificarMovimiento(movimiento.getCodigo(),movimiento);
                break;
            }
        }
    }

    private void eliminarMovimiento(String codigoPedido) {
        List<Movimiento> movimientos = movimientoService.obtenerTodosLosMovimientos();
        for (Movimiento movimiento : movimientos) {
            if (movimiento.getCodigoPedido().equals(codigoPedido)) {
                movimientoService.eliminarMovimiento(movimiento.getCodigo());
                break;
            }
        }
    }

    public PedidoDeSalida verDetallePedido(String idPedido) {
        return buscarPedidoDeSalidaPorId(idPedido);
    }


    private String generarNuevoCodigo() {
        Optional<PedidoDeSalida> ultimoPedidoDeSalida = pedidoDeSalidaRepository.findTopByOrderByCodigoDesc();
        if (ultimoPedidoDeSalida.isPresent()) {
            int ultimoCodigo = Integer.parseInt(ultimoPedidoDeSalida.get().getCodigo());
            return String.format("%04d", ultimoCodigo + 1);
        } else {
            return "0001";
        }
    }

    private void disminuirStockProducto(String idProducto,int cantidad){
        Producto producto=productoService.buscarProducto(idProducto);
        int stockActualizado=producto.getStock()-cantidad;
        producto.setStock(stockActualizado);
        productoService.actualizarProducto(idProducto, producto);
    }

}
