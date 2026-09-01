package pl.coderslab.backend.play_staffing;

import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.play.PlayRequestDTO;
import pl.coderslab.backend.play.PlayResponseDTO;
import pl.coderslab.backend.stage.Stage;

public class PlayStaffingMapper {
    public static PlayStaffingResponseDTO toDTO(PlayStaffing playStaffing){
        return new PlayStaffingResponseDTO(
                playStaffing.getId(),
                playStaffing.getProfession().getName(),
                playStaffing.getRoleName()
        );
    }

}
