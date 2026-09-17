import {Accordion, Button, Group, Select, Text} from "@mantine/core";
import {useState} from "react";
import StaffingAccordionItem from "./StaffingAccordionItem.jsx";

function StaffingAccordion({staffingData, onEdit, onDelete, employees, onAddEmployee, onDeleteEmployee}) {
    return (
        staffingData.length === 0 ? (
            <Text c="dimmed">
                Nie dodano jeszcze żadnych ról ani zadań.
            </Text>
        ) : (
            <Accordion variant="separated" radius="md">
                {staffingData.map((staffing) => {
                    const staffingName = staffing.roleName
                        ? `${staffing.profession.name} - ${staffing.roleName}`
                        : staffing.profession.name;

                    const employeeOptions = employees
                        .filter(employee =>
                            employee.professions.some(
                                profession =>
                                    profession.id === staffing.profession.id
                            )
                        )
                        .filter(employee => !staffing.capabilities.some(capability => capability.employee.id === employee.id))
                        .map(employee => ({
                            value: employee.id.toString(),
                            label: `${employee.id}. ${employee.firstName} ${employee.lastName}`,
                        }));

                    return (
                        <StaffingAccordionItem
                            key={staffing.clientId}
                            staffing={staffing}
                            staffingName={staffingName}
                            employeeOptions={employeeOptions}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onAddEmployee={onAddEmployee}
                            onDeleteEmployee={onDeleteEmployee}
                        />
                    );
                })}
            </Accordion>
        )
    )
}

export default StaffingAccordion;