package pl.coderslab.backend.play_staffing;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/plays/{playId}/staffings")
public class PlayStaffingController {
    private final PlayStaffingService staffingService;

    @GetMapping("")
    public ResponseEntity<List<PlayStaffingDTO>> findAllByPlayId(@PathVariable("playId") Long playId){
        return ResponseEntity.ok(staffingService.findAllByPlayId(playId));
    }
}
