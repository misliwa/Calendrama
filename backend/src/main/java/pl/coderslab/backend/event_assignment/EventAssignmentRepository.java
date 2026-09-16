package pl.coderslab.backend.event_assignment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EventAssignmentRepository extends JpaRepository<EventAssignment, Long> {
    List<EventAssignment> findAllByEvent_Id(Long eventId);

    void deleteAllByEvent_Id(Long eventId);


    @Query(
            """
    SELECT COUNT (e) > 0
    FROM EventAssignment e
    WHERE e.employee.id = :employeeId
    AND e.event.start < :requestedEnd
     AND e.event.end > :requestedStart
     AND (:excludedEventId IS NULL OR e.event.id != :excludedEventId)
"""
    )
    boolean existsEmployeeEventConflict(
            @Param("employeeId") Long employeeId,
            @Param("requestedStart") LocalDateTime requestedStart,
            @Param("requestedEnd") LocalDateTime requestedEnd,
            @Param("excludedEventId") Long excludedEventId
            );
}
