package pl.coderslab.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
    private ErrorCode errorCode = ErrorCode.RESOURCE_NOT_FOUND;

    public ResourceNotFoundException(String message) {
        super(message);
    }
    public ResourceNotFoundException(Long id) {
        super(String.format("Resource with %d not found", id));
    }

    public ResourceNotFoundException(Long id, String resourceName) {
        super(String.format("%s with %d not found", resourceName, id));
    }
}
