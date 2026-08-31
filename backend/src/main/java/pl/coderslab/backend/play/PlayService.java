package pl.coderslab.backend.play;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.coderslab.backend.exception.ResourceNotFoundException;
import pl.coderslab.backend.stage.Stage;
import pl.coderslab.backend.stage.StageRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayService {
    private final PlayRepository playRepository;
    private final StageRepository stageRepository;
    private final String RESOURCE_NAME = Play.class.getSimpleName();


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
}
