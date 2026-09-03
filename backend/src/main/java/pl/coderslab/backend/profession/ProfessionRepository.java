package pl.coderslab.backend.profession;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface ProfessionRepository extends JpaRepository<Profession, Long> {
    Optional<Profession> findByNameIgnoreCase(String name);

    Set<Profession> findAllByIdIs(Long id);
}
