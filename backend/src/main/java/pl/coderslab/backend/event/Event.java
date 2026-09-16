package pl.coderslab.backend.event;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import pl.coderslab.backend.event_assignment.EventAssignment;
import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.stage.Stage;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private LocalDateTime start;

    @NotNull
    private LocalDateTime end;

    @ManyToOne
    private Stage stage;

    @ManyToOne
    private Play play;

    @NotNull
    private String description;

    @OneToMany(
            mappedBy = "event",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<EventAssignment> assignments = new ArrayList<>();

    @AssertTrue(message = "End date must be after start date")
    public boolean isDateRangeValid() {
        if (start == null || end == null) {
            return true;
        }

        return end.isAfter(start);
    }

    @AssertTrue(message = "Spektakl jest wymagany dla spektaklu i próby")
    public boolean isPlayValid() {
        if (type == null) {
            return true;
        }

        if (type == EventType.PERFORMANCE || type == EventType.REHEARSAL) {
            return play != null;
        }

        return play == null;
    }
}
