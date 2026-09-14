import {Box, Button, Group, Select, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect} from "react";
import {DateTimePicker} from "@mantine/dates";
import dayjs from "dayjs";

function EventForm({onSubmit, eventToEdit, stages, plays}) {

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
            start: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            end: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
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
            start: value =>
                !value ? "Data rozpoczęcia jest wymagana" : null,

            end: (value, values) => {
                if (!value) {
                    return "Data zakończenia jest wymagana";
                }

                return new Date(value.replace(" ", "T")) <=
                new Date(values.start.replace(" ", "T"))
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
                start: eventToEdit.start.replace("T", " "),
                end: eventToEdit.end.replace("T", " "),
                description: eventToEdit.description ?? ''
            });
        } else {
            form.setValues({
                title: '',
                stageId: stages[0] ?? '',
                playId: plays[0] ?? '',
                type: 'PERFORMANCE',
                start: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                end: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                description: '',
            });
        }
    }, [eventToEdit]);


    return (
        <Box h="100%" style={{display: 'flex', flexDirection: 'column', minHeight: 0}}>
            <form onSubmit={form.onSubmit(onSubmit)}>
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
                        key={form.key('start')}
                        {...form.getInputProps('start')}
                    />

                    <DateTimePicker
                        withAsterisk
                        label="Czas zakończenia"
                        placeholder="Wybierz datę"
                        key={form.key('end')}
                        {...form.getInputProps('end')}
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

                        <Button type="submit" onSubmit={onSubmit}>Zapisz</Button>
                    </Group>
                </Stack>
            </form>
        </Box>
    );
}

export default EventForm