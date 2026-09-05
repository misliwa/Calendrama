package pl.coderslab.backend.play;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.coderslab.backend.exception.ResourceNotFoundException;
import pl.coderslab.backend.play_staffing.PlayStaffing;
import pl.coderslab.backend.play_staffing.PlayStaffingRequestDTO;
import pl.coderslab.backend.play_staffing.PlayStaffingMapper;
import pl.coderslab.backend.play_staffing_capability.PlayStaffingCapabilityService;
import pl.coderslab.backend.profession.Profession;
import pl.coderslab.backend.profession.ProfessionService;
import pl.coderslab.backend.stage.Stage;
import pl.coderslab.backend.stage.StageRepository;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayService {
    private final PlayRepository playRepository;
    private final StageRepository stageRepository;
    private static final String RESOURCE_NAME = Play.class.getSimpleName();
    private final ProfessionService professionService;
    private final PlayStaffingCapabilityService capabilityService;


    public List<PlayResponseDTO> findAll() {
        return playRepository.findAll()
                .stream()
                .map(PlayMapper::toDTO)
                .toList();
    }

    public PlayResponseDTO create(PlayRequestDTO playRequestDTO) {
        Stage stage = getStage(playRequestDTO.stageId());

        Play play = PlayMapper.toEntity(playRequestDTO, stage);

        play = playRepository.save(play);

        return PlayMapper.toDTO(play);
    }

    @Transactional
    public PlayDetailsResponseDTO createDetailed(PlayDetailsRequestDTO playDetailsDTO) {
        Stage stage = getStage(playDetailsDTO.stageId());
        Play play = PlayMapper.detailedToEntity(playDetailsDTO, stage);


        if (playDetailsDTO.staffings() != null) {
            for (PlayStaffingRequestDTO playStaffing
                    : playDetailsDTO.staffings()) {

                addStaffingDTOToPlay(play, playStaffing);
            }
        }

        play = playRepository.save(play);

        return PlayMapper.toDetailedDTO(play);
    }

    @Transactional
    public PlayDetailsResponseDTO updateDetailedById(Long id, PlayDetailsRequestDTO playDetailsDTO) {
        Play play = playRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );

        Stage updatedStage = getStage(playDetailsDTO.stageId());

        PlayMapper.updateEntity(play, playDetailsDTO, updatedStage);

        List<PlayStaffingRequestDTO> requestedStaffings = playDetailsDTO.staffings();

        updatePlayStaffings(play, requestedStaffings);

        Play savedPlay = playRepository.save(play);
        return PlayMapper.toDetailedDTO(savedPlay);
    }

    public PlayResponseDTO findById(Long id) {
        Play play = playRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );

        return PlayMapper.toDTO(play);
    }

    public PlayResponseDTO updateById(Long id, PlayRequestDTO playRequestDTO) {
        Play play = playRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );


        Stage updatedStage = getStage(playRequestDTO.stageId());

        PlayMapper.updateEntity(play, playRequestDTO, updatedStage);

        play = playRepository.save(play);

        return PlayMapper.toDTO(play);
    }

    public void deleteById(Long id) {
        Play play = playRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(RESOURCE_NAME, id)
                );

        playRepository.delete(play);
    }

    public Play findPlayById(Long id){
        return playRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(RESOURCE_NAME, id)
                );
    }

    private Stage getStage(Long id) {
        return stageRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Stage", id));
    }

    private void addStaffingDTOToPlay(Play play, PlayStaffingRequestDTO playStaffingDTO) {
        Profession profession = professionService.getOrCreate(playStaffingDTO.profession());
        PlayStaffing playStaffing = PlayStaffingMapper.toEntity(playStaffingDTO, profession);
        play.addPlayStaffing(playStaffing);

        capabilityService.synchronizeCapabilities(
                playStaffing,
                playStaffingDTO.employeeIds()
        );
    }

    private void updatePlayStaffings(Play play, List<PlayStaffingRequestDTO> requestedStaffings) {
        Map<Long, PlayStaffing> existingStaffingsById = play.getPlayStaffings().stream()
                .filter(staffing -> staffing.getId() != null)
                .collect(Collectors.toMap(
                        PlayStaffing::getId,
                        Function.identity()
                ));

        Set<Long> requestedStaffingIds = requestedStaffings.stream()
                .map(PlayStaffingRequestDTO::id)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        for (PlayStaffing existingStaffing : new ArrayList<>(play.getPlayStaffings())) {
            if (!requestedStaffingIds.contains(existingStaffing.getId())) {
                play.removePlayStaffing(existingStaffing);
            }
        }

        for (PlayStaffingRequestDTO requestedStaffing : requestedStaffings) {
            if (requestedStaffing.id() == null) {
                addStaffingDTOToPlay(play, requestedStaffing);
                continue;
            }


            PlayStaffing existingStaffing = existingStaffingsById.get(requestedStaffing.id());
            if (existingStaffing == null) {
                throw new ResourceNotFoundException(PlayStaffing.class.getSimpleName(), requestedStaffing.id());

            }
            Profession profession = professionService.getOrCreate(
                    requestedStaffing.profession()
            );

            PlayStaffingMapper.updateEntity(
                    existingStaffing,
                    requestedStaffing,
                    profession
            );

            capabilityService.synchronizeCapabilities(
                    existingStaffing,
                    requestedStaffing.employeeIds()
            );
        }
    }
}
