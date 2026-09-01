package pl.coderslab.backend.play_staffing;
import pl.coderslab.backend.profession.Profession;
import pl.coderslab.backend.profession.ProfessionMapper;


public class PlayStaffingMapper {
    public static PlayStaffingDTO toDTO(PlayStaffing playStaffing){
        return new PlayStaffingDTO(
                playStaffing.getId(),
                ProfessionMapper.toDTO(playStaffing.getProfession()),
                playStaffing.getRoleName()
        );
    }

    public static PlayStaffing toEntity(PlayStaffingDTO playStaffingDTO, Profession profession){
        return PlayStaffing.builder()
                .roleName(playStaffingDTO.roleName())
                .profession(profession)
                .build();
    }

    public static void updateEntity(
            PlayStaffing staffing,
            PlayStaffingDTO dto,
            Profession profession
    ) {
        staffing.setRoleName(dto.roleName());
        staffing.setProfession(profession);
    }
}
