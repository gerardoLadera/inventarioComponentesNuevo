package inventarioComponentesBackend.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import inventarioComponentesBackend.model.Movimiento;
import inventarioComponentesBackend.repository.MovimientoRepository;
import inventarioComponentesBackend.service.MovimientoService;
import jakarta.annotation.PostConstruct;


@Service
public class MovimientoServiceImpl implements MovimientoService {
    @Autowired
    private MovimientoRepository movimientoRepository;

    private Nodo listaMovimientos;

    private class Nodo {
        Movimiento movimiento;
        Nodo sgte = null;

        Nodo(Movimiento movimiento) {
            this.movimiento = movimiento;
        }
    }

    @PostConstruct
    public void init() {
        cargarMovimientosDesdeBaseDeDatos();
    }

    @Override
    public void registrarMovimiento(Movimiento movimiento) {
        if (movimiento.getCodigo() == null || movimiento.getCodigo().isEmpty()) {
            movimiento.setCodigo(generarNuevoCodigo());
        }
        Nodo nuevoNodo = new Nodo(movimiento);
        if (listaMovimientos == null) {
            listaMovimientos = nuevoNodo;
        } else {
            Nodo actual = listaMovimientos;
            while (actual.sgte != null) {
                actual = actual.sgte;
            }
            actual.sgte = nuevoNodo;
        }
        movimientoRepository.save(movimiento);
    }

    @Override
    public Movimiento buscarMovimientoPorId(String id) {
        Nodo actual = listaMovimientos;
        while (actual != null) {
            if (actual.movimiento.getCodigo().equals(id)) {
                return actual.movimiento;
            }
            actual = actual.sgte;
        }
        return null;
    }

    @Override
    public void modificarMovimiento(String id, Movimiento movimientoActualizado) {
        Nodo actual = listaMovimientos;
        while (actual != null) {
            if (actual.movimiento.getCodigo().equals(id)) {
                actual.movimiento.setTipoMovimiento(movimientoActualizado.getTipoMovimiento());
                actual.movimiento.setDescripcion(movimientoActualizado.getDescripcion());
                actual.movimiento.setCodigoPedido(movimientoActualizado.getCodigoPedido());
                actual.movimiento.setHora(movimientoActualizado.getHora());
                actual.movimiento.setFechaMovimiento(movimientoActualizado.getFechaMovimiento());
                movimientoRepository.save(actual.movimiento);
                return;
            }
            actual = actual.sgte;
        }
        throw new IllegalArgumentException("Movimiento no encontrado");
    }

    @Override
    public boolean eliminarMovimiento(String id) {
        if (listaMovimientos == null) {
            return false;
        }
        if (listaMovimientos.movimiento.getCodigo().equals(id)) {
            Movimiento movimientoAEliminar = listaMovimientos.movimiento;
            listaMovimientos = listaMovimientos.sgte;
            movimientoRepository.delete(movimientoAEliminar);
            return true;
        }
        Nodo actual = listaMovimientos;
        while (actual.sgte != null) {
            if (actual.sgte.movimiento.getCodigo().equals(id)) {
                Movimiento movimientoAEliminar = actual.sgte.movimiento;
                actual.sgte = actual.sgte.sgte;
                movimientoRepository.delete(movimientoAEliminar);
                return true;
            }
            actual = actual.sgte;
        }
        return false;
    }

    @Override
    public void cargarMovimientosDesdeBaseDeDatos() {
        List<Movimiento> movimientosEnBaseDeDatos = movimientoRepository.findAll();
        for (Movimiento movimiento : movimientosEnBaseDeDatos) {
            registrarMovimiento(movimiento);
        }
    }
    @Override
    public List<Movimiento> obtenerTodosLosMovimientos() {
        List<Movimiento> lista = new LinkedList<>();
        Nodo actual = listaMovimientos;
        while (actual != null) {
            lista.add(actual.movimiento);
            actual = actual.sgte;
        }
        return lista;
    }


    
    private String generarNuevoCodigo() {
        Optional<Movimiento> ultimoMovimiento = movimientoRepository.findTopByOrderByCodigoDesc();
        if (ultimoMovimiento.isPresent()) {
            int ultimoCodigo = Integer.parseInt(ultimoMovimiento.get().getCodigo());
            return String.format("%05d", ultimoCodigo + 1);
        } else {
            return "00001";
        }
    }

}
