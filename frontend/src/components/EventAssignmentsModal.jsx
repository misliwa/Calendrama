import {Button, Checkbox, Group, Modal, MultiSelect, TextInput, Input, Text, Select} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect} from "react";
import StaffingAccordion from "./StaffingAccordion.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {employeesApi} from "../api/employees.js";

function EventAssignmentsModal({opened, onClose, onSubmit, staffingData}) {

    const {
        items: employees
    } = useCrud(employeesApi);

    const form = useForm({
        mode: 'controlled',
        initialValues: {},
    });

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={`Pracownicy wydarzenia`}
        >
            <form onSubmit={form.onSubmit(async (values) => {
                await onSubmit(values);
                handleClose();
            })}>
                {staffingData.map((staffing) => {
                    const staffingName = staffing.roleName
                        ? `${staffing.profession.name} - ${staffing.roleName}`
                        : staffing.profession.name;

                    const employeeOptions = employees
                        .filter(employee => staffing.capabilities.some(capability => capability.employee.id === employee.id))
                        .map(employee => ({
                            value: employee.id.toString(),
                            label: `${employee.id}. ${employee.firstName} ${employee.lastName}`,
                        }));

                    console.log(staffing);

                    return (
                        <Select
                            key={staffing.id}
                            placeholder="Wybierz pracownika"
                            label={staffingName}
                            data={employeeOptions}
                            {...form.getInputProps(String(staffing.id))}
                        />

                    );
                })}

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Zapisz</Button>
                </Group>
            </form>
        </Modal>

    );
}

export default EventAssignmentsModal;