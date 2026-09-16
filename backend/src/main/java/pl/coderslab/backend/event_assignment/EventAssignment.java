package pl.coderslab.backend.event_assignment;

import jakarta.persistence.*;
import lombok.*;
import pl.coderslab.backend.employee.Employee;
import pl.coderslab.backend.event.Event;
import pl.coderslab.backend.play_staffing.PlayStaffing;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "event_assignments")
public class EventAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "play_staffing_id", nullable = false)
    private PlayStaffing playStaffing;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConfirmationStatus confirmationStatus;
}
