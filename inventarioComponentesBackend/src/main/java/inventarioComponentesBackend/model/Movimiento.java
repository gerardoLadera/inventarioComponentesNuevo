package inventarioComponentesBackend.model;

import java.util.Date;
import java.sql.Time;
import java.text.SimpleDateFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="tbl_movimientos")
public class Movimiento {

    

    @Id
    private String codigo;

    private String tipoMovimiento;
    private String hora;
    private String fechaMovimiento;
    private String descripcion;
    private String codigoPedido;
    
    
    
    public Movimiento() {
    }

    
    public Movimiento( String tipoMovimiento,Date fechaMovimiento, Time hora, String descripcion,String codigoPedido) {
        
        this.tipoMovimiento = tipoMovimiento;
        this.descripcion = descripcion;
        this.codigoPedido = codigoPedido;
        // Formatear la fecha
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        this.fechaMovimiento = dateFormat.format(fechaMovimiento);

        // Formatear la hora
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
        this.hora = timeFormat.format(hora);
    }


    public String getCodigo() {
        return codigo;
    }
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    public String getFechaMovimiento() {
        return fechaMovimiento;
    }
    public void setFechaMovimiento(String fechaMovimiento) {
        this.fechaMovimiento = fechaMovimiento;
    }
    public String getTipoMovimiento() {
        return tipoMovimiento;
    }
    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }
    public String getHora() {
        return hora;
    }
    public void setHora(String hora) {
        this.hora = hora;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public String getCodigoPedido() {
        return codigoPedido;
    }
    public void setCodigoPedido(String codigoPedido) {
        this.codigoPedido = codigoPedido;
    }



}
