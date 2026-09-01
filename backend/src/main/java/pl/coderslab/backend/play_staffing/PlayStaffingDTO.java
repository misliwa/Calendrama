package pl.coderslab.backend.play_staffing;

import pl.coderslab.backend.profession.ProfessionDTO;

public record PlayStaffingDTO(
        Long id,
        ProfessionDTO profession,
        String roleName
) {
}
