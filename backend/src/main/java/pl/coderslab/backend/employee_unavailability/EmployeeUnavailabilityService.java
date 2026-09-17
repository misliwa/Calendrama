package pl.coderslab.backend.employee_unavailability;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.employee.EmployeeService;
import pl.coderslab.backend.event_assignment.EventAssignmentRepository;
import pl.coderslab.backend.exception.EmployeeEventConflictException;
import pl.coderslab.backend.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeUnavailabilityService {
    private final EmployeeUnavailabilityRepository unavailabilityRepository;
    private final EventAssignmentRepository eventAssignmentRepository;
    private final EmployeeService employeeService;

    public List<EmployeeUnavailabilityResponseDTO> findAllByEmployeeId(Long employeeId) {
        Employee employee = employeeService.findEmployeeById(employeeId);

        return unavailabilityRepository.findAllByEmployeeIdOrderByStartDateTimeAsc(employee.getId())
                .stream()
                .map(EmployeeUnavailabilityMapper::toDTO)
                .toList();
    }

    public EmployeeUnavailabilityResponseDTO createUnavailabilityForEmployeeId(Long employeeId, EmployeeUnavailabilityRequestDTO unavailabilityRequestDTO) {
        if(eventAssignmentRepository.existsEmployeeEventConflict(
                employeeId,
                unavailabilityRequestDTO.startDateTime(),
                unavailabilityRequestDTO.endDateTime(),
                null
        )){
            throw new EmployeeEventConflictException(
                    "Nie można dodać niedostępności. Pracownik jest przypisany do wydarzenia w tym czasie."
            );
        }

        Employee employee = employeeService.findEmployeeById(employeeId);

        EmployeeUnavailability unavailability = EmployeeUnavailabilityMapper.toEntity(unavailabilityRequestDTO, employee);

        unavailability = unavailabilityRepository.save(unavailability);

        return EmployeeUnavailabilityMapper.toDTO(unavailability);
    }

    public EmployeeUnavailabilityResponseDTO updateById(Long employeeId, Long id, EmployeeUnavailabilityRequestDTO requestDTO) {
        if(eventAssignmentRepository.existsEmployeeEventConflict(
                employeeId,
                requestDTO.startDateTime(),
                requestDTO.endDateTime(),
                null
        )){
            throw new EmployeeEventConflictException(
                    "Nie można zapisać niedostępności. Pracownik jest przypisany do wydarzenia w tym czasie."
            );
        }

        EmployeeUnavailability unavailability = findByIdAndEmployeeId(id, employeeId);

        EmployeeUnavailabilityMapper.updateEntity(unavailability, requestDTO);

        EmployeeUnavailability savedUnavailability =
                unavailabilityRepository.save(unavailability);

        return EmployeeUnavailabilityMapper.toDTO(savedUnavailability);
    }

    public void deleteById(Long employeeId, Long id) {
        EmployeeUnavailability unavailability = findByIdAndEmployeeId(id, employeeId);
        unavailabilityRepository.delete(unavailability);
    }

    public EmployeeUnavailability findByIdAndEmployeeId(Long id, Long employeeId){
        return unavailabilityRepository.findByIdAndEmployee_Id(id, employeeId).orElseThrow(
                () -> new ResourceNotFoundException(EmployeeUnavailability.class.getSimpleName(), id)
                );
    }
}
