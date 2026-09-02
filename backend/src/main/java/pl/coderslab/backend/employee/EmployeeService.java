package pl.coderslab.backend.employee;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.coderslab.backend.exception.ResourceNotFoundException;
import pl.coderslab.backend.play.*;
import pl.coderslab.backend.play_staffing.PlayStaffingDTO;
import pl.coderslab.backend.profession.Profession;
import pl.coderslab.backend.profession.ProfessionMapper;
import pl.coderslab.backend.stage.Stage;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private static final String RESOURCE_NAME = Employee.class.getSimpleName();
    private final EmployeeRepository employeeRepository;

    public List<EmployeeDTO> findAll() {
        return employeeRepository.findAll()
                .stream()
                .map(EmployeeMapper::toDTO)
                .toList();
    }

    @Transactional
    public EmployeeDTO create(EmployeeDTO employeeDTO) {

        return null;
    }

    @Transactional
    public EmployeeDTO updateById(Long id, EmployeeDTO employeeDTO){
        return null;
    }

    public EmployeeDTO findById(Long id) {
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
