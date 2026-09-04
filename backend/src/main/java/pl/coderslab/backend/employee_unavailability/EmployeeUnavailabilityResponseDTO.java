package pl.coderslab.backend.employee_unavailability;

import org.springframework.cglib.core.Local;
import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.employee.EmployeeBasicDTO;

import java.time.LocalDateTime;

public record EmployeeUnavailabilityResponseDTO(
        Long id,
        EmployeeBasicDTO employee,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime,
        String description
) {
}
