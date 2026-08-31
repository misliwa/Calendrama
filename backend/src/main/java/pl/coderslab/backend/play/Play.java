package pl.coderslab.backend.play;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import pl.coderslab.backend.stage.Stage;

import java.time.Duration;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Play {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 1, max = 50)
    private String title;

    @NotNull
    private String description;

    @NotNull
    private LocalDate premiereDate;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "stage_id", nullable = false)
    Stage stage;

    @NotNull
    @Min(1)
    Integer durationInMinutes;
}
