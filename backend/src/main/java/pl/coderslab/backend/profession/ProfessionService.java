package pl.coderslab.backend.profession;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.coderslab.backend.exception.ResourceNotFoundException;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProfessionService {
    private final ProfessionRepository repository;
    private final String RESOURCE_NAME = Profession.class.getSimpleName();

    public List<ProfessionDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(ProfessionMapper::toDTO)
                .toList();
    }

    public ProfessionDTO create(ProfessionDTO professionDTO) {
        Profession profession = ProfessionMapper.toEntity(professionDTO);

        profession = repository.save(profession);

        return ProfessionMapper.toDTO(profession);
    }

    public ProfessionDTO findById(Long id) {
        Profession profession = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );

        return ProfessionMapper.toDTO(profession);
    }

    public ProfessionDTO updateById(Long id, ProfessionDTO professionDTO) {
        Profession profession = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );

        profession.setName(professionDTO.name());
        profession = repository.save(profession);

        return ProfessionMapper.toDTO(profession);
    }

    public void deleteById(Long id) {
        Profession profession = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(RESOURCE_NAME, id)
                );

        repository.delete(profession);
    }

    public Profession getOrCreate(ProfessionDTO professionDTO) {
        if (professionDTO.id() != null) {
            return repository.findById(professionDTO.id()).orElseThrow(() ->
                    new ResourceNotFoundException(RESOURCE_NAME, professionDTO.id())
            );
        } else {
            String name = professionDTO.name().trim();

            return repository.findByNameIgnoreCase(name)
                    .orElseGet(() ->
                            repository.save(Profession.builder()
                                    .name(name)
                                    .build())
                    );
        }
    }

    public Set<Profession> getProfessionsByIds(Set<Long> professionIds) {
        Set<Profession> professions = new HashSet<>(
                repository.findAllById(professionIds)
        );

        if (professions.size() != professionIds.size()) {
            throw new ResourceNotFoundException(
                    Profession.class.getSimpleName(),
                    null
            );
        }

        return professions;
    }
}
