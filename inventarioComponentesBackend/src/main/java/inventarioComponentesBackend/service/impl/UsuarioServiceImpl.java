package inventarioComponentesBackend.service.impl;

import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import inventarioComponentesBackend.model.Usuario;
import inventarioComponentesBackend.repository.UsuarioRepository;
import inventarioComponentesBackend.service.UsuarioService;
import jakarta.annotation.PostConstruct;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    private Nodo listaUsuarios;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private class Nodo {
        Usuario usuario;
        Nodo sgte = null;

        Nodo(Usuario usuario) {
            this.usuario = usuario;
        }
    }

    @PostConstruct
    public void init() {
        cargarUsuariosDesdeBaseDeDatos();
    }

    @Override
    public void registrarUsuario(Usuario usuario){
        Nodo nuevoNodo = new Nodo(usuario);
        Nodo temp = listaUsuarios;
        if (listaUsuarios == null) {
            listaUsuarios = nuevoNodo;
        } else {
            while (temp.sgte != null) {
                temp = temp.sgte;
            }
            temp.sgte = nuevoNodo;
        }
        usuarioRepository.save(usuario);
    }

    public List<Usuario> obtenerTodosLosUsuarios() {
        List<Usuario> listaUsuarioss= new LinkedList<>();
        Nodo temp = listaUsuarios;
        while (temp != null) {
            listaUsuarioss.add(temp.usuario);
            temp = temp.sgte;
        }
        return listaUsuarioss;
    }

    @Override
    public Usuario buscarUsuario(String dni) {
        Nodo temp = listaUsuarios;
        while (temp != null) {
            if (temp.usuario.getDni().equals(dni)) {
                return temp.usuario;
            }
            temp = temp.sgte;
        }
        return null;
    }

    @Override
    public boolean eliminarUsuario(String dni) {
        if (listaUsuarios == null) {
            return false;
        }
        if (listaUsuarios.usuario.getDni().equals(dni)) {
            Usuario usuarioAEliminar = listaUsuarios.usuario;
            listaUsuarios = listaUsuarios.sgte;
            usuarioRepository.delete(usuarioAEliminar);
            return true;
        }
        Nodo temp = listaUsuarios;
        while (temp.sgte != null) {
            if (temp.sgte.usuario.getDni().equals(dni)) {
                Usuario usuarioAEliminar = temp.sgte.usuario;
                temp.sgte = temp.sgte.sgte;
                usuarioRepository.delete(usuarioAEliminar);
                return true;
            }
            temp = temp.sgte;
        }
        return false;
    }

    @Override
    public void cargarUsuariosDesdeBaseDeDatos() {
        List<Usuario> usuariosEnBaseDeDatos = usuarioRepository.findAll();
        for (Usuario usuario : usuariosEnBaseDeDatos) {
            registrarUsuario(usuario);
        }
    }

    @Override
    public void actualizarUsuario(String dni, Usuario usuarioActualizado) {
        Nodo temp = listaUsuarios;
        while (temp != null) {
            if (temp.usuario.getDni().equals(dni)) {
                temp.usuario.setUsername(usuarioActualizado.getUsername());
                temp.usuario.setPassword(usuarioActualizado.getPassword());
                temp.usuario.setNombre(usuarioActualizado.getNombre());
                temp.usuario.setPrimerApellido(usuarioActualizado.getPrimerApellido());
                temp.usuario.setSegundoApellido(usuarioActualizado.getSegundoApellido());
                temp.usuario.setDireccion(usuarioActualizado.getDireccion());
                temp.usuario.setTelefono(usuarioActualizado.getTelefono());
                usuarioRepository.save(temp.usuario);
                return ;
            }
            temp = temp.sgte;
        }
        throw new IllegalArgumentException("Usuario no encontrado");
    }
    
    @Override
    public List<Usuario> obtenerEmpleados() {
        List<Usuario> empleados = new LinkedList<>();
        Nodo temp = listaUsuarios;
        while (temp != null) {
            if ("empleado".equals(temp.usuario.getRol())) {
                empleados.add(temp.usuario);
            }
            temp = temp.sgte;
        }
        return empleados;
    }

    @Override
    public List<Usuario> obtenerAdministradores() {
        List<Usuario> administradores = new LinkedList<>();
        Nodo temp = listaUsuarios;
        while (temp != null) {
            if ("administrador".equals(temp.usuario.getRol())) {
                administradores.add(temp.usuario);
            }
            temp = temp.sgte;
        }
        return administradores;
    }




    // Método para realizar el login
    @Override
    public Usuario login(String username, String password) {

        Nodo temp = listaUsuarios;
        while (temp != null) {
            if (temp.usuario.getUsername().equals(username) && temp.usuario.getPassword().equals(password)) {
                return temp.usuario;
            }
            temp = temp.sgte;
        }
        return null;
    }

}
