package pl.coderslab.backend.play_staffing;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
