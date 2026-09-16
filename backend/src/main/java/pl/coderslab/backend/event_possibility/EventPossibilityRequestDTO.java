package pl.coderslab.backend.event_possibility;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

public record EventPossibilityRequestDTO(
        @NotNull
        Long playId,
        @NotNull
        LocalDateTime start,
        @NotNull
        LocalDateTime end,
        Long excludedEventId
) {
}
