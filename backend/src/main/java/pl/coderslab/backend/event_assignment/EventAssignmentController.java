package pl.coderslab.backend.event_assignment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
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
}
