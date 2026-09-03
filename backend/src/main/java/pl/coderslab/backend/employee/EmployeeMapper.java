package pl.coderslab.backend.employee;

import pl.coderslab.backend.profession.Profession;
import pl.coderslab.backend.profession.ProfessionMapper;

import java.util.Set;
import java.util.stream.Collectors;

public class EmployeeMapper {
    public static EmployeeResponseDTO toDTO(Employee employee){
        return new EmployeeResponseDTO(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getProfessions().stream()
                        .map(ProfessionMapper::toDTO)
                        .collect(Collectors.toSet()),
                employee.isEmployed()
        );
    }

    public static Employee toEntity(EmployeeRequestDTO employeeDTO, Set<Profession> professions){
        return Employee.builder()
                .firstName(employeeDTO.firstName())
                .lastName(employeeDTO.lastName())
                .professions(professions)
                .employed(employeeDTO.employed())
                .build();
    }

    public static void updateEntity(Employee employee, EmployeeRequestDTO dto, Set<Profession> professions){
        employee.setProfessions(professions);
        employee.setFirstName(dto.firstName());
        employee.setLastName(dto.lastName());
        employee.setEmployed(dto.employed());
    }
}
