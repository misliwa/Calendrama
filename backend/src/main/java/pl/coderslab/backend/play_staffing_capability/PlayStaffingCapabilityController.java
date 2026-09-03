package pl.coderslab.backend.play_staffing_capability;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/playstaffings")
public class PlayStaffingCapabilityController {
    private final PlayStaffingCapabilityService capabilityService;

    @PutMapping("/{staffingId}/capabilities")
    public Set<PlayStaffingCapabilityDTO> updateStaffingCapabilities(
            @PathVariable("staffingId") Long staffingId,
            @Valid @RequestBody UpdateCapabilitiesRequestDTO dto){

            return capabilityService.updateStaffingCapabilities(staffingId, dto.employeeIds());
    }
}
