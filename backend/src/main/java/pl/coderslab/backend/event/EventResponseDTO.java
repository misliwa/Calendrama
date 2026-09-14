package pl.coderslab.backend.event;

import pl.coderslab.backend.play.PlayResponseDTO;
import pl.coderslab.backend.stage.StageDTO;

import java.time.LocalDateTime;

public record EventResponseDTO(
        Long id,

        EventType type,

        String title,

        LocalDateTime start,

        LocalDateTime end,

        StageDTO stage,

        PlayResponseDTO play,

        String description
        ) {
}
