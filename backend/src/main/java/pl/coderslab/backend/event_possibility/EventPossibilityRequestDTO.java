package pl.coderslab.backend.event_possibility;

import java.time.LocalDateTime;

public record EventPossibilityRequestDTO(
        Long playId,
        LocalDateTime start
) {
}
