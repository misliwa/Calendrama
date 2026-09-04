package pl.coderslab.backend.play;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import pl.coderslab.backend.play_staffing.PlayStaffing;
import pl.coderslab.backend.stage.Stage;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "plays")
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
   private Stage stage;

    @NotNull
    @Min(1)
    private Integer durationInMinutes;

    @OneToMany(
            mappedBy = "play",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<PlayStaffing> playStaffings = new ArrayList<>();

    public void addPlayStaffing(PlayStaffing playStaffing){
        this.playStaffings.add(playStaffing);
        playStaffing.setPlay(this);
    }

    public void removePlayStaffing(PlayStaffing playStaffing){
        this.playStaffings.remove(playStaffing);
        playStaffing.setPlay(null);
    }
}
