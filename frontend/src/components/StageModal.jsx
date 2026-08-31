import {Button, Group, Modal, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect} from "react";

function StageModal({opened, onClose, onSubmit, stageToEdit}) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            description: ''
        },

        validate: {
            name: (value) =>
                value.trim().length < 3
                    ? "Nazwa musi mieć co najmniej 3 znaki"
                    : null,
        },
    });

    useEffect(() => {
        if (stageToEdit) {
            form.setValues({
                name: stageToEdit.name,
                description: stageToEdit.description
            });
        } else {
            form.setValues({
                name: '',
                description: ''
            });
        }
    }, [stageToEdit]);



    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={stageToEdit ? "Edytuj scenę" : "Dodaj scenę"}
        >
            <form onSubmit={form.onSubmit(async (values) => {
                await onSubmit(values);
                handleClose();
            })}>
                <TextInput
                    withAsterisk
                    label="Nazwa"
                    placeholder="Nazwa sceny"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />

                <TextInput
                    withAsterisk
                    label="Opis"
                    placeholder="Opis sceny"
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />


                <Group justify="flex-end" mt="md">
                    <Button type="submit">Zapisz</Button>
                </Group>
            </form>
        </Modal>
    );
}

export default StageModal