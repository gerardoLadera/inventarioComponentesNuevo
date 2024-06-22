package inventarioComponentesBackend.service;

import java.util.List;

import inventarioComponentesBackend.model.Usuario;

public interface UsuarioService {

    void registrarUsuario(Usuario usuario);

    Usuario buscarUsuario(String dni);

    List<Usuario> obtenerTodosLosUsuarios();

    boolean eliminarUsuario(String dni);
    
    void actualizarUsuario(String dni, Usuario usuarioActualizado);

    List<Usuario> obtenerEmpleados();

    List<Usuario> obtenerAdministradores();

    void cargarUsuariosDesdeBaseDeDatos();

    Usuario login(String username, String password);
}
