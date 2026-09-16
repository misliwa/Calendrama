package pl.coderslab.backend.event_assignment;

import pl.coderslab.backend.employee.EmployeeResponseDTO;
import pl.coderslab.backend.event.EventResponseDTO;
import pl.coderslab.backend.play_staffing.PlayStaffingResponseDTO;

public record EventAssignmentResponseDTO(
        Long id,
        Long eventId,
        EmployeeResponseDTO employee,
        PlayStaffingResponseDTO playStaffing,
        ConfirmationStatus confirmationStatus
) {
}
