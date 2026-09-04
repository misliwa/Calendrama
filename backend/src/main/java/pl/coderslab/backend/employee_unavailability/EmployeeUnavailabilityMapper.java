package pl.coderslab.backend.employee_unavailability;

import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.employee.EmployeeMapper;

public class EmployeeUnavailabilityMapper {
    public static EmployeeUnavailabilityResponseDTO toDTO (EmployeeUnavailability employeeUnavailability){
        return new EmployeeUnavailabilityResponseDTO(
                employeeUnavailability.getId(),
                EmployeeMapper.toBasicDTO(employeeUnavailability.getEmployee()),
                employeeUnavailability.getStartDateTime(),
                employeeUnavailability.getEndDateTime(),
                employeeUnavailability.getDescription()
        );
    }

    public static EmployeeUnavailability toEntity(EmployeeUnavailabilityRequestDTO unavailabilityRequestDTO, Employee employee) {
        return EmployeeUnavailability.builder()
                .employee(employee)
                .startDateTime(unavailabilityRequestDTO.startDateTime())
                .endDateTime(unavailabilityRequestDTO.endDateTime())
                .description(unavailabilityRequestDTO.description())
                .build();
    }

    public static void updateEntity (EmployeeUnavailability entity, EmployeeUnavailabilityRequestDTO requestDTO){
        entity.setDescription(requestDTO.description());
        entity.setStartDateTime(requestDTO.startDateTime());
        entity.setEndDateTime(requestDTO.endDateTime());
    }
}
