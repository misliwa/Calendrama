package pl.coderslab.backend.employee_unavailability;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import pl.coderslab.backend.employee.Employee;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class EmployeeUnavailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @NotNull
    private LocalDateTime startDateTime;

    @NotNull
    private LocalDateTime endDateTime;

    @NotBlank
    @Size(min = 2, max = 30)
    private String description;

    @AssertTrue(message = "End date must be after start date")
    public boolean isDateRangeValid() {
        if (startDateTime == null || endDateTime == null) {
            return true;
        }

        return endDateTime.isAfter(startDateTime);
    }
}
