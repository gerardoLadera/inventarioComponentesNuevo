package inventarioComponentesBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import inventarioComponentesBackend.model.PedidoProveedor;

@Repository
public interface PedidoProveedorRepository extends JpaRepository<PedidoProveedor,String>{
    Optional<PedidoProveedor> findTopByOrderByCodigoDesc();
}
