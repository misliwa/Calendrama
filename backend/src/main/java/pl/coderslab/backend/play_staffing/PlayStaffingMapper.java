package pl.coderslab.backend.play_staffing;
import pl.coderslab.backend.profession.ProfessionMapper;

public class PlayStaffingMapper {
    public static PlayStaffingResponseDTO toDTO(PlayStaffing playStaffing){
        return new PlayStaffingResponseDTO(
                playStaffing.getId(),
                ProfessionMapper.toDTO(playStaffing.getProfession()),
                playStaffing.getRoleName()
        );
    }

}
