package pl.coderslab.backend.employee_unavailability;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees/{employeeId}/unavailability")
@RequiredArgsConstructor
public class EmployeeUnavailabilityController {
    private final EmployeeUnavailabilityService unavailabilityService;

    @GetMapping("")
    public ResponseEntity<List<EmployeeUnavailabilityResponseDTO>> findAllByEmployeeId(@PathVariable("employeeId") Long employeeId){
        return ResponseEntity.ok(unavailabilityService.findAllByEmployeeId(employeeId));
    }

    @PostMapping("")
    public ResponseEntity<EmployeeUnavailabilityResponseDTO> createUnavailabilityForEmployeeId(
            @PathVariable("employeeId") Long employeeId,
            @RequestBody @Valid EmployeeUnavailabilityRequestDTO unavailabilityRequestDTO
    ){
        return ResponseEntity.status(HttpStatus.CREATED).body(unavailabilityService.createUnavailabilityForEmployeeId(employeeId, unavailabilityRequestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeUnavailabilityResponseDTO> updateById(
            @PathVariable("employeeId") Long employeeId,
            @PathVariable("id") Long id,
            @RequestBody @Valid EmployeeUnavailabilityRequestDTO requestDTO
    ){
        return ResponseEntity.ok(unavailabilityService.updateById(employeeId, id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(
            @PathVariable("employeeId") Long employeeId,
            @PathVariable("id") Long id
    ){
        unavailabilityService.deleteById(employeeId, id);
        return ResponseEntity.noContent().build();
    }
}
