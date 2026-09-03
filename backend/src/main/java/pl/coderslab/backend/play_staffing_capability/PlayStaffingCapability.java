package pl.coderslab.backend.play_staffing_capability;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.play_staffing.PlayStaffing;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "play_staffing_capabilities",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_staffing_employee",
                        columnNames = {
                                "play_staffing_id",
                                "employee_id"
                        }
                )
        })
public class PlayStaffingCapability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne(optional = false)
    @JoinColumn(name = "play_staffing_id", nullable = false)
    private PlayStaffing playStaffing;

    public PlayStaffingCapability(Employee employee){
        this.employee = employee;
    }
}
