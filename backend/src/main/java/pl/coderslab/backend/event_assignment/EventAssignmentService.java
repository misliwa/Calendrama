package pl.coderslab.backend.event_assignment;

import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.employee.EmployeeService;
import pl.coderslab.backend.event.Event;
import pl.coderslab.backend.event.EventService;
import pl.coderslab.backend.exception.ResourceNotFoundException;
import pl.coderslab.backend.play_staffing.PlayStaffing;
import pl.coderslab.backend.play_staffing.PlayStaffingService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventAssignmentService {
    private static final String RESOURCE_NAME = EventAssignment.class.getSimpleName();
    private final EventAssignmentRepository eventAssignmentRepository;
    private final EmployeeService employeeService;
    private final PlayStaffingService playStaffingService;
    private final EventService eventService;

    public EventAssignment findAssignmentById(Long id) {
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

    @Transactional
    public List<EventAssignmentResponseDTO> updateEventAssignments(Long eventId, List<EventAssignmentRequestDTO> assignmentsRequest) {
        Event event = eventService.findEventById(eventId);
        eventAssignmentRepository.deleteAllByEvent_Id(eventId);

        List<EventAssignment> newAssignments = assignmentsRequest.stream()
                .map(request -> {
                    Employee employee = employeeService.findEmployeeById(request.employeeId());
                    PlayStaffing playStaffing = playStaffingService.findStaffingById(request.playStaffingId());

                    if (event.getPlay() == null) {
                        throw new ValidationException(
                                "Only play events can have assignments"
                        );
                    }

                    if(!playStaffing.getPlay().getId().equals(event.getPlay().getId())){
                        throw new ValidationException(
                                "Play staffing does not belong to event play"
                        );
                    }

                    return EventAssignment.builder()
                            .playStaffing(playStaffing)
                            .employee(employee)
                            .event(event)
                            .confirmationStatus(ConfirmationStatus.CONFIRMED)
                            .build();
                }).toList();

        return eventAssignmentRepository.saveAll(newAssignments).stream()
                .map(EventAssignmentMapper::toDTO)
                .toList();
    }
}
