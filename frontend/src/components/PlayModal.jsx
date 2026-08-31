import {useForm} from "@mantine/form";
import {useEffect} from "react";
import {Button, Group, Modal, NumberInput, Select, TextInput} from "@mantine/core";
import {DatePickerInput} from '@mantine/dates';

function PlayModal({opened, onClose, onSubmit, playToEdit, stages}) {

    const stageOptions = stages.map(stage => ({
        value: stage.id.toString(),
        label: stage.name,
    }));

    const handleSubmit = async (values) => {
        const payload = {
            ...values,
            durationInMinutes: Number(values.durationInMinutes),
            stageId: Number(values.stageId),
        };

        try {
            await onSubmit(payload);
            handleClose();
        } catch (error) {
            console.error('Nie udało się zapisać spektaklu:', error);
        }
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            description: '',
            premiereDate: new Date().toISOString().split('T')[0],
            durationInMinutes: '',
            stageId: '',
        },

        validate: {
            title: (value) =>
                value.trim().length < 1 || value.trim().length > 50
                    ? "Tytuł musi mieć co najmniej 1 i mniej niż 50 znaków"
                    : null,

            durationInMinutes: (value) =>
                value === '' || value === null || Number(value) < 1
                    ? "Czas trwania musi wynosić co najmniej 1 minutę"
                    : null,
            premiereDate: (value) =>
                !value
                    ? "Data premiery jest wymagana"
                    : null,
            stageId: (value) =>
                !value
                    ? "Scena jest wymagana"
                    : null,
        },

    });

    useEffect(() => {
        if (playToEdit) {
            form.setValues({
                title: playToEdit.title,
                description: playToEdit.description,
                premiereDate: playToEdit.premiereDate,
                durationInMinutes: playToEdit.durationInMinutes,
                stageId: playToEdit.stageId?.toString(),
            });
        } else {
            form.setValues({
                title: '',
                description: '',
                premiereDate: new Date().toISOString().split('T')[0],
                durationInMinutes: '',
                stageId: '',
            });
        }
    }, [playToEdit]);


    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={playToEdit ? "Edytuj Spektakl" : "Dodaj spektakl"}
        >
            <form onSubmit={form.onSubmit((values => handleSubmit(values)))}>
                <TextInput
                    withAsterisk
                    label="Tytuł"
                    placeholder="Tytuł Spektaklu"
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                />

                <TextInput
                    withAsterisk
                    label="Opis"
                    placeholder="Opis spektaklu"
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />

                <DatePickerInput
                    withAsterisk
                    label="Data Premiery"
                    placeholder="Wybierz datę"
                    key={form.key('premiereDate')}
                    {...form.getInputProps('premiereDate')}
                />

                <NumberInput
                    label="Czas trwania spektaklu"
                    placeholder="Czas trwania spektaklu (m)"
                    min={1}
                    allowDecimal={false}
                    allowNegative={false}
                    key={form.key('durationInMinutes')}
                    {...form.getInputProps('durationInMinutes')}
                />

                <Select
                    withAsterisk
                    label="Scena"
                    placeholder="Wybierz scenę"
                    key={form.key('stageId')}
                    {...form.getInputProps('stageId')}
                    data={stageOptions}
                />


                <Group justify="flex-end" mt="md">
                    <Button type="submit">Zapisz</Button>
                </Group>
            </form>
        </Modal>
    )
        ;
}

export default PlayModal