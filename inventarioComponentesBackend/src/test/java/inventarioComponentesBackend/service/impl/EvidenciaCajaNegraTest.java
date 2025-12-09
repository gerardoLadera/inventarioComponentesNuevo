package inventarioComponentesBackend.service.impl;

import inventarioComponentesBackend.model.Usuario;
import inventarioComponentesBackend.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class EvidenciaCajaNegraTest {

    @Mock
    private UsuarioRepository usuarioRepository; // Simulamos la BD

    @InjectMocks
    private UsuarioServiceImpl usuarioService; // El servicio con el defecto

    @Test
    void demostrarDefectoDuplicidad() {
        System.out.println("=== INICIO DE PRUEBA DE CAJA NEGRA (TC-USR-02) ===");

        // 1. Preparar un usuario
        Usuario usuario = new Usuario();
        usuario.setDni("12345678");
        usuario.setNombre("Juan Perez");
 

        // 2. PRIMER INTENTO (TC-USR-01)
        System.out.println("[Paso 1] Registrando usuario DNI 12345678...");
        usuarioService.registrarUsuario(usuario);
        System.out.println("-> Resultado: Registro Exitoso.");

        // 3. SEGUNDO INTENTO (TC-USR-02) - Aquí debería fallar, pero como hay defecto, pasará
        System.out.println("\n[Paso 2] Intentando registrar MISMO DNI 12345678 nuevamente...");
        try {
            usuarioService.registrarUsuario(usuario);
            System.out.println("-> Resultado (DEFECTO): El sistema permitió el registro duplicado sin mostrar error.");
        } catch (Exception e) {
            System.out.println("-> Resultado: El sistema bloqueó el registro (Correcto).");
        }

        // 4. VERIFICACIÓN FINAL (Consecuencia)
        System.out.println("\n[Paso 3] Listando usuarios en memoria:");
        List<Usuario> lista = usuarioService.obtenerTodosLosUsuarios();
        
        System.out.println("Total de usuarios encontrados: " + lista.size());
        for (Usuario u : lista) {
            System.out.println(" - Usuario en lista: " + u.getNombre() + " | DNI: " + u.getDni());
        }
        
        System.out.println("=== FIN DE PRUEBA ===");
    }
}