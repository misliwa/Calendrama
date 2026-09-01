package pl.coderslab.backend.play;

import pl.coderslab.backend.play_staffing.PlayStaffing;
import pl.coderslab.backend.play_staffing.PlayStaffingMapper;
import pl.coderslab.backend.stage.Stage;

import java.util.List;

public class PlayMapper {
    public static PlayResponseDTO toDTO(Play play){
        return new PlayResponseDTO(
                play.getId(),
                play.getTitle(),
                play.getDescription(),
                play.getPremiereDate(),
                play.getDurationInMinutes(),
                play.getStage().getId(),
                play.getStage().getName()
        );
    }

    public static Play toEntity(PlayRequestDTO playResponseDTO, Stage stage){
        return Play.builder()
                .title(playResponseDTO.title())
                .description(playResponseDTO.description())
                .premiereDate(playResponseDTO.premiereDate())
                .durationInMinutes(playResponseDTO.durationInMinutes())
                .stage(stage)
                .build();
    }

    public static PlayDetailsDTO toDetailedDTO(Play play){
        return new PlayDetailsDTO(
                play.getId(),
                play.getTitle(),
                play.getDescription(),
                play.getPremiereDate(),
                play.getDurationInMinutes(),
                play.getStage().getId(),
                play.getStage().getName(),
                play.getPlayStaffings().stream().map(
                        PlayStaffingMapper::toDTO
                ).toList()
        );
    }

    public static Play detailedToEntity(PlayDetailsDTO playDetailsDTO, Stage stage){
        return Play.builder()
                .title(playDetailsDTO.title())
                .description(playDetailsDTO.description())
                .premiereDate(playDetailsDTO.premiereDate())
                .durationInMinutes(playDetailsDTO.durationInMinutes())
                .stage(stage)
                .build();
    }

    public static void updateEntity(Play play, PlayRequestDTO dto, Stage stage) {
        play.setTitle(dto.title());
        play.setDescription(dto.description());
        play.setPremiereDate(dto.premiereDate());
        play.setDurationInMinutes(dto.durationInMinutes());
        play.setStage(stage);
    }

    public static void updateEntity(Play play, PlayDetailsDTO dto, Stage stage) {
        play.setTitle(dto.title());
        play.setDescription(dto.description());
        play.setPremiereDate(dto.premiereDate());
        play.setDurationInMinutes(dto.durationInMinutes());
        play.setStage(stage);
    }
}
