import PageLayout from "../components/PageLayout.jsx";
import {useForm} from "@mantine/form";
import {useEffect, useState} from "react";
import {Button, Group, NumberInput, Select, TextInput, Text} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";
import {useCrud} from "../hooks/useCrud.jsx";
import {playsApi} from "../api/plays.js";
import {stagesApi} from "../api/stages.js";
import {professionsApi} from "../api/professions.js";
import {playStaffingsApi} from "../api/playStaffing.js";
import {useParams} from "react-router-dom";
import StaffingAccordion from "../components/StaffingAccordion.jsx";
import StaffingModal from "../components/StaffingModal.jsx";
import {useCrudModal} from "../hooks/useCrudModal.jsx";

function PlayEdit() {
    const {id: editedPlayId} = useParams();
    const isEditMode = !!editedPlayId;
    const [editedPlay, setEditedPlay] = useState(null);
    const [staffingData, setStaffingData] = useState([]);

    const {
        createItem,
        updateItem,
        getItemById: getPlayById
    } = useCrud(playsApi);

    const {
        items: stages
    } = useCrud(stagesApi);

    const {
        items: professions
    } = useCrud(professionsApi);

    const {
        opened,
        editedItem: editedStaffing,
        openCreateModal,
        openEditModal,
        closeModal
    } = useCrudModal();

    const handleModalSubmit = async (values) => {
        if (editedStaffing) {
            setStaffingData(previous => previous
                .map(staffing =>
                    staffing.clientId === editedStaffing.clientId ? {...staffing, ...values} : staffing
                ))
        } else {
            setStaffingData(prev => [
                ...prev,
                {
                    ...values,
                    id: null,
                    clientId: crypto.randomUUID()
                }
            ]);
        }
    };


    useEffect(() => {
        if (!editedPlayId) {
            return;
        }
        const loadPlay = async () => {
            const play = await getPlayById(editedPlayId);
            setEditedPlay(play);
        };

        const loadStaffings = async () => {
            const staffings = await playStaffingsApi.findAllById(editedPlayId);
            setStaffingData(
                staffings.map(staffing => ({
                    ...staffing,
                    clientId: crypto.randomUUID()
                }))
            );
        };

        loadPlay()
        loadStaffings();

    }, [editedPlayId]);

    const stageOptions = stages.map(stage => ({
        value: stage.id.toString(),
        label: stage.name,
    }));

    const handleDeleteStaffing = (staffingToDelete) =>
        setStaffingData(prev =>
            prev.filter(
                staffing =>
                    staffing.clientId !== staffingToDelete.clientId
            )
        );

    const handleSubmit = async (values) => {
        const payload = {
            ...values,
            durationInMinutes: Number(values.durationInMinutes),
            stageId: Number(values.stageId),
        };

        try {
            if (isEditMode) {
                await updateItem(editedPlayId, payload);
            } else {
                await createItem(payload);
            }
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
        if (editedPlay) {
            form.setValues({
                title: editedPlay.title,
                description: editedPlay.description,
                premiereDate: editedPlay.premiereDate,
                durationInMinutes: editedPlay.durationInMinutes,
                stageId: editedPlay.stageId?.toString(),
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
    }, [editedPlay]);


    return (
        <PageLayout title={"Szczegóły spektaklu"}>
            <form onSubmit={form.onSubmit((values => handleSubmit(values)))}>
                <TextInput
                    withAsterisk
                    label="Tytuł"
                    placeholder="Tytuł Spektaklu"
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                />

                <TextInput
                    mt="sm"
                    withAsterisk
                    label="Opis"
                    placeholder="Opis spektaklu"
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />

                <DatePickerInput
                    mt="sm"
                    withAsterisk
                    label="Data Premiery"
                    placeholder="Wybierz datę"
                    key={form.key('premiereDate')}
                    {...form.getInputProps('premiereDate')}
                />

                <NumberInput
                    mt="sm"
                    label="Czas trwania spektaklu"
                    placeholder="Czas trwania spektaklu (m)"
                    min={1}
                    allowDecimal={false}
                    allowNegative={false}
                    key={form.key('durationInMinutes')}
                    {...form.getInputProps('durationInMinutes')}
                />

                <Select
                    mt="sm"
                    withAsterisk
                    label="Scena"
                    placeholder="Wybierz scenę"
                    key={form.key('stageId')}
                    {...form.getInputProps('stageId')}
                    data={stageOptions}
                />


                <Group mt="md" mb="sm">
                    <Text size="lg">Role i zadania</Text>
                    <Button type="button" onClick={openCreateModal}>Dodaj</Button>
                </Group>
                <StaffingAccordion
                    staffingData={staffingData}
                    onEdit={openEditModal}
                    onDelete={handleDeleteStaffing}
                />
                <StaffingModal
                    opened={opened}
                    onClose={closeModal}
                    onSubmit={handleModalSubmit}
                    staffingToEdit={editedStaffing}
                    professions={professions}
                >

                </StaffingModal>

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Zapisz</Button>
                </Group>
            </form>


        </PageLayout>
    );

}

export default PlayEdit;