package pl.coderslab.backend.event_possibility;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.coderslab.backend.event.EventRepository;
import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.play.PlayService;
import pl.coderslab.backend.stage.Stage;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EventPossibilityService {
    private final EventRepository eventRepository;
    private final PlayService playService;

    public EventPossibilityResponseDTO checkPossibility(EventPossibilityRequestDTO requestDTO) {
        List<EventConflictDTO> conflicts = new ArrayList<>();

        Play play = playService.findPlayById(requestDTO.playId());
        Stage stage = play.getStage();

        boolean stageConflict =
                eventRepository.existsStageConflict(stage.getId(), requestDTO.start(), requestDTO.end(), requestDTO.excludedEventId());

        if(stageConflict){
            conflicts.add(new EventConflictDTO(
                    EventConflictType.STAGE_OCCUPIED,
                    "%s jest wtedy zajęta".formatted(stage.getName())
            ));
        }

        return new EventPossibilityResponseDTO(conflicts.isEmpty(), conflicts);
    }
}
