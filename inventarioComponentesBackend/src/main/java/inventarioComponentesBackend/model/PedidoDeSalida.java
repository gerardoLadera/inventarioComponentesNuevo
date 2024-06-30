package inventarioComponentesBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_pedidosSalida")
public class PedidoDeSalida {


    @Id
    private String codigo;
    


    private String dni_Cliente;
    private  String  fechaPedido;
    private String  horaPedido;
    private String dniUsuario;
    private String codigoProducto;
    private int cantidad;

    public PedidoDeSalida() {
    }

    
    public PedidoDeSalida(String dni_Cliente, String dniUsuario, String codigoProducto, int cantidad) {
        this.dni_Cliente = dni_Cliente;
        this.dniUsuario = dniUsuario;
        this.codigoProducto = codigoProducto;
        this.cantidad = cantidad;
    }

    public String getCodigo() {
        return codigo;
    }


    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }


    public String getDni_Cliente() {
        return dni_Cliente;
    }


    public void setDni_Cliente(String dni_Cliente) {
        this.dni_Cliente = dni_Cliente;
    }


    public String getFechaPedido() {
        return fechaPedido;
    }


    public void setFechaPedido(String fechaPedido) {
        this.fechaPedido = fechaPedido;
    }


    public String getHoraPedido() {
        return horaPedido;
    }


    public void setHoraPedido(String horaPedido) {
        this.horaPedido = horaPedido;
    }


    public String getDniUsuario() {
        return dniUsuario;
    }


    public void setDniUsuario(String dniUsuario) {
        this.dniUsuario = dniUsuario;
    }


    public String getCodigoProducto() {
        return codigoProducto;
    }


    public void setCodigoProducto(String codigoProducto) {
        this.codigoProducto = codigoProducto;
    }


    public int getCantidad() {
        return cantidad;
    }


    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    

}
