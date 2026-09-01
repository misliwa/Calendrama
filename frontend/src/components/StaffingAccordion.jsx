import {Accordion, Button, Group, Text} from "@mantine/core";

function StaffingAccordion({staffingData}){
    return(
        staffingData.length === 0 ? (
                <Text c="dimmed">
                    Nie dodano jeszcze żadnych ról ani zadań.
                </Text>
            ) : (
                <Accordion variant="separated" radius="md">
                    {staffingData.map((staffing) => {
                        const staffingName = staffing.roleName
                            ? `${staffing.profession} - ${staffing.roleName}`
                            : staffing.profession;

                        return (
                            <Accordion.Item
                                key={staffing.id}
                                value={staffing.id.toString()}
                            >
                                <Accordion.Control icon="👤">
                                    {staffingName}
                                </Accordion.Control>

                                <Accordion.Panel>
                                    <Text c="dimmed" mb="sm">
                                        Pracownicy przypisani do tej roli
                                    </Text>

                                    <Group justify="flex-end" mt="md">
                                        <Button variant="light">
                                            Dodaj pracownika
                                        </Button>

                                        <Button variant="default">
                                            Edytuj rolę
                                        </Button>

                                        <Button color="red" variant="light">
                                            Usuń rolę
                                        </Button>
                                    </Group>
                                </Accordion.Panel>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
            )
    )
}

export  default StaffingAccordion;