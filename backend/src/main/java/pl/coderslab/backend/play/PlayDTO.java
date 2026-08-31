package pl.coderslab.backend.play;

import java.time.LocalDate;

public record PlayDTO(
        Long id,
        String title,
        String description,
        LocalDate premiereDate,
        Integer durationInMinutes,
        Long stageId,
        String stageName
) {}
