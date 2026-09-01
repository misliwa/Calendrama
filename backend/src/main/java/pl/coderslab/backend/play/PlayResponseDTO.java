package pl.coderslab.backend.play;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record PlayResponseDTO(
        Long id,
        String title,
        String description,
        LocalDate premiereDate,
        Integer durationInMinutes,
        Long stageId,
        String stageName
) {}
