package pl.coderslab.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.profession.Profession;

@Getter
@ResponseStatus(HttpStatus.UNPROCESSABLE_CONTENT)
public class EmployeeMissingProfessionException extends RuntimeException{
    private final ErrorCode errorCode = ErrorCode.EMPLOYEE_MISSING_PROFESSION;

    public EmployeeMissingProfessionException(Employee employee, Profession profession) {
        super(String.format("Employee with id %d can't work as %s", employee.getId(), profession.getName()));
    }
}
