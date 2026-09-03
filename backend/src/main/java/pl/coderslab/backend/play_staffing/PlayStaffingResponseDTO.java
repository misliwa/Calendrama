package pl.coderslab.backend.play_staffing;

import pl.coderslab.backend.play_staffing_capability.PlayStaffingCapabilityDTO;
import pl.coderslab.backend.profession.ProfessionDTO;

import java.util.Set;

public record PlayStaffingResponseDTO(
        Long id,
        ProfessionDTO profession,
        String roleName,
        Set<PlayStaffingCapabilityDTO> capabilities
) {
}
