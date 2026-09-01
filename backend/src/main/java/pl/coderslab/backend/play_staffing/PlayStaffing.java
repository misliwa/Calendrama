package pl.coderslab.backend.play_staffing;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.profession.Profession;

@Getter
@Setter
@Entity
public class PlayStaffing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "play_id", nullable = false)
    private Play play;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "profession_id", nullable = false)
	private Profession profession;

	private String roleName;
}
