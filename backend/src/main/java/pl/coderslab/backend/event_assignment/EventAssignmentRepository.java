package pl.coderslab.backend.event_assignment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventAssignmentRepository extends JpaRepository<EventAssignment, Long> {
    List<EventAssignment> findAllByEvent_Id(Long eventId);

    void deleteAllByEvent_Id(Long eventId);
}
