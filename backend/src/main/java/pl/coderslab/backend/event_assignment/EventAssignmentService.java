package pl.coderslab.backend.event_assignment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.coderslab.backend.exception.ResourceNotFoundException;
import pl.coderslab.backend.play_staffing.PlayStaffing;
import pl.coderslab.backend.play_staffing.PlayStaffingMapper;
import pl.coderslab.backend.play_staffing.PlayStaffingResponseDTO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventAssignmentService {
    private static final String RESOURCE_NAME = EventAssignment.class.getSimpleName();
    private final EventAssignmentRepository eventAssignmentRepository;

    public EventAssignment findAssignmentById(Long id){
        return eventAssignmentRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );
    }

    public List<EventAssignmentResponseDTO> findAllByEventId(Long id) {
        return eventAssignmentRepository.findAllByEvent_Id(id)
                .stream()
                .map(EventAssignmentMapper::toDTO)
                .toList();
    }
}
