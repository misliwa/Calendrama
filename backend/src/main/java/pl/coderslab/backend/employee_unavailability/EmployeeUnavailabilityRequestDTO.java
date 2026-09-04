package pl.coderslab.backend.employee_unavailability;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record EmployeeUnavailabilityRequestDTO(
        @NotNull
        LocalDateTime startDateTime,

        @NotNull
        LocalDateTime endDateTime,

        @NotBlank
        @Size(min = 2, max = 30)
        String description
) {
    @AssertTrue(message = "End date must be after start date")
    public boolean isDateRangeValid() {
        if (startDateTime == null || endDateTime == null) {
            return true;
        }

        return endDateTime.isAfter(startDateTime);
    }
}
