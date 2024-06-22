package inventarioComponentesBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import inventarioComponentesBackend.model.Movimiento;

@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento,String> {
    Optional<Movimiento> findTopByOrderByCodigoDesc();
}
