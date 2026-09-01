package pl.coderslab.backend.play;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.coderslab.backend.exception.ResourceNotFoundException;
import pl.coderslab.backend.play_staffing.PlayStaffing;
import pl.coderslab.backend.play_staffing.PlayStaffingDTO;
import pl.coderslab.backend.play_staffing.PlayStaffingMapper;
import pl.coderslab.backend.profession.Profession;
import pl.coderslab.backend.profession.ProfessionService;
import pl.coderslab.backend.stage.Stage;
import pl.coderslab.backend.stage.StageRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayService {
    private final PlayRepository playRepository;
    private final StageRepository stageRepository;
    private static final String RESOURCE_NAME = Play.class.getSimpleName();
    private final ProfessionService professionService;


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
    public PlayDetailsDTO createDetailed(PlayDetailsDTO playDetailsDTO) {
        Stage stage = getStage(playDetailsDTO.stageId());
        Play play = PlayMapper.detailedToEntity(playDetailsDTO, stage);


        if(playDetailsDTO.staffings() != null) {
            for (PlayStaffingDTO playStaffing
                    : playDetailsDTO.staffings()) {

                addStaffingToPlay(play, playStaffing);
            }
        }

        play = playRepository.save(play);

        return PlayMapper.toDetailedDTO(play);
    }

    @Transactional
    public PlayDetailsDTO updateDetailedById(Long id, PlayDetailsDTO playDetailsDTO) {
        Play play = playRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );

        Stage updatedStage = getStage(playDetailsDTO.stageId());

        PlayMapper.updateEntity(play, playDetailsDTO, updatedStage);

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

    private Stage getStage(Long id) {
        return stageRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Stage", id));
    }

    private void addStaffingToPlay(Play play, PlayStaffingDTO playStaffingDTO){
        Profession profession = professionService.getOrCreate(playStaffingDTO.profession());

        PlayStaffing playStaffing = PlayStaffingMapper.toEntity(playStaffingDTO, profession);

        play.addPlayStaffing(playStaffing);
    }

}
