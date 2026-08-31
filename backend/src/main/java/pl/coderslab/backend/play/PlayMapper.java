package pl.coderslab.backend.play;

import pl.coderslab.backend.profession.Profession;
import pl.coderslab.backend.profession.ProfessionDTO;
import pl.coderslab.backend.stage.Stage;

public class PlayMapper {
    public static PlayDTO toDTO(Play play){
        return new PlayDTO(
                play.getId(),
                play.getTitle(),
                play.getDescription(),
                play.getPremiereDate(),
                play.getDurationInMinutes(),
                play.getStage().getId(),
                play.getStage().getName()
        );
    }

    public static Play toEntity(PlayDTO playDTO, Stage stage){
        return Play.builder()
                .title(playDTO.title())
                .description(playDTO.description())
                .premiereDate(playDTO.premiereDate())
                .durationInMinutes(playDTO.durationInMinutes())
                .stage(stage)
                .build();
    }

    public static void updateEntity(Play play, PlayDTO dto, Stage stage) {
        play.setTitle(dto.title());
        play.setDescription(dto.description());
        play.setPremiereDate(dto.premiereDate());
        play.setDurationInMinutes(dto.durationInMinutes());
        play.setStage(stage);
    }
}
