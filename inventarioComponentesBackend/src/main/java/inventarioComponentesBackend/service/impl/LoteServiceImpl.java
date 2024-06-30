package inventarioComponentesBackend.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Queue;

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
        

        private Queue<Lote> colaLotes;

        @PostConstruct
        public void init() {
            cargarLotesDesdeBaseDeDatos();
        }

        public LoteServiceImpl() {    
            colaLotes = new LinkedList<>();       
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
        colaLotes.add(lote);
        loteRepository.save(lote);
    }

    @Override
    public Lote buscarLotePorId(String id) {
        Optional<Lote> lote = loteRepository.findById(id);
        return lote.orElse(null);
    }

    @Override
    public void modificarLote(String id, Lote loteActualizado) {
        Lote lote = buscarLotePorId(id);
        if (lote != null) {
            lote.setCodigoMovimiento(loteActualizado.getCodigoMovimiento());
            lote.setCodigoProducto(loteActualizado.getCodigoProducto());
            lote.setCantidad(loteActualizado.getCantidad());
            loteRepository.save(lote);
        } else {
            throw new IllegalArgumentException("Lote no encontrado");
        }
    }

    @Override
    public boolean eliminarLote(String id) {
        Lote lote = buscarLotePorId(id);
        if (lote != null) {
            colaLotes.remove(lote);
            loteRepository.delete(lote);
            return true;
        }
        return false;
    }

    @Override
    public List<Lote> obtenerTodosLosLotes() {
        return new ArrayList<>(colaLotes);
    }

    @Override
    public void cargarLotesDesdeBaseDeDatos() {
        List<Lote> lotesEnBaseDeDatos = loteRepository.findAll();
        colaLotes.addAll(lotesEnBaseDeDatos);
    }

    @Override
    public boolean validarCalidadLote(String id, boolean aprobado) {
        Lote lote = buscarLotePorId(id);
        if (lote != null) {
            lote.setCalidadAprobada(aprobado);
            if (aprobado) {
                int cantidad = lote.getCantidad();
                String codigoProducto = lote.getCodigoProducto();
                Producto producto=productoService.buscarProducto(codigoProducto);

                int stockActualizado=producto.getStock()+cantidad;
                producto.setStock(stockActualizado);

                loteRepository.save(lote);
            }
            return true;
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
