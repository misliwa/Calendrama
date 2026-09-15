package pl.coderslab.backend.event_assignment;

import pl.coderslab.backend.employee.EmployeeMapper;
import pl.coderslab.backend.employee_unavailability.EmployeeUnavailabilityMapper;
import pl.coderslab.backend.event.EventMapper;
import pl.coderslab.backend.play_staffing.PlayStaffingMapper;

public class EventAssignmentMapper {
    public EventAssignmentResponseDTO toDTO(EventAssignment eventAssignment){
        return new EventAssignmentResponseDTO(
                eventAssignment.getId(),
                EventMapper.toDTO(eventAssignment.getEvent()),
                EmployeeMapper.toDTO(eventAssignment.getEmployee()),
                PlayStaffingMapper.toDTO(eventAssignment.getPlayStaffing()),
                eventAssignment.getConfirmationStatus()
        );
    }
}
