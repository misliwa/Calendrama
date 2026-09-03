package pl.coderslab.backend.play;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pl.coderslab.backend.play_staffing.PlayStaffingRequestDTO;
import pl.coderslab.backend.play_staffing.PlayStaffingResponseDTO;

import java.time.LocalDate;
import java.util.List;

public record PlayDetailsRequestDTO(

        @NotBlank
        @Size(max = 50)
        String title,

        @NotBlank
        String description,

        @NotNull
        LocalDate premiereDate,

        @NotNull
        @Min(1)
        Integer durationInMinutes,

        @NotNull
        Long stageId,

        @NotNull
        @Valid
        List<PlayStaffingRequestDTO> staffings
) {
        public PlayDetailsRequestDTO {
                staffings = staffings == null
                        ? List.of()
                        : List.copyOf(staffings);
        }
}
