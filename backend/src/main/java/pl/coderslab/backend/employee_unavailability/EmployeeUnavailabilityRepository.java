package pl.coderslab.backend.employee_unavailability;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EmployeeUnavailabilityRepository extends JpaRepository<EmployeeUnavailability, Long> {
    List<EmployeeUnavailability> findAllByEmployeeIdOrderByStartDateTimeAsc(Long employeeId);

    Optional<EmployeeUnavailability> findByIdAndEmployee_Id(Long id, Long employeeId);

    @Query(
            """
    SELECT COUNT(e) > 0
    FROM EmployeeUnavailability e
    WHERE e.employee.id = :employeeId
    AND e.startDateTime < :requestedEnd
    AND e.endDateTime > :requestedStart

"""
    )
    boolean existsEmployeeUnavailabilityConflict(
            @Param("employeeId") Long employeeId,
            @Param("requestedStart") LocalDateTime requestedStart,
            @Param("requestedEnd") LocalDateTime requestedEnd
    );
}