package inventarioComponentesBackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import inventarioComponentesBackend.model.Lote;
import inventarioComponentesBackend.service.LoteService;

@RestController
@RequestMapping("/api/lotes")
@CrossOrigin(origins = "http://localhost:5173")
public class LoteController {
    
    @Autowired
    private LoteService loteService;

    @GetMapping("/todos")
    public ResponseEntity<List<Lote>> obtenerTodosLosLotes() {
        List<Lote> lotes = loteService.obtenerTodosLosLotes();
        return ResponseEntity.ok(lotes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lote> buscarLotePorId(@PathVariable String id) {
        Lote lote = loteService.buscarLotePorId(id);
        if (lote != null) {
            return ResponseEntity.ok(lote);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/registrar")
    public ResponseEntity<Lote> registrarLote(@RequestBody Lote lote) {
        loteService.registrarLote(lote);
        return new ResponseEntity<>(lote, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lote> modificarLote(@PathVariable String id, @RequestBody Lote loteActualizado) {
        try {
            loteService.modificarLote(id, loteActualizado);
            return ResponseEntity.ok(loteActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLote(@PathVariable String id) {
        boolean eliminado = loteService.eliminarLote(id);
        if (eliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/validar/{id}")
    public ResponseEntity<Void> validarCalidadLote(@PathVariable String id, @RequestParam boolean aprobado) {
        boolean validado = loteService.validarCalidadLote(id, aprobado);
        if (validado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
