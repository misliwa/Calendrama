package pl.coderslab.backend.stage;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.coderslab.backend.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class StageService {
    private final StageRepository repository;

    public List<StageDTO> findAll(){
        return repository.findAll()
                .stream()
                .map(StageMapper::toDTO)
                .toList();
    }

    public StageDTO findById(Long id) {
        Optional<Stage> optionalStage = repository.findById(id);

        if(optionalStage.isPresent()){
            return StageMapper.toDTO(optionalStage.get());
        }else{
            throw new ResourceNotFoundException(String.format("Stage with id %d not found", id));
        }
    }
}
