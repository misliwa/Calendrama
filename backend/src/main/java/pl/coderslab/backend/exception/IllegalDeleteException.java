package pl.coderslab.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.profession.Profession;

@Getter
@ResponseStatus(HttpStatus.UNPROCESSABLE_CONTENT)
public class IllegalDeleteException extends RuntimeException{
    private final ErrorCode errorCode = ErrorCode.ILLEGAL_DELETE_EXCEPTION;

    public IllegalDeleteException(String message) {
        super(message);
    }
}
