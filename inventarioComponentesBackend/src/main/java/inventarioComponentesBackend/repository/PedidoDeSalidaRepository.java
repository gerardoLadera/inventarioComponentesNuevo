package inventarioComponentesBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import inventarioComponentesBackend.model.PedidoDeSalida;

@Repository
public interface PedidoDeSalidaRepository extends JpaRepository<PedidoDeSalida,String> {
    Optional<PedidoDeSalida> findTopByOrderByCodigoDesc();
}
