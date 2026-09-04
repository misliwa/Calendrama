package pl.coderslab.backend.employee_unavailability;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeUnavailabilityRepository extends JpaRepository<EmployeeUnavailability, Long> {
    List<EmployeeUnavailability> findAllByEmployeeIdOrderByStartDateTimeAsc(Long employeeId);

    Optional<EmployeeUnavailability> findByIdAndEmployee_Id(Long id, Long employeeId);
}