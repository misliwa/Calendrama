package pl.coderslab.backend.stage;

public class StageMapper {
    public static StageDTO toDTO(Stage stage){
        return new StageDTO(stage.getId(), stage.getName());
    }
}
