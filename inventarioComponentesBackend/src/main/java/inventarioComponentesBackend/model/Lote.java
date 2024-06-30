package inventarioComponentesBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_lotes")
public class Lote {

    @Id
    private String id;

    private String codigoMovimiento;
    private String codigoProducto;
    private int cantidad;
    private String fechaRecepcion;
    private boolean calidadAprobada;

    public Lote(){

    }

    public Lote(String codigoMovimiento, String codigoProducto, int cantidad) {
        this.codigoMovimiento = codigoMovimiento;
        this.codigoProducto = codigoProducto;
        this.cantidad = cantidad;
        this.calidadAprobada = false; 
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCodigoMovimiento() {
        return codigoMovimiento;
    }

    public void setCodigoMovimiento(String codigoMovimiento) {
        this.codigoMovimiento = codigoMovimiento;
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

    public String getFechaRecepcion() {
        return fechaRecepcion;
    }

    public void setFechaRecepcion(String fechaRecepcion) {
        this.fechaRecepcion = fechaRecepcion;
    }

    public boolean isCalidadAprobada() {
        return calidadAprobada;
    }

    public void setCalidadAprobada(boolean calidadAprobada) {
        this.calidadAprobada = calidadAprobada;
    }
}
