package pl.coderslab.backend.employee;

import pl.coderslab.backend.play.Play;
import pl.coderslab.backend.play.PlayRequestDTO;
import pl.coderslab.backend.play.PlayResponseDTO;
import pl.coderslab.backend.profession.Profession;
import pl.coderslab.backend.profession.ProfessionMapper;
import pl.coderslab.backend.stage.Stage;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class EmployeeMapper {
    public static EmployeeDTO toDTO(Employee employee){
        return new EmployeeDTO(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getProfessions().stream()
                        .map(ProfessionMapper::toDTO)
                        .collect(Collectors.toSet()),
                employee.isEmployed()
        );
    }

    public static Employee toEntity(EmployeeDTO employeeDTO, Set<Profession> professions){
        return Employee.builder()
                .firstName(employeeDTO.firstName())
                .lastName(employeeDTO.lastName())
                .professions(professions)
                .employed(employeeDTO.employed())
                .build();
    }
}
