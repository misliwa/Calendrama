package pl.coderslab.backend.play_staffing;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.backend.employee_unavailability.EmployeeUnavailabilityRequestDTO;
import pl.coderslab.backend.employee_unavailability.EmployeeUnavailabilityResponseDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/plays/{playId}/staffings")
public class PlayStaffingController {
    private final PlayStaffingService staffingService;

    @GetMapping("")
    public ResponseEntity<List<PlayStaffingResponseDTO>> findAllByPlayId(@PathVariable("playId") Long playId){
        return ResponseEntity.ok(staffingService.findAllByPlayId(playId));
    }

    @PostMapping("")
    public ResponseEntity<PlayStaffingResponseDTO> createStaffingForPlayId(
            @PathVariable("playId") Long playId,
            @RequestBody @Valid PlayStaffingRequestDTO staffingRequestDTO
    ){
        return ResponseEntity.status(HttpStatus.CREATED).body(staffingService.createStaffingForPlayId(playId, staffingRequestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlayStaffingResponseDTO> updateById(
            @PathVariable("playId") Long playId,
            @PathVariable("id") Long id,
            @RequestBody @Valid PlayStaffingRequestDTO staffingRequestDTO
    ){
        return ResponseEntity.ok(staffingService.updateById(playId, id, staffingRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(
            @PathVariable("playId") Long playId,
            @PathVariable("id") Long id
    ){
        unavailabilityService.deleteById(playId, id);
        return ResponseEntity.noContent().build();
    }
}
