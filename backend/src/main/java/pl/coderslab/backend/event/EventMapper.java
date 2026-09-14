package pl.coderslab.backend.event;

import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.play.PlayMapper;
import pl.coderslab.backend.stage.Stage;
import pl.coderslab.backend.stage.StageMapper;

public class EventMapper {
    public static EventResponseDTO toDTO(Event event){
        return new EventResponseDTO(
                event.getId(),
                event.getType(),
                event.getTitle(),
                event.getStartDateTime(),
                event.getEndDateTime(),
                StageMapper.toDTO(event.getStage()),
                PlayMapper.toDTO(event.getPlay()),
                event.getDescription()
        );
    }

    public static Event toEntity(EventRequestDTO requestDTO, Play play, Stage stage){
        return Event.builder()
                .title(requestDTO.title())
                .startDateTime(requestDTO.startDateTime())
                .endDateTime(requestDTO.endDateTime())
                .play(play)
                .stage(stage)
                .description(requestDTO.description())
                .type(requestDTO.type())
                .build();
    }

    public static void updateEntity(Event event, EventRequestDTO requestDTO, Stage stage, Play play) {
        event.setTitle(requestDTO.title());
        event.setStartDateTime(requestDTO.startDateTime());
        event.setEndDateTime(requestDTO.endDateTime());
        event.setType(requestDTO.type());
        event.setDescription(requestDTO.description());
        event.setPlay(play);
        event.setStage(stage);
    }
}
