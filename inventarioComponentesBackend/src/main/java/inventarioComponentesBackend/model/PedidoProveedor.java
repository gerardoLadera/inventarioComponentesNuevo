package inventarioComponentesBackend.model;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_pedidosProveedor")
public class PedidoProveedor {
    @Id
    private String codigo;

    private int codigoProveedor;
    private String dniUsuario;
    private  String id_producto;
    private int cantidad;

    private  String fechaPedido;
    private String  horaPedido;



    public PedidoProveedor() {
    }  

    public PedidoProveedor( int codigoProveedor, String dniUsuario, String id_producto
            , int cantidad, Date fechaPedido, Time horaPedido) {

        this.codigoProveedor = codigoProveedor;
        this.dniUsuario = dniUsuario;
        this.id_producto = id_producto;
        this.cantidad = cantidad;

    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public int getCodigoProveedor() {
        return codigoProveedor;
    }

    public void setCodigoProveedor(int codigoProveedor) {
        this.codigoProveedor = codigoProveedor;
    }

    public String getDniUsuario() {
        return dniUsuario;
    }

    public void setDniUsuario(String dniUsuario) {
        this.dniUsuario = dniUsuario;
    }

    public String getId_producto() {
        return id_producto;
    }

    public void setId_producto(String id_producto) {
        this.id_producto = id_producto;
    }


    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
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


}
