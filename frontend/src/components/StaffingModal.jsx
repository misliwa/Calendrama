import {Autocomplete, Button, Group, Modal, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect} from "react";

function StaffingModal({opened, onClose, onSubmit, staffingToEdit, professions}) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            profession: '',
            roleName: ''
        },

        validate: {
            profession: (value) =>
                value.trim().length < 2
                    ? "Nazwa musi mieć co najmniej 2 znaki"
                    : null,
        },
    });

    useEffect(() => {
        if (staffingToEdit) {
            form.setValues({
                profession: staffingToEdit.profession,
                roleName: staffingToEdit.roleName
            });
        } else {
            form.setValues({
                profession: '',
                roleName: ''
            });
        }
    }, [staffingToEdit]);



    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={staffingToEdit ? "Edytuj scenę" : "Dodaj scenę"}
        >
            <form onSubmit={form.onSubmit(async (values) => {
                await onSubmit(values);
                handleClose();
            })}>
                <Autocomplete
                    label="Zawód"
                    placeholder="Zawód"
                    data={professions.map(profession => (
                        profession.name
                    ))}
                    key={form.key('profession')}
                    {...form.getInputProps('profession')}
                />

                <TextInput
                    withAsterisk
                    label="Nazwa Roli"
                    placeholder="Nazwa roli (jeśli dotyczy)"
                    key={form.key('roleName')}
                    {...form.getInputProps('roleName')}
                />


                <Group justify="flex-end" mt="md">
                    <Button type="submit">Zapisz</Button>
                </Group>
            </form>
        </Modal>
    );
}

export default StaffingModal