package inventarioComponentesBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import inventarioComponentesBackend.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto,String>{
    Optional<Producto>findTopByOrderByIdDesc();
}
