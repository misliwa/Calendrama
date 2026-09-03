package pl.coderslab.backend.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import pl.coderslab.backend.profession.ProfessionDTO;
import java.util.Set;

public record EmployeeRequestDTO(
        @NotBlank
        @Size(min = 2, max = 30)
        String firstName,

        @NotBlank
        @Size(min = 2, max = 30)
        String lastName,

        Set<Long> professions,

        boolean employed
) {
    public EmployeeRequestDTO {
        if (professions == null) {
            professions = Set.of();
        }
    }
}
