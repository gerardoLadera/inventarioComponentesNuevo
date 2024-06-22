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

import inventarioComponentesBackend.model.Proveedor;
import inventarioComponentesBackend.service.ProveedorService;


@RestController
@RequestMapping("/api/proveedores")
public class ProveedorController {
    
    @Autowired
    private ProveedorService proveedorService;

    @PostMapping("/agregar")
    public ResponseEntity<Proveedor> agregarProveedor(@RequestBody Proveedor proveedor) {
        proveedorService.agregarProveedor(proveedor);
        return new ResponseEntity<>(proveedor, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> buscarProveedorPorId(@PathVariable int id) {
        Proveedor proveedor = proveedorService.buscarProveedorPorId(id);
        if (proveedor != null) {
            return new ResponseEntity<>(proveedor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProveedor(@PathVariable int id) {
        boolean eliminado = proveedorService.eliminarProveedor(id);
        if (eliminado) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Proveedor>> obtenerProveedores() {
        List<Proveedor> proveedores = proveedorService.obtenerProveedores();
        return new ResponseEntity<>(proveedores, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> actualizarProveedor(@PathVariable int id, @RequestBody Proveedor proveedorActualizado) {
        try {
            proveedorService.actualizarProveedor(id, proveedorActualizado);
            return ResponseEntity.ok(proveedorActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
