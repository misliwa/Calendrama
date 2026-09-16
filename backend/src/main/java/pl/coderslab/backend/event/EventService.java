package pl.coderslab.backend.event;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.coderslab.backend.exception.ResourceNotFoundException;
import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.play.PlayService;
import pl.coderslab.backend.stage.Stage;
import pl.coderslab.backend.stage.StageService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private static final String RESOURCE_NAME = Event.class.getSimpleName();
    private final EventRepository eventRepository;
    private final StageService stageService;
    private final PlayService playService;

    public List<EventResponseDTO> findAll() {
        return eventRepository.findAll()
                .stream()
                .map(EventMapper::toDTO)
                .toList();
    }

    public EventResponseDTO create(EventRequestDTO requestDTO) {
        Stage stage = stageService.findStageById(requestDTO.stageId());

        Play play = requestDTO.playId() != null ? playService.findPlayById(requestDTO.playId()) : null;
        Event event = EventMapper.toEntity(requestDTO, play, stage);
        event = eventRepository.save(event);
        return EventMapper.toDTO(event);
    }

    public Event findEventById(Long id) {
        return eventRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );
    }

    public EventResponseDTO findById(Long id) {
        Event event = findEventById(id);

        return EventMapper.toDTO(event);
    }

    public EventResponseDTO updateById(Long id, EventRequestDTO requestDTO) {
        Event event = findEventById(id);
        Stage stage = stageService.findStageById(requestDTO.stageId());
        Play play = playService.findPlayById(requestDTO.playId());

        EventMapper.updateEntity(event, requestDTO, stage, play);

        event = eventRepository.save(event);

        return EventMapper.toDTO(event);
    }

    public void deleteById(Long id) {
        Event event = findEventById(id);
        eventRepository.delete(event);
    }
}
