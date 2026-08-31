package pl.coderslab.backend.play;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record PlayResponseDTO(
        Long id,

        @NotBlank
        @Size(min = 1, max = 50)
        String title,

        @NotNull
        String description,

        @NotNull
        LocalDate premiereDate,

        @NotNull
        @Min(1)
        Integer durationInMinutes,

        @NotNull
        Long stageId,

        String stageName
) {}
