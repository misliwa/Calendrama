package pl.coderslab.backend.event_possibility;

import java.util.List;

public record EventPossibilityResponseDTO(
        boolean possible,
        List<EventConflictDTO> conflicts,
        List<EventWarningDTO> warnings
) {
}
