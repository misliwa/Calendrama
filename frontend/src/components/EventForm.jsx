import {Alert, Box, Button, Group, Select, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect, useState} from "react";
import {DateTimePicker} from "@mantine/dates";
import dayjs from "dayjs";
import EventAssignmentsModal from "./EventAssignmentsModal.jsx";
import {playStaffingsApi} from "../api/playStaffing.js";
import {useDisclosure} from "@mantine/hooks";
import {checkPossibility} from "../api/eventAvailability.js";

function EventForm({onSubmit, onDelete, eventToEdit, stages, plays}) {

    const stageOptions = stages.map(stage => ({
        value: String(stage.id),
        label: stage.name,
    }));

    const playOptions = plays.map(play => ({
        value: String(play.id),
        label: `id. ${play.id}. ${play.title}`,
    }));

    const [staffingData, setStaffingData] = useState([]);
    const [currentAssignments, setCurrentAssignments] = useState([]);
    const [playChanged, setPlayChanged] = useState(false);
    useEffect(() => {
        setCurrentAssignments(eventToEdit?.assignments ?? []);
        setPlayChanged(false);
    }, [eventToEdit]);

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            title: '',
            stageId: stageOptions[0]?.value ?? '',
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
                stageId: String(eventToEdit.stage.id),
                playId: eventToEdit.play
                    ? String(eventToEdit.play.id)
                    : '',
                type: eventToEdit.type,
                start: eventToEdit.start.replace("T", " "),
                end: eventToEdit.end.replace("T", " "),
                description: eventToEdit.description ?? ''
            });
        } else {
            form.setValues({
                title: '',
                stageId: '',
                playId: '',
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
        const isPlayEvent = ['PERFORMANCE', 'REHEARSAL'].includes(currentType);

        if (!isPlayEvent && currentPlayId) {
            form.setFieldValue('playId', '');
            form.setFieldValue('title', '');
        }
    }, [currentType]);


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

    const [
        assignmentModalOpened,
        {
            open: openAssignmentModal,
            close: closeAssignmentModal
        }
    ] = useDisclosure(false);

    const [possibilityResult, setPossibilityResult] = useState(null);

    const handleCheckPossibility = async () => {
        const validation = form.validate();

        if (validation.hasErrors) {
            return;
        }

        const possibilityRequest = {
            playId: Number(currentPlayId),
            start: form.values.start.replace(" ", "T"),
            end: form.values.end.replace(" ", "T"),
            excludedEventId: eventToEdit?.id ?? null
        };

        const result = await checkPossibility(possibilityRequest);
        setPossibilityResult(result);
    };

    useEffect(() => {
        setPossibilityResult(null);
    }, [currentPlayId, form.values.start, form.values.end]);

    const handlePlayChange = (playId) => {
        form.setFieldValue('playId', playId ?? '');
        setCurrentAssignments([]);
        setPlayChanged(true);

        if (!playId) {
            return;
        }

        const selectedPlay = plays.find(
            play => String(play.id) === String(playId)
        );

        if (!selectedPlay) {
            return;
        }

        const suffix = form.values.type === 'PERFORMANCE'
            ? 'Spektakl'
            : 'Próba';

        form.setFieldValue('title', `${selectedPlay.title} - ${suffix}`);

        const stageId =
            selectedPlay.stageId ?? selectedPlay.stage?.id;

        if (stageId) {
            form.setFieldValue('stageId', String(stageId));
        }
    };

    console.log("playId:", form.values.playId); console.log("playOptions:", playOptions); console.log("plays:", plays);

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
                            onChange={handlePlayChange}
                            data={playOptions}
                            value={form.values.playId}
                            error={form.errors.playId}
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

                    {possibilityResult && (
                        <Alert
                            color={possibilityResult.possible ? "green" : "red"}
                            title={possibilityResult.possible ? "Można wystawić spektakl" : "Nie można wystawić spektaklu"}>

                            {(possibilityResult.conflicts ?? []).map((conflict) => (
                                <div
                                    key={`${conflict.type}-${conflict.message}`}
                                >
                                    {conflict.message}
                                </div>
                            ))}

                            {possibilityResult.warnings.length > 0 ?
                                (<div>Uwagi: </div>) : ('')
                            }

                            {(possibilityResult.warnings ?? []).map((warning) => (
                                <div
                                    key={`${warning.type}-${warning.message}`}
                                    style={{color: "orange"}}
                                >
                                    {warning.message}
                                </div>
                            ))}
                        </Alert>


                    )}

                    <Group justify="flex-end" mt="md">
                        {currentPlayId ? (
                            <Button type="button" color="orange" onClick={handleCheckPossibility}>Sprawdź możliwość
                                wystawienia</Button>
                        ) : null}

                        {(currentPlayId && eventToEdit && !playChanged) ? (
                            <Button type="button" color="green" onClick={openAssignmentModal}>Pracownicy</Button>
                        ) : null}

                        {eventToEdit ? (
                            <Button type="button" color="red" onClick={() => onDelete(eventToEdit.id)}>Usuń</Button>
                        ) : null}

                        <Button type="submit">Zapisz</Button>
                    </Group>
                </Stack>
            </form>
            <EventAssignmentsModal
                opened={assignmentModalOpened}
                onClose={closeAssignmentModal}
                staffingData={staffingData}
                assignments={currentAssignments}
                eventId={eventToEdit?.id}
                onAssignmentsUpdated={setCurrentAssignments}
            />
        </Box>
    );
}

export default EventForm