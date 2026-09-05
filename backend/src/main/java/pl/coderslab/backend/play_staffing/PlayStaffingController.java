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
public class PlayStaffingController {
    private final PlayStaffingService staffingService;

    @GetMapping("/api/plays/{playId}/staffings")
    public ResponseEntity<List<PlayStaffingResponseDTO>> findAllByPlayId(@PathVariable("playId") Long playId){
        return ResponseEntity.ok(staffingService.findAllByPlayId(playId));
    }

    @PostMapping("/api/plays/{playId}/staffings")
    public ResponseEntity<PlayStaffingResponseDTO> createStaffingForPlayId(
            @PathVariable("playId") Long playId,
            @RequestBody @Valid PlayStaffingRequestDTO staffingRequestDTO
    ){
        return ResponseEntity.status(HttpStatus.CREATED).body(staffingService.createStaffingForPlayId(playId, staffingRequestDTO));
    }

    @PutMapping("/api/staffings/{id}")
    public ResponseEntity<PlayStaffingResponseDTO> updateById(
            @PathVariable("id") Long id,
            @RequestBody @Valid PlayStaffingRequestDTO staffingRequestDTO
    ){
        return ResponseEntity.ok(staffingService.updateById(id, staffingRequestDTO));
    }

    @DeleteMapping("/api/staffings/{id}")
    public ResponseEntity<Void> deleteById(
            @PathVariable("id") Long id
    ){
        staffingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
