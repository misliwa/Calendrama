import {Button, Checkbox, Group, Modal, MultiSelect, TextInput, Input} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect} from "react";
import {useCrudModal} from "../hooks/useCrudModal.jsx";
import ProfessionModal from "./ProfessionModal.jsx";

function EmployeeModal({opened, onClose, onSubmit, employeeToEdit, professions, createProfession}) {

    const professionOptions = (professions ?? []).map(profession => ({
        value: profession.id.toString(),
        label: profession.name,
    }));

    const {
        opened: professionModalOpened,
        openCreateModal: openCreateProfessionModal,
        closeModal: closeProfessionModal,
    } = useCrudModal();

    const handleProfessionModalSubmit = async (values) => {
            await createProfession(values);
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstName: '',
            lastName: '',
            professions: [],
            employed: false,
        },

        validate: {
            firstName: (value) =>
                value.trim().length < 2 || value.trim().length > 30
                    ? "Imię musi mieć co najmniej 2 i mniej niż 30 znaków"
                    : null,
            lastName: (value) =>
                value.trim().length < 2 || value.trim().length > 30
                    ? "Nazwisko musi mieć co najmniej 2 i mniej niż 30 znaków"
                    : null,
            professions: (value) =>
                value.length === 0
                    ? "Wybierz przynajmniej 1 zawód"
                    : null,
        },
    });

    useEffect(() => {
        if (employeeToEdit) {
            form.setValues({
                firstName: employeeToEdit.firstName,
                lastName: employeeToEdit.lastName,
                professions: employeeToEdit.professions.map(
                    p => p.id.toString()
                ),
                employed: employeeToEdit.employed,
            });
        } else {
            form.setValues({
                firstName: '',
                lastName: '',
                professions: [],
                employed: false,
            });
        }
    }, [employeeToEdit]);


    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={employeeToEdit ? "Edytuj pracownika" : "Dodaj pracownika"}
        >
            <form onSubmit={form.onSubmit(async (values) => {
                await onSubmit(values);
                handleClose();
            })}>
                <TextInput
                    withAsterisk
                    label="Imię"
                    placeholder="Imię pracownika"
                    key={form.key('firstName')}
                    {...form.getInputProps('firstName')}
                />

                <TextInput
                    withAsterisk
                    label="Nazwisko"
                    placeholder="Nazwisko pracownika"
                    key={form.key('lastName')}
                    {...form.getInputProps('lastName')}
                />

                <MultiSelect
                    searchable
                    hidePickedOptions
                    label="Zawody"
                    data={professionOptions}
                    key={form.key('professions')}
                    {...form.getInputProps('professions')}
                />

                <Button
                    variant="subtle"
                    type="button"
                    onClick={openCreateProfessionModal}
                >
                    Dodaj nowy zawód
                </Button>

                <Input.Wrapper label="Status zatrudnienia">
                    <Checkbox
                        label="Pracownik etatowy"
                        {...form.getInputProps("employed", {type: "checkbox"})}
                    />
                </Input.Wrapper>

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Zapisz</Button>
                </Group>
            </form>

            <ProfessionModal
                opened={professionModalOpened}
                onClose={closeProfessionModal}
                onSubmit={handleProfessionModalSubmit}
            />
        </Modal>

    );
}

export default EmployeeModal;