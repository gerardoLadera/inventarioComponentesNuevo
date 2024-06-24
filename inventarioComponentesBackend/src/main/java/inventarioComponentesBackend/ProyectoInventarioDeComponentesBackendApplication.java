package inventarioComponentesBackend;



import java.util.Date;
import java.sql.Time;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import inventarioComponentesBackend.model.Movimiento;
import inventarioComponentesBackend.model.Producto;
import inventarioComponentesBackend.model.Proveedor;
import inventarioComponentesBackend.model.Usuario;
import inventarioComponentesBackend.service.MovimientoService;
import inventarioComponentesBackend.service.ProductoService;
import inventarioComponentesBackend.service.ProveedorService;
import inventarioComponentesBackend.service.UsuarioService;

@SpringBootApplication
public class ProyectoInventarioDeComponentesBackendApplication implements CommandLineRunner{

	//@Autowired
	//private ProductoService productoService;
	
	@Autowired
	private UsuarioService usuarioService;
	
	//@Autowired
	//private ProveedorService proveedorService;

	//@Autowired
	//private MovimientoService movimientoService;
	


	public static void main(String[] args) {
		SpringApplication.run(ProyectoInventarioDeComponentesBackendApplication.class, args);
		
	
	}

	@Override
	public void run(String... args) throws Exception {

		Date fecha= new Date();
		long currentTimeMillis = System.currentTimeMillis();
		Time hora=new Time(currentTimeMillis );
		//movimientoService.registrarMovimiento(new Movimiento("Entrada",fecha, hora, "Lapto Toshiba","010"));
		//movimientoService.modificarMovimiento("00001", new Movimiento("Entrada",fecha, hora, "Laptos Dell i5","003"));
		//Movimiento movi=movimientoService.buscarMovimientoPorId("00001");
		//List<Movimiento>movimientos=movimientoService.obtenerTodosLosMovimientos();
		//movimientoService.eliminarMovimiento("00002");
		//proveedorService.agregarProveedor(new Proveedor("CoolerMaster", "SanIsidro","97105020","coolermaster.peru@gmail.com"));
		//proveedorService.actualizarProveedor(2, new Proveedor("CoolerMaster", "Miraflores","97105020","coolermaster.peru@gmail.com"));
		//Proveedor prove=proveedorService.buscarProveedorPorId(2);
		//proveedorService.eliminarProveedor(2);
		//productoService.registrarProducto(new Producto("ASUS RTX 3070", "3070","tarjeta Grafica", "Asus", "Gama Alta", 300));
		//productoService.registrarProducto(new Producto("ASUS RTX 4060", "4060","tarjeta Grafica", "Asus", "Gama Alta", 100));
		//productoService.eliminarProducto(2);
		//productoService.actualizarProducto(1, new Producto("ASUS 4090", "4090","tarjeta Grafica", "Asus", "Gama Alta", 50));
		//usuarioService.registrarUsuario(new Usuario("9999999","USER", "CONTRASENIA","Pedro","Ramirez","Arias","955913089", "Av Brasil 081","empleado"));
		//usuarioService.actualizarUsuario("21087977", new Usuario(null,"USERri", "CONTRASENIAAAA","Ana Maria","Ladera","Arias","955913088", "La victoria",null));
		//usuarioService.eliminarUsuario("21087977");
		//Usuario user=usuarioService.buscarUsuario("21087930");
		//usuarioService.sincronizarCambiosConBaseDeDatos();
		//System.out.println("ID: " + prove.getId());
		//System.out.println("Nombre: " + prove.getNombre());
		//System.out.println("Corre: " + prove.getCorreo());
		/*List<Usuario> empleados = usuarioService.obtenerEmpleados();
		if (empleados !=null) {
			// Obtener el primer empleado
			Usuario user = empleados.get(1);
		
			// Imprimir los datos del primer empleado
			System.out.println("DNI: " + user.getDni());
			System.out.println("Username: " + user.getUsername());
			System.out.println("Nombre: " + user.getNombre());
			System.out.println("Primer Apellido: " + user.getPrimerApellido());
			System.out.println("Segundo Apellido: " + user.getSegundoApellido());
			System.out.println("Dirección: " + user.getDireccion());
			System.out.println("Teléfono: " + user.getTelefono());
			System.out.println("Rol: " + user.getRol());
		} else {
			System.out.println("Usuario no encontrado en el sistema.");
		}*/
		//Movimiento movi = movimientos.get(1);

			//System.out.println("Codigo: " + movi.getCodigo());
			//System.out.println("Tipo Movi: " + movi.getTipoMovimiento());
			//System.out.println("Descripcion: " + movi.getDescripcion());
			
	}

}
