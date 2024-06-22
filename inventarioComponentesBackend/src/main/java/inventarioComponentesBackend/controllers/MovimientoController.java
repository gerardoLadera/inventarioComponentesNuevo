package inventarioComponentesBackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import inventarioComponentesBackend.model.Movimiento;
import inventarioComponentesBackend.service.MovimientoService;

@RestController
@RequestMapping("/api/movimientos")
public class MovimientoController {


    @Autowired
    private MovimientoService movimientoService;

@GetMapping("/todos")
    public ResponseEntity<List<Movimiento>> obtenerTodosLosMovimientos() {
        List<Movimiento> movimientos = movimientoService.obtenerTodosLosMovimientos();
        return ResponseEntity.ok(movimientos);
    }

    @GetMapping("buscar/{id}")
    public ResponseEntity<Movimiento> buscarMovimientoPorId(@PathVariable String id) {
        Movimiento movimiento = movimientoService.buscarMovimientoPorId(id);
        if (movimiento != null) {
            return ResponseEntity.ok(movimiento);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/registrar")
    public ResponseEntity<Movimiento> registrarMovimiento(@RequestBody Movimiento movimiento) {
        movimientoService.registrarMovimiento(movimiento);
        return new ResponseEntity<>(movimiento, HttpStatus.CREATED);
    }

    @PutMapping("actualizar/{id}")
    public ResponseEntity<Movimiento> modificarMovimiento(@PathVariable String id, @RequestBody Movimiento movimientoActualizado) {
        try {
            movimientoService.modificarMovimiento(id, movimientoActualizado);
            return ResponseEntity.ok(movimientoActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("eliminar/{id}")
    public ResponseEntity<Void> eliminarMovimiento(@PathVariable String id) {
        boolean eliminado = movimientoService.eliminarMovimiento(id);
        if (eliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
