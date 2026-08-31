import {Button, Group, Modal, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

function CreateStageModal({ opened, onClose, onSubmit }) {
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

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title="Dodaj scenę"
        >
            <form onSubmit={form.onSubmit((values) => {onSubmit(values); handleClose(); })}>
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
                    <Button type="submit">Dodaj</Button>
                </Group>
            </form>
        </Modal>
    );
}

export default CreateStageModal