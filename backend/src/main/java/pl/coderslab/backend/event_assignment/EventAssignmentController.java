package pl.coderslab.backend.event_assignment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.backend.play_staffing.PlayStaffingResponseDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventAssignmentController {
    private final EventAssignmentService eventAssignmentService;

    @GetMapping("/api/events/{eventId}/assignments")
    public ResponseEntity<List<EventAssignmentResponseDTO>> findAllByPlayId(@PathVariable("eventId") Long eventId){
        return ResponseEntity.ok(eventAssignmentService.findAllByEventId(eventId));
    }

    @PutMapping("/api/events/{eventId}/assignments")
    public ResponseEntity<List<EventAssignmentResponseDTO>> updateEventAssignments(
            @PathVariable("eventId") Long eventId, @RequestBody List< @Valid EventAssignmentRequestDTO> assignmentsRequest
    ){
        List<EventAssignmentResponseDTO> updatedAssignments = eventAssignmentService.updateEventAssignments(eventId, assignmentsRequest);
        return ResponseEntity.ok(updatedAssignments);
    }
}
