package pl.coderslab.backend.event;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.NumberFormat;
import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.stage.Stage;

import java.time.LocalDateTime;

public record EventRequestDTO(
        EventType type,

        @NotNull
        LocalDateTime startDateTime,

        @NotNull
        LocalDateTime endDateTime,

        @NotNull
        @NumberFormat
        Long stageId,

        @NotNull
        @NumberFormat
        Long playId,

        @NotNull
        String description
        ) {
        @AssertTrue(message = "End date must be after start date")
        public boolean isDateRangeValid() {
                if (startDateTime == null || endDateTime == null) {
                        return true;
                }

                return endDateTime.isAfter(startDateTime);
        }
}
