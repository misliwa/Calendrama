package pl.coderslab.backend.stage;

public class StageMapper {
    public static StageDTO toDTO(Stage stage){
        return new StageDTO(stage.getId(), stage.getName(), stage.getDescription());
    }

    public static Stage toEntity(StageDTO stageDTO){
        return Stage.builder()
                .name(stageDTO.name())
                .description(stageDTO.description())
                .build();
    }
}
