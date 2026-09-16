package pl.coderslab.backend.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query(
            """
                    SELECT COUNT (e) > 0
                     FROM Event e
                     WHERE e.stage.id = :stageId
                     AND e.start < :requestedEnd
                     AND e.end > :requestedStart
                     AND (:excludedEventId IS NULL OR e.id != :excludedEventId)
                    """
    )
    boolean existsStageConflict(
            @Param("stageId") Long stageId,
            @Param("requestedStart") LocalDateTime requestedStart,
            @Param("requestedEnd") LocalDateTime requestedEnd,
            @Param("excludedEventId") Long excludedEventId
    );
}