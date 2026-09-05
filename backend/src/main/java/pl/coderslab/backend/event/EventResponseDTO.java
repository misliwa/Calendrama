package pl.coderslab.backend.event;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

public record EventResponseDTO(
        Long id,

        EventType type,

        LocalDateTime startDateTime,

        LocalDateTime endDateTime,

        Long stageId,

        Long playId,

        String description
        ) {
}
