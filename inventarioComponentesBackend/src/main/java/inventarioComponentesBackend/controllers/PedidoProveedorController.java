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

import inventarioComponentesBackend.model.PedidoProveedor;
import inventarioComponentesBackend.service.PedidoProveedorService;

@RestController
@RequestMapping("/api/pedidosprov")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoProveedorController {
    @Autowired
    private PedidoProveedorService pedidoproveedorservice;

@GetMapping("/allPP")
    public ResponseEntity<List<PedidoProveedor>> obtenerTodosLosPedidosProveedor() {
    List<PedidoProveedor> pedidos = pedidoproveedorservice.obtenerTodosLosPedidosProveedor();
    return ResponseEntity.ok(pedidos);
}
    @GetMapping("buscarPP/{id}")
    public ResponseEntity<PedidoProveedor> buscarPedidoProveedorPorId(@PathVariable String id) {
        PedidoProveedor pedido = pedidoproveedorservice.buscarPedidoProveedorPorId(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/registrarPP")
    public ResponseEntity<PedidoProveedor> registrarPedidoProveedor(@RequestBody PedidoProveedor pedido) {
        pedidoproveedorservice.registrarPedidoProveedor(pedido);
        return new ResponseEntity<>(pedido, HttpStatus.CREATED);
    }

    @PutMapping("actualizarPP/{id}")
    public ResponseEntity<PedidoProveedor> modificarPedidoProveedor(@PathVariable String id, @RequestBody PedidoProveedor PPActualizado) {
        try {
            pedidoproveedorservice.modificarPedidoProveedor(id, PPActualizado);
            return ResponseEntity.ok(PPActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("eliminarPP/{id}")
    public ResponseEntity<Void> eliminarPedidoProveedor(@PathVariable String id) {
        boolean PPeliminado = pedidoproveedorservice.eliminarPedidoProveedor(id);
        if (PPeliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
