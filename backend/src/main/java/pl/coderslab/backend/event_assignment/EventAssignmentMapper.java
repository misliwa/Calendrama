package pl.coderslab.backend.event_assignment;

import pl.coderslab.backend.employee.EmployeeMapper;
import pl.coderslab.backend.play_staffing.PlayStaffingMapper;

public class EventAssignmentMapper {
    public static EventAssignmentResponseDTO toDTO(EventAssignment eventAssignment){
        return new EventAssignmentResponseDTO(
                eventAssignment.getId(),
                eventAssignment.getEvent().getId(),
                EmployeeMapper.toDTO(eventAssignment.getEmployee()),
                PlayStaffingMapper.toDTO(eventAssignment.getPlayStaffing()),
                eventAssignment.getConfirmationStatus()
        );
    }
}
