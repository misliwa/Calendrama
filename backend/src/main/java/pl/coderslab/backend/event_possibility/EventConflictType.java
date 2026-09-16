package pl.coderslab.backend.event_possibility;

public enum EventConflictType {
    STAGE_OCCUPIED,
    EMPLOYEE_UNAVAILABLE,
    EMPLOYEE_ASSIGNED_TO_ANOTHER_EVENT,
    NO_AVAILABLE_EMPLOYEE_FOR_STAFFING
}