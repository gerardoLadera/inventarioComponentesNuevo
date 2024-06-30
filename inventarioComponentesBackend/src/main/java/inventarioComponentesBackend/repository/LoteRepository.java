package inventarioComponentesBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import inventarioComponentesBackend.model.Lote;

@Repository
public interface LoteRepository extends JpaRepository<Lote,String> {
    Optional<Lote> findTopByOrderByIdDesc();
}
