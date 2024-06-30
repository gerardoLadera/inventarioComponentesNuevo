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
import org.springframework.web.bind.annotation.RestController;

import inventarioComponentesBackend.model.PedidoDeSalida;
import inventarioComponentesBackend.service.PedidoDeSalidaService;

@RestController
@RequestMapping("/api/pedidodesalida")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoDeSalidaController {

    @Autowired
    private PedidoDeSalidaService pedidoDeSalidaService;

    @GetMapping("/allPS")
    public ResponseEntity<List<PedidoDeSalida>> obtenerTodosLosPedidosDeSalida() {
        List<PedidoDeSalida> pedidos = pedidoDeSalidaService.obtenerTodosLosPedidosDeSalida();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("buscarPS/{id}")
    public ResponseEntity<PedidoDeSalida> buscarPedidoDeSalidaPorId(@PathVariable String id) {
        PedidoDeSalida pedido = pedidoDeSalidaService.buscarPedidoDeSalidaPorId(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/registrarPS")
    public ResponseEntity<PedidoDeSalida> registrarPedidoDeSalida(@RequestBody PedidoDeSalida pedido) {
        pedidoDeSalidaService.registrarPedidoDeSalida(pedido);
        return new ResponseEntity<>(pedido, HttpStatus.CREATED);
    }

    @PutMapping("actualizarPS/{id}")
    public ResponseEntity<PedidoDeSalida> modificarPedidoDeSalida(@PathVariable String id, @RequestBody PedidoDeSalida pedidoActualizado) {
        try {
            pedidoDeSalidaService.modificarPedidoDeSalida(id, pedidoActualizado);
            return ResponseEntity.ok(pedidoActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("eliminarPS/{id}")
    public ResponseEntity<Void> eliminarPedidoDeSalida(@PathVariable String id) {
        boolean pedidoEliminado = pedidoDeSalidaService.eliminarPedidoDeSalida(id);
        if (pedidoEliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
