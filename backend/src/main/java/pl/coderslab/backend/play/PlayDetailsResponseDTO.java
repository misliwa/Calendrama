package pl.coderslab.backend.play;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
        List<PlayStaffingResponseDTO> staffings
) {
        public PlayDetailsResponseDTO {
                staffings = staffings == null
                        ? List.of()
                        : List.copyOf(staffings);
        }
}
