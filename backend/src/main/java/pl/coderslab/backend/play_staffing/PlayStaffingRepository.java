package pl.coderslab.backend.play_staffing;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayStaffingRepository extends JpaRepository<PlayStaffing, Long> {
    List<PlayStaffing> findAllByPlay_Id(Long playId);
}
