package pl.coderslab.backend.profession;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessionRepository extends JpaRepository<Profession, Long> {
    boolean existsByNameIgnoreCase(String name);
}
