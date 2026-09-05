package pl.coderslab.backend.play_staffing;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.employee_unavailability.EmployeeUnavailability;
import pl.coderslab.backend.employee_unavailability.EmployeeUnavailabilityMapper;
import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.play.PlayService;
import pl.coderslab.backend.profession.Profession;
import pl.coderslab.backend.profession.ProfessionService;
import pl.coderslab.backend.stage.StageRepository;


import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayStaffingService {
    private final PlayStaffingRepository playStaffingRepository;
    private final PlayService playService;
    private final ProfessionService professionService;

    public List<PlayStaffingResponseDTO> findAllByPlayId(Long id) {
        return playStaffingRepository.findAllByPlay_Id(id)
                .stream()
                .map(PlayStaffingMapper::toDTO)
                .toList();
    }

    public PlayStaffingResponseDTO createStaffingForPlayId(
            Long playId,
            @Valid PlayStaffingRequestDTO staffingRequestDTO
    ) {
        Play play = playService.findPlayById(playId);
        Profession profession = professionService.findProfessionById(staffingRequestDTO.profession().id());

        PlayStaffing staffing = PlayStaffingMapper.toEntity(staffingRequestDTO, profession);

        staffing = playStaffingRepository.save(staffing);

        return PlayStaffingMapper.toDTO(staffing);
    }
}
