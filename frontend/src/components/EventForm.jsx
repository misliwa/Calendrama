import {Box, Button, Group, Modal, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect} from "react";

function EventForm({opened, onClose, onSubmit, professionToEdit}) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
        },

        validate: {
            name: (value) =>
                value.trim().length < 2
                    ? "Nazwa musi mieć co najmniej 2 znaki"
                    : null,
        },
    });

    useEffect(() => {
        if (professionToEdit) {
            form.setValues({
                name: professionToEdit.name,
            });
        } else {
            form.setValues({
                name: '',
            });
        }
    }, [professionToEdit]);



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
                <TextInput
                    withAsterisk
                    label="Nazwa"
                    placeholder="Nazwa zawodu"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Zapisz</Button>
                </Group>
            </form>
        </Box>
    );
}

export default EventForm