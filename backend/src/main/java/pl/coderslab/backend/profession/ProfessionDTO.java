package pl.coderslab.backend.profession;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProfessionDTO(
        Long id,
        @NotBlank
        @Size(min = 2, max = 30)
        String name
) {
}