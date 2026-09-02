package pl.coderslab.backend.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import pl.coderslab.backend.profession.ProfessionDTO;
import java.util.Set;

public record EmployeeDTO(
        Long id,

        @NotBlank
        @Size(min = 2, max = 30)
        String firstName,

        @NotBlank
        @Size(min = 2, max = 30)
        String lastName,

        Set<ProfessionDTO> professions,

        boolean employed
) {
    public EmployeeDTO {
        if (professions == null) {
            professions = Set.of();
        }
    }
}
