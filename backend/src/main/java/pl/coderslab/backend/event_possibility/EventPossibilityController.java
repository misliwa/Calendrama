package pl.coderslab.backend.event_possibility;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class EventPossibilityController {
    private final EventPossibilityService eventPossibilityService;

    @PostMapping("/api/events/check-possibility")
    public EventPossibilityResponseDTO checkPossibility(
            @Valid @RequestBody EventPossibilityRequestDTO requestDTO
    ) {
        return eventPossibilityService.checkPossibility(requestDTO);
    }
}
