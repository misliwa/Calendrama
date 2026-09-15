package pl.coderslab.backend.event_assignment;
import jakarta.validation.constraints.NotNull;


public record EventAssignmentRequestDTO(
        @NotNull
        Long eventId,

        @NotNull
        Long employeeId,

        @NotNull
        Long playStaffingId,

        ConfirmationStatus confirmationStatus
) {
}
