package pl.coderslab.backend.play_staffing_capability;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayStaffingCapabilityRepository extends JpaRepository<PlayStaffingCapability, Long> {
    List<PlayStaffingCapability> findAllByPlayStaffingId(Long playStaffingId);
}
