package pl.coderslab.backend.event_possibility;

public record EventConflictDTO(
        EventConflictType type,
        String message
) {
}
