import {Box, Button, Group, Select, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect} from "react";
import {DateTimePicker} from "@mantine/dates";
import dayjs from "dayjs";

function EventForm({opened, onClose, onSubmit, eventToEdit, stages, plays}) {

    const stageOptions = stages.map(stage => ({
        value: String(stage.id),
        label: stage.name,
    }));

    const playOptions = plays.map(play => ({
        value: String(play.id),
        label: `id. ${play.id}. ${play.title}`,
    }));


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            stageId: stages[0].value ?? '',
            playId: '',
            type: '',
            startDateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            endDateTime: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            description: '',
        },

        validate: {
            title: (value) =>
                value.trim().length < 3 || value.trim().length > 50
                    ? "Tytuł musi mieć co najmniej 3 i mniej niż 50 znaków"
                    : null,
            stageId: (value) =>
                !value
                    ? "Scena jest wymagana"
                    : null,
            type: (value) =>
                !value
                    ? "Typ jest wymagany"
                    : null,
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
        },
    });

    useEffect(() => {
        if (eventToEdit) {
            form.setValues({
                title: eventToEdit.title,
                stageId: eventToEdit.stage.id,
                playId: eventToEdit.play?.id ?? '',
                type: eventToEdit.type,
                startDateTime: eventToEdit.startDateTime.replace("T", " "),
                endDateTime: eventToEdit.endDateTime.replace("T", " "),
                description: eventToEdit.description ?? ''
            });
        } else {
            form.setValues({
                title: '',
                stageId: stages[0] ?? '',
                playId: plays[0] ?? '',
                type: 'PERFORMANCE',
                startDateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                endDateTime: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                description: '',
            });
        }
    }, [eventToEdit]);


    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Box h="100%" style={{display: 'flex', flexDirection: 'column', minHeight: 0}}>
            <form onSubmit={form.onSubmit(async (values) => {
                await onSubmit(values);
                handleClose();
            })}>
                <Stack gap="md">
                    <TextInput
                        label="Tytuł"
                        placeholder="Tytuł wydarzenia"
                        key={form.key('title')}
                        {...form.getInputProps('title')}
                    />

                    <Select
                        label="Scena"
                        placeholder="Scena"
                        searchable
                        data={stageOptions}
                        key={form.key('stageId')}
                        {...form.getInputProps('stageId')}
                    />

                    <Select
                        label="Spektakl"
                        placeholder="Spektakl"
                        clearable
                        searchable
                        data={playOptions}
                        key={form.key('playId')}
                        {...form.getInputProps('playId')}
                    />

                    <Select
                        label="Typ wydarzenia"
                        placeholder="Typ wydarzenia"
                        data={[
                            {value: 'PERFORMANCE', label: 'Spektakl'},
                            {value: 'REHEARSAL', label: 'Próba'},
                            {value: 'EXTERNAL', label: 'Wydarzenie zewnętrzne'},
                            {value: 'MAINTENANCE', label: 'Prace na scenie'}
                        ]}
                        key={form.key('type')}
                        {...form.getInputProps('type')}
                    />

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
                        key={form.key('endDateTime')}cxds
                        {...form.getInputProps('endDateTime')}
                    />

                    <TextInput
                        label="Opis"
                        placeholder="Opis"
                        key={form.key('description')}
                        {...form.getInputProps('description')}
                    />

                    <Group justify="flex-end" mt="md">
                        {eventToEdit ? (
                            <Button type="button" color="red">Usuń</Button>
                        ) : null}

                        <Button type="submit">Zapisz</Button>
                    </Group>
                </Stack>
            </form>
        </Box>
    );
}

export default EventForm