package pl.coderslab.backend.stage;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record StageDTO(
        Long id,
        @NotBlank
        @Size(min = 3, max = 50)
        String name,

        @NotNull
        String description
) {
}
