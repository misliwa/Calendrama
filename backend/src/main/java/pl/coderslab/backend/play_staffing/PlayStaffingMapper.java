package pl.coderslab.backend.play_staffing;
import pl.coderslab.backend.play_staffing_capability.PlayStaffingCapability;
import pl.coderslab.backend.play_staffing_capability.PlayStaffingCapabilityMapper;
import pl.coderslab.backend.profession.Profession;
import pl.coderslab.backend.profession.ProfessionMapper;

import java.security.DrbgParameters;
import java.util.Set;
import java.util.stream.Collectors;


public class PlayStaffingMapper {
    public static PlayStaffingResponseDTO toDTO(PlayStaffing playStaffing){
        return new PlayStaffingResponseDTO(
                playStaffing.getId(),
                ProfessionMapper.toDTO(playStaffing.getProfession()),
                playStaffing.getRoleName(),
                playStaffing.getCapabilities().stream().map(
                                PlayStaffingCapabilityMapper::toDTO
                )
                        .collect(Collectors.toSet())
        );
    }

    public static PlayStaffing toEntity(PlayStaffingRequestDTO playStaffingDTO, Profession profession){
        return PlayStaffing.builder()
                .roleName(playStaffingDTO.roleName())
                .profession(profession)
                .build();
    }

    public static void updateEntity(
            PlayStaffing staffing,
            PlayStaffingRequestDTO dto,
            Profession profession
    ) {
        staffing.setRoleName(dto.roleName());
        staffing.setProfession(profession);
    }
}
