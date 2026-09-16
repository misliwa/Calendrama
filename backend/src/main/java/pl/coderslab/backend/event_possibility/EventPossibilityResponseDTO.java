package pl.coderslab.backend.event_possibility;

public record EventPossibilityResponseDTO(
        boolean available,
        boolean stageAvailable
) {
}
