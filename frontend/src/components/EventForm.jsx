import {Box, Button, Group, Select, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect, useState} from "react";
import {DateTimePicker} from "@mantine/dates";
import dayjs from "dayjs";
import {useCrudModal} from "../hooks/useCrudModal.jsx";
import EventAssignmentsModal from "./EventAssignmentsModal.jsx";
import {playStaffingsApi} from "../api/playStaffing.js";
import {useCrud} from "../hooks/useCrud.jsx";
import {employeesApi} from "../api/employees.js";
import {useParentChildCrud} from "../hooks/useParentChildCrud.jsx";

function EventForm({onSubmit, onDelete, eventToEdit, stages, plays}) {

    const stageOptions = stages.map(stage => ({
        value: String(stage.id),
        label: stage.name,
    }));

    const playOptions = plays.map(play => ({
        value: String(play.id),
        label: `id. ${play.id}. ${play.title}`,
    }));

    const {
        items: employees
    } = useCrud(employeesApi);

    const [staffingData, setStaffingData] = useState([]);

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            title: '',
            stageId: stages[0].value ?? '',
            playId: '',
            type: '',
            start: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            end: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            description: '',
        },

        onValuesChange: (values) => {
            if (!['PERFORMANCE', 'REHEARSAL'].includes(values.type)) {
                form.setFieldValue('playId', '');
            }
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
                stageId: stages[0].value ?? '',
                playId: plays[0].value ?? '',
                type: 'PERFORMANCE',
                start: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                end: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                description: '',
            });
        }
    }, [eventToEdit]);

    const currentPlayId = form.values.playId;
    const currentType = form.values.type;

    useEffect(() => {
        if (currentType && !['PERFORMANCE', 'REHEARSAL'].includes(currentType)) {
            form.setFieldValue('playId', '');
            form.setFieldValue('title', '');
            return;
        }

        if (!currentPlayId) return;

        const selectedPlay = plays.find(play => String(play.id) === String(currentPlayId));
        if (!selectedPlay) return;

        const associatedStageId = selectedPlay?.stageId || selectedPlay?.stage?.id;
        if (associatedStageId) {
            form.setFieldValue('stageId', String(associatedStageId));
        }

        const suffix = currentType === 'PERFORMANCE' ? 'Spektakl' : 'Próba';
        form.setFieldValue('title', `${selectedPlay.title} - ${suffix}`);

    }, [currentType, currentPlayId, plays]);


    useEffect(() => {
        if (!currentPlayId) {
            return;
        }
        const loadStaffings = async () => {
            const staffings = await playStaffingsApi.findAllById(currentPlayId);
            setStaffingData(staffings);
        };
        loadStaffings();

    }, [currentPlayId]);

    const {
        opened: assignmentModalOpened,
        openCreateModal: openCreateAssignmentModal,
        openEditModal: openEditAssignmentModal,
        closeModal: closeAssignmentModal
    } = useParentChildCrud();

    return (
        <Box h="100%" style={{display: 'flex', flexDirection: 'column', minHeight: 0}}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack gap="md">
                    <Select
                        label="Typ wydarzenia"
                        placeholder="Typ wydarzenia"
                        data={[
                            {value: 'PERFORMANCE', label: 'Spektakl'},
                            {value: 'REHEARSAL', label: 'Próba'},
                            {value: 'EXTERNAL', label: 'Wydarzenie zewnętrzne'},
                            {value: 'MAINTENANCE', label: 'Prace na scenie'}
                        ]}
                        {...form.getInputProps('type')}
                    />

                    {['PERFORMANCE', 'REHEARSAL'].includes(form.values.type) && (
                        <Select
                            label="Spektakl"
                            placeholder="Spektakl"
                            clearable
                            searchable
                            data={playOptions}
                            {...form.getInputProps('playId')}
                        />
                    )}

                    <TextInput
                        label="Tytuł"
                        placeholder="Tytuł wydarzenia"
                        {...form.getInputProps('title')}
                    />

                    <Select
                        label="Scena"
                        placeholder="Scena"
                        searchable
                        data={stageOptions}
                        {...form.getInputProps('stageId')}
                    />

                    <DateTimePicker
                        withAsterisk
                        label="Czas rozpoczęcia"
                        placeholder="Wybierz datę"
                        {...form.getInputProps('start')}
                    />

                    <DateTimePicker
                        withAsterisk
                        label="Czas zakończenia"
                        placeholder="Wybierz datę"
                        {...form.getInputProps('end')}
                    />

                    <TextInput
                        label="Opis"
                        placeholder="Opis"
                        {...form.getInputProps('description')}
                    />

                    <EventAssignmentsModal
                        opened={assignmentModalOpened}
                        onClose={closeAssignmentModal}
                        staffingData={staffingData}
                        assignments={eventToEdit?.assignments}
                    />

                    <Group justify="flex-end" mt="md">
                        {(currentPlayId && eventToEdit) ? (
                            <Button type="button" color="green" onClick={() => openCreateAssignmentModal(eventToEdit)}>Pracownicy</Button>
                        ) : null}

                        {eventToEdit ? (
                            <Button type="button" color="red" onClick={() => onDelete(eventToEdit.id)}>Usuń</Button>
                        ) : null}

                        <Button type="submit">Zapisz</Button>
                    </Group>
                </Stack>
            </form>
        </Box>
    );
}

export default EventForm