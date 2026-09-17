import {useForm} from "@mantine/form";
import {Button, Group, Modal, TextInput, Alert} from "@mantine/core";
import { DateTimePicker} from '@mantine/dates';
import dayjs from "dayjs";
import {useEffect} from "react";

function UnavailabilityModal({opened, onClose, onSubmit, employee, editedUnavailability, error}) {

    const handleSubmit = async (employeeId, values) => {
        try {
            const payload = {
                ...values,
                startDateTime: values.startDateTime.replace(' ', 'T'),
                endDateTime: values.endDateTime.replace(' ', 'T')
            };
            await onSubmit(employeeId, payload);
        } catch (error) {
            console.error('Nie udało się zapisać zajętości:', error);
        }
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            startDateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            endDateTime: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            description: '',
        },

        validate: {
            startDateTime: value =>
                !value ? "Data rozpoczęcia jest wymagana" : null,

            endDateTime: (value, values) => {
                if (!value) {
                    return "Data zakończenia jest wymagana";
                }

                return new Date(value.replace(" ", "T")) <=
                new Date(values.startDateTime.replace(" ", "T"))
                    ? "Data zakończenia musi być późniejsza niż data rozpoczęcia"
                    : null;
            },

            description: value =>
                value.trim().length < 2 || value.trim().length > 30
                    ? "Opis musi mieć od 2 do 30 znaków"
                    : null
        }

    });

    useEffect(() => {
        if (editedUnavailability) {
            form.setValues({
                startDateTime: editedUnavailability.startDateTime.replace("T", " "),
                endDateTime: editedUnavailability.endDateTime.replace("T", " "),
                description: editedUnavailability.description ?? ''
            });
        } else {
            form.setValues({
                startDateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                endDateTime: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                description: '',
            });
        }
    }, [editedUnavailability]);

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={`${editedUnavailability ? "Edytuj" : "Dodaj"} zajętość dla ${employee?.firstName} ${employee?.lastName}`}
        >
            {error && (
                <Alert color="red" title="Nie można zapisać zajętości" variant="light" mb="md" >
                    {error.message}
                </Alert>)}
            <form onSubmit={form.onSubmit((values => handleSubmit(employee.id, values)))}>

               <DateTimePicker
                    withAsterisk
                    label="Czas rozpoczęcia"
                    placeholder="Wybierz datę"
                    key={form.key('startDateTime')}
                    {...form.getInputProps('startDateTime')}
                />

                <DateTimePicker
                    withAsterisk
                    label="Czas zakończenia"
                    placeholder="Wybierz datę"
                    key={form.key('endDateTime')}
                    {...form.getInputProps('endDateTime')}
                />

                <TextInput
                    withAsterisk
                    label="Opis"
                    placeholder="Opis zajętości"
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Zapisz</Button>
                </Group>
            </form>
        </Modal>
    )
        ;
}

export default UnavailabilityModal