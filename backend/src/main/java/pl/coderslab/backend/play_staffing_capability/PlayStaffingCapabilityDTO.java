package pl.coderslab.backend.play_staffing_capability;

import pl.coderslab.backend.employee.EmployeeBasicDTO;

public record PlayStaffingCapabilityDTO(
        Long id,
        EmployeeBasicDTO employee
) {
}
