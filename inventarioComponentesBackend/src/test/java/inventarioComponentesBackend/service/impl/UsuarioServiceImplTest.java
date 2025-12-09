package inventarioComponentesBackend.service.impl;

import inventarioComponentesBackend.model.Usuario;
import inventarioComponentesBackend.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class UsuarioServiceImplTest {


    @Mock
    private UsuarioRepository usuarioRepository;


    @InjectMocks
    private UsuarioServiceImpl usuarioServiceImpl;

    @Test
    void testRegistrarUsuarioDuplicado() {
        //Preparación datos de prueba
        Usuario usuario1 = new Usuario();
        usuario1.setDni("88888888");
        usuario1.setNombre("Test User");
        usuario1.setUsername("testuser");
        usuario1.setPassword("12345");

        // Registramos el usuario por primera vez.
        usuarioServiceImpl.registrarUsuario(usuario1);

        // 3.Verificación del error 
        // Intentamos registrar EXACTAMENTE el mismo usuario otra vez.
        // Esperamos que se lance la excepción.
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            usuarioServiceImpl.registrarUsuario(usuario1);
        });

        // Verificamos que el mensaje sea el correcto
        assertEquals("Error: El usuario con DNI 88888888 ya existe.", exception.getMessage());
        
        // Verificamos que el repositorio solo se llamó 1 vez (en el primer registro exitoso)
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }
}