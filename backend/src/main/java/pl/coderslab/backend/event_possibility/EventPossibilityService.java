package pl.coderslab.backend.event_possibility;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.employee_unavailability.EmployeeUnavailabilityRepository;
import pl.coderslab.backend.event.EventRepository;
import pl.coderslab.backend.event_assignment.EventAssignmentRepository;
import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.play.PlayService;
import pl.coderslab.backend.play_staffing.PlayStaffing;
import pl.coderslab.backend.play_staffing_capability.PlayStaffingCapability;
import pl.coderslab.backend.stage.Stage;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EventPossibilityService {
    private final EventRepository eventRepository;
    private final PlayService playService;
    private final EmployeeUnavailabilityRepository employeeUnavailabilityRepository;
    private final EventAssignmentRepository eventAssignmentRepository;

    @Transactional(readOnly = true)
    public EventPossibilityResponseDTO checkPossibility(EventPossibilityRequestDTO requestDTO) {
        List<EventConflictDTO> conflicts = new ArrayList<>();
        List<EventWarningDTO> warnings = new ArrayList<>();

        Play play = playService.findPlayById(requestDTO.playId());
        Stage stage = play.getStage();

        boolean stageConflict =
                eventRepository.existsStageConflict(stage.getId(), requestDTO.start(), requestDTO.end(), requestDTO.excludedEventId());

        if (stageConflict) {
            conflicts.add(new EventConflictDTO(
                    EventConflictType.STAGE_OCCUPIED,
                    "%s jest wtedy zajęta".formatted(stage.getName())
            ));
        }

        List<PlayStaffing> staffings = play.getPlayStaffings();

        for (PlayStaffing staffing : staffings) {
            boolean availableEmployeeFound = false;

            for (PlayStaffingCapability capability : staffing.getCapabilities()) {
                Employee employee = capability.getEmployee();

                boolean unavailable = employeeUnavailabilityRepository.existsEmployeeUnavailabilityConflict(
                        employee.getId(),
                        requestDTO.start(),
                        requestDTO.end()
                );

                boolean assignedToAnotherEvent = eventAssignmentRepository.existsEmployeeEventConflict(
                        employee.getId(),
                        requestDTO.start(),
                        requestDTO.end(),
                        requestDTO.excludedEventId()
                );

                if (unavailable) {
                    warnings.add(new EventWarningDTO(
                            EventWarningType.EMPLOYEE_UNAVAILABLE,
                            "%s - %s jest niedostępny"
                                    .formatted(
                                            staffing.getName(),
                                            employee.getFullName()
                                            )));
                }
                if (assignedToAnotherEvent) {
                    warnings.add(new EventWarningDTO(
                            EventWarningType.EMPLOYEE_ASSIGNED_TO_ANOTHER_EVENT,
                            "%s - %s jest przypisany do innego wydarzenia"
                                    .formatted(
                                            staffing.getName(),
                                            employee.getFullName()
                                            )));
                }
                if (!unavailable && !assignedToAnotherEvent) {
                    availableEmployeeFound = true;
                }
            }
            if (!availableEmployeeFound) {
                conflicts.add(new EventConflictDTO(
                        EventConflictType.NO_AVAILABLE_EMPLOYEE_FOR_STAFFING,
                        "Brak dostępnego pracownika dla: %s"
                                .formatted(staffing.getName()
                                )));
            }
        }

        return new EventPossibilityResponseDTO(conflicts.isEmpty(), conflicts, warnings);
    }
}
