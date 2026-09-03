package pl.coderslab.backend.play_staffing_capability;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.employee.EmployeeRepository;
import pl.coderslab.backend.exception.EmployeeMissingProfessionException;
import pl.coderslab.backend.exception.ResourceNotFoundException;
import pl.coderslab.backend.play_staffing.PlayStaffing;
import pl.coderslab.backend.play_staffing.PlayStaffingRepository;
import pl.coderslab.backend.profession.Profession;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayStaffingCapabilityService {
    private final PlayStaffingCapabilityRepository repository;
    private final PlayStaffingRepository staffingRepository;
    private final EmployeeRepository employeeRepository;

    public List<PlayStaffingCapabilityDTO> findAllByStaffingId(Long id) {
        return repository.findAllByPlayStaffingId(id)
                .stream()
                .map(PlayStaffingCapabilityMapper::toDTO)
                .toList();
    }

    @Transactional
    public Set<PlayStaffingCapabilityDTO> updateStaffingCapabilities(Long staffingId, Set<Long> employeeIds){
        PlayStaffing playStaffing = staffingRepository.findById(staffingId)
                .orElseThrow(() -> new ResourceNotFoundException(PlayStaffing.class.getSimpleName(), staffingId));

        synchronizeCapabilities(playStaffing, employeeIds);

        return playStaffing.getCapabilities().stream()
                .map(PlayStaffingCapabilityMapper::toDTO)
                .collect(Collectors.toSet());
    }

    @Transactional
    public void synchronizeCapabilities(PlayStaffing playStaffing, Set<Long> employeeIds) {
        Set<Employee> updatedEmployees = new HashSet<>(employeeRepository.findAllById(employeeIds));
        Set<Long> realEmployeesIds = updatedEmployees.stream().map(Employee::getId).collect(Collectors.toSet());

        if(employeeIds.size() != realEmployeesIds.size()){
            Long missingId =  employeeIds.stream().filter(id -> !realEmployeesIds.contains(id)).findFirst().orElseThrow();
            throw new ResourceNotFoundException(Employee.class.getSimpleName(), missingId);
        }

        validateEmployeesProfessions(updatedEmployees, playStaffing.getProfession());

        Set<PlayStaffingCapability> existingCapabilities = new HashSet<>(playStaffing.getCapabilities());
        Set<Long> existingCapabilitiesEmployeeIds = existingCapabilities.stream()
                .map(capability ->
                        capability.getEmployee().getId()).collect(Collectors.toSet());

        for (Employee employee : updatedEmployees) {
            if(!existingCapabilitiesEmployeeIds.contains(employee.getId())){
                PlayStaffingCapability capability = new PlayStaffingCapability(employee);
                playStaffing.addCapability(capability);
            }
        }

        for(PlayStaffingCapability capability : existingCapabilities){
            Long employeeId = capability.getEmployee().getId();

            if(!employeeIds.contains(employeeId)){
                playStaffing.removeCapability(capability);
            }
        }
    }

    private void validateEmployeesProfessions(Set<Employee> employees, Profession profession){
        for (Employee employee : employees) {
            if(!employee.getProfessions().contains(profession)){
                throw new EmployeeMissingProfessionException(employee, profession);
            }
        }
    }
}
