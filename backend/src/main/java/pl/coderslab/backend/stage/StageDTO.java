package pl.coderslab.backend.stage;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record StageDTO(
        Long id,
        @NotBlank
        @Size(max = 50)
        String name,
        String description
) {
}
