package pl.coderslab.backend.stage;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
