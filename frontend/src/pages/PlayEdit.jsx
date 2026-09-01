import PageLayout from "../components/PageLayout.jsx";
import {useFocusReturn} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {useEffect, useState} from "react";
import {Button, Group, NumberInput, Select, Table, TextInput, Text} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";
import {useCrud} from "../hooks/useCrud.jsx";
import {playsApi, playColumns} from "../api/plays.js";
import {stagesApi} from "../api/stages.js";
import {useParams} from "react-router-dom";

function PlayEdit() {
    const { id: editedPlayId } = useParams();
    const isEditMode = !!editedPlayId;
    const [editedPlay, setEditedPlay] = useState(null);

    const {
        items: plays,
        createItem,
        updateItem,
        getItemById: getPlayById
    } = useCrud(playsApi);

    const {
        items: stages
    } = useCrud(stagesApi);

    useEffect(() => {
        if (!editedPlayId) {
            return;
        }
        const loadPlay = async () => {
            const play = await getPlayById(editedPlayId);
            setEditedPlay(play);
        };

        loadPlay();

    }, [editedPlayId]);

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

    const staffingData = [
        { id: 6, profession: "Actor", roleName: 'Hamlet'},
        { id: 7, profession: "Muzyk", roleName: '-'},
        { id: 8, profession: "Actor", roleName: 'Ofelia'},
        { id: 9, profession: "Inspicjent", roleName: '-'},
    ];

    const staffingRows = staffingData.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.profession}</Table.Td>
            <Table.Td>{element.roleName}</Table.Td>
        </Table.Tr>
    ));

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

            <Text size="lg">Role i zadania</Text>
            <Table striped highlightOnHover stickyHeader stickyHeaderOffset={60}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>id</Table.Th>
                        <Table.Th>Zawód</Table.Th>
                        <Table.Th>Nazwa roli</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{staffingRows}</Table.Tbody>
            </Table>


        </PageLayout>
    );

}

export default PlayEdit;