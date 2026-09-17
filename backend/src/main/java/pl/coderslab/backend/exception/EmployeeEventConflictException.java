package pl.coderslab.backend.exception;

import lombok.Getter;

@Getter
public class EmployeeEventConflictException extends RuntimeException {
    private final ErrorCode errorCode = ErrorCode.EMPLOYEE_EVENT_CONFLICT;
    public EmployeeEventConflictException(String message) {
        super(message);
    }
}
