package pl.coderslab.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    protected ResponseEntity<Object> handleEntityNotFound(ResourceNotFoundException exception) {
        CustomError apiError = new CustomError(exception);
        apiError.setCode(exception.getErrorCode());
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmployeeMissingProfessionException.class)
    protected ResponseEntity<Object> handleEmployeeMissingProfession(EmployeeMissingProfessionException exception) {
        CustomError apiError = new CustomError(exception);
        apiError.setCode(exception.getErrorCode());
        return new ResponseEntity<>(apiError, HttpStatus.UNPROCESSABLE_CONTENT);
    }

    @ExceptionHandler(IllegalDeleteException.class)
    protected ResponseEntity<Object> handleIllegalDelete(IllegalDeleteException exception) {
        CustomError apiError = new CustomError(exception);
        apiError.setCode(exception.getErrorCode());
        return new ResponseEntity<>(apiError, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(EmployeeEventConflictException.class)
    protected ResponseEntity<Object> handleEmployeeEventConflict(EmployeeEventConflictException exception) {
        CustomError apiError = new CustomError(exception);
        apiError.setCode(exception.getErrorCode());
        return new ResponseEntity<>(apiError, HttpStatus.NOT_ACCEPTABLE);
    }
}