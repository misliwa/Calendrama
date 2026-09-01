package pl.coderslab.backend.play;

import pl.coderslab.backend.play_staffing.PlayStaffingResponseDTO;

import java.time.LocalDate;
import java.util.List;

public record PlayDetailsResponseDTO(
        Long id,
        String title,
        String description,
        LocalDate premiereDate,
        Integer durationInMinutes,
        Long stageId,
        String stageName,
        List<PlayStaffingResponseDTO> playStaffing
) {
}
