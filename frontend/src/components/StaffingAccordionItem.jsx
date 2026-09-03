import {Accordion, Button, Group, Select, Text} from "@mantine/core";
import {useState} from "react";

function StaffingAccordionItem({staffing, employeeOptions, staffingName, onDelete, onEdit, onAddEmployee, onDeleteEmployee}) {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState();

    return (
        <Accordion.Item
            value={staffing.clientId}
        >
            <Accordion.Control icon="👤">
                {staffingName}
            </Accordion.Control>

            <Accordion.Panel>
                <Text c="dimmed" mb="sm">
                    Pracownicy przypisani do tej roli:
                </Text>


                {staffing.capabilities?.map(capability => (
                    <Group key={capability.clientId}>
                        <Text>
                            {`${capability.employee.id}. ${capability.employee.firstName} ${capability.employee.lastName} `}
                        </Text>
                        <Button type="button" color="red" variant="transparent" onClick={() => onDeleteEmployee(staffing.clientId, capability.clientId)}>Usuń</Button>
                    </Group>
                ))}

                <Group justify="flex-end" mt="md">
                    <Select
                        searchable
                        data={employeeOptions}
                        onChange={setSelectedEmployeeId}
                        value={selectedEmployeeId}
                    />


                    <Button variant="light" disabled={!selectedEmployeeId} type="button" onClick={() => {
                        onAddEmployee(staffing.clientId, selectedEmployeeId);
                        setSelectedEmployeeId(null);
                    }}>
                        Dodaj pracownika
                    </Button>

                    <Button variant="default" type="button" onClick={() => onEdit(staffing)}>
                        Edytuj rolę
                    </Button>

                    <Button color="red" variant="light" type="button" onClick={() => onDelete(staffing)}>
                        Usuń rolę
                    </Button>
                </Group>
            </Accordion.Panel>
        </Accordion.Item>
    );
}

export default StaffingAccordionItem;