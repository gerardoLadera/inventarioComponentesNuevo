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

import inventarioComponentesBackend.model.Usuario;
import inventarioComponentesBackend.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario usuario) {
        Usuario usuarioAutenticado = usuarioService.login(usuario.getUsername(), usuario.getPassword());
        if (usuarioAutenticado != null) {
            return ResponseEntity.ok(usuarioAutenticado);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @GetMapping("/empleados")
    public ResponseEntity<List<Usuario>> obtenerEmpleados() {
        List<Usuario> empleados = usuarioService.obtenerEmpleados();
        return ResponseEntity.ok(empleados);
    }

    @GetMapping("/administradores")
    public ResponseEntity<List<Usuario>> obtenerAdministradores() {
        List<Usuario> administradores = usuarioService.obtenerAdministradores();
        return ResponseEntity.ok(administradores);
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> obtenerTodosLosUsuarios() {
        List<Usuario> todos = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(todos);
    }

    @PostMapping("/registrar")
    public ResponseEntity<Usuario> registrarUsuario(@RequestBody Usuario usuario) {
        usuarioService.registrarUsuario(usuario);
        return ResponseEntity.ok(usuario);
    }

    @PutMapping("/actualizar/{dni}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable String dni, @RequestBody Usuario usuarioActualizado) {
        try {
            usuarioService.actualizarUsuario(dni, usuarioActualizado);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("buscar/{dni}")
    public ResponseEntity<Usuario> buscarUsuarioPorDni(@PathVariable String dni) {
        Usuario usuario = usuarioService.buscarUsuario(dni);
        if (usuario != null) {
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{dni}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable String dni) {
        boolean eliminado = usuarioService.eliminarUsuario(dni);
        if (eliminado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    

}
