package pl.coderslab.backend.event;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.NumberFormat;

import java.time.LocalDateTime;

public record EventRequestDTO(
        EventType type,

        @NotBlank
        @Size(min = 3, max = 50)
        String title,

        @NotNull
        LocalDateTime start,

        @NotNull
        LocalDateTime end,

        @NotNull
        @NumberFormat
        Long stageId,

        @NotNull
        @NumberFormat
        Long playId,

        @NotNull
        String description
        ) {
        @AssertTrue(message = "End date must be after start date")
        public boolean isDateRangeValid() {
                if (start == null || end == null) {
                        return true;
                }

                return end.isAfter(start);
        }
}
