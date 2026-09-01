package pl.coderslab.backend.play_staffing;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayStaffingService {
    private final PlayStaffingRepository playStaffingRepository;

    public List<PlayStaffingDTO> findAllByPlayId(Long id) {
        return playStaffingRepository.findAllByPlay_Id(id)
                .stream()
                .map(PlayStaffingMapper::toDTO)
                .toList();
    }
}
