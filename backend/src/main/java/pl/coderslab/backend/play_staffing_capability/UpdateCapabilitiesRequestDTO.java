package pl.coderslab.backend.play_staffing_capability;

import java.util.Set;

public record UpdateCapabilitiesRequestDTO(
        Set<Long> employeeIds
) {
    public UpdateCapabilitiesRequestDTO {
        employeeIds = employeeIds == null
                ? Set.of()
                : Set.copyOf(employeeIds);
    }
}
