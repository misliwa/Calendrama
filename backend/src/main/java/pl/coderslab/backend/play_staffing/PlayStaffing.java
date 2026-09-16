package pl.coderslab.backend.play_staffing;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.play_staffing_capability.PlayStaffingCapability;
import pl.coderslab.backend.profession.Profession;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToMany(
            mappedBy = "playStaffing",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private Set<PlayStaffingCapability> capabilities = new HashSet<>();

    public void addCapability(PlayStaffingCapability capability) {
        capabilities.add(capability);
        capability.setPlayStaffing(this);
    }

    public void removeCapability(PlayStaffingCapability capability) {
        capabilities.remove(capability);
        capability.setPlayStaffing(null);
    }

    public String getName(){
        String name = profession.getName();
        if(roleName != null){
            name = name.concat(" - ").concat(roleName);
        }
        return name;
    }
}
