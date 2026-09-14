package pl.coderslab.backend.event;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.stage.Stage;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String title;

    @Enumerated(EnumType.STRING)
    private EventType type;

    @NotNull
    private LocalDateTime startDateTime;

    @NotNull
    private LocalDateTime endDateTime;

    @ManyToOne
    private Stage stage;

    @ManyToOne
    private Play play;

    @NotNull
    private String description;

    @AssertTrue(message = "End date must be after start date")
    public boolean isDateRangeValid() {
        if (startDateTime == null || endDateTime == null) {
            return true;
        }

        return endDateTime.isAfter(startDateTime);
    }
}
