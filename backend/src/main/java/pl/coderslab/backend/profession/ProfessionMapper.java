package pl.coderslab.backend.profession;

import pl.coderslab.backend.stage.Stage;
import pl.coderslab.backend.stage.StageDTO;

public class ProfessionMapper {
    public static ProfessionDTO toDTO(Profession profession){
        return new ProfessionDTO(profession.getId(), profession.getName());
    }

    public static Profession toEntity(ProfessionDTO professionDTO){
        return Profession.builder()
                .name(professionDTO.name())
                .build();
    }
}
