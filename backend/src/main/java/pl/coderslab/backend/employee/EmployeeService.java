package pl.coderslab.backend.employee;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.coderslab.backend.exception.ResourceNotFoundException;
import pl.coderslab.backend.profession.Profession;
import pl.coderslab.backend.profession.ProfessionRepository;
import pl.coderslab.backend.profession.ProfessionService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private static final String RESOURCE_NAME = Employee.class.getSimpleName();
    private final EmployeeRepository employeeRepository;
    private final ProfessionService professionService;

    public List<EmployeeResponseDTO> findAll() {
        return employeeRepository.findAll()
                .stream()
                .map(EmployeeMapper::toDTO)
                .toList();
    }

    @Transactional
    public EmployeeResponseDTO create(EmployeeRequestDTO employeeDTO) {
        Set<Profession> professions = professionService.getProfessionsByIds(employeeDTO.professions());
        Employee employee = EmployeeMapper.toEntity(employeeDTO, professions);

        employee = employeeRepository.save(employee);

        return EmployeeMapper.toDTO(employee);
    }

    @Transactional
    public EmployeeResponseDTO updateById(Long id, EmployeeRequestDTO employeeDTO){
        Set<Profession> professions = professionService.getProfessionsByIds(employeeDTO.professions());
        Employee employee = employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );

        EmployeeMapper.updateEntity(employee, employeeDTO, professions);

        employee = employeeRepository.save(employee);

        return EmployeeMapper.toDTO(employee);
    }

    public EmployeeResponseDTO findById(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(RESOURCE_NAME, id)
        );

        return EmployeeMapper.toDTO(employee);
    }


    public void deleteById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(RESOURCE_NAME, id)
                );

        employeeRepository.delete(employee);
    }


}
