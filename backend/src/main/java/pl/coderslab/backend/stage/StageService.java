package pl.coderslab.backend.stage;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.coderslab.backend.exception.ResourceNotFoundException;
import pl.coderslab.backend.profession.Profession;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class StageService {
    private final StageRepository repository;
    private final String RESOURCE_NAME = Stage.class.getSimpleName();

    public List<StageDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(StageMapper::toDTO)
                .toList();
    }

    public StageDTO create(StageDTO stageDTO) {
        Stage stage = StageMapper.toEntity(stageDTO);

        stage = repository.save(stage);

        return StageMapper.toDTO(stage);
    }

    public Stage findStageById(Long id){
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );
    }

    public StageDTO findById(Long id) {
        Stage stage = findStageById(id);

        return StageMapper.toDTO(stage);
    }

    public StageDTO updateById(Long id, StageDTO stageDTO) {
        Stage stage = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );

        stage.setName(stageDTO.name());
        stage.setDescription(stageDTO.description());
        stage = repository.save(stage);

        return StageMapper.toDTO(stage);
    }

    public void deleteById(Long id) {
        Stage stage = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(RESOURCE_NAME, id)
                );

        repository.delete(stage);
    }
}
