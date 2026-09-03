package pl.coderslab.backend.play_staffing_capability;

import pl.coderslab.backend.employee.EmployeeMapper;

public class PlayStaffingCapabilityMapper {
    public static PlayStaffingCapabilityDTO toDTO (PlayStaffingCapability capability){
        return new PlayStaffingCapabilityDTO(
                capability.getId(),
                EmployeeMapper.toBasicDTO(capability.getEmployee())
        );
    }
}
