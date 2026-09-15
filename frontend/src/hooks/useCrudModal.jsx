import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export function useCrudModal() {
    const [editedItem, setEditedItem] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);

    const openCreateModal = () => {
        setEditedItem(null);
        open();
    };

    const openEditModal = (item) => {
        setEditedItem(item);
        open();
    };

    const closeModal = () => {
        close();
        setEditedItem(null);
    };

    return {
        opened: opened,
        editedItem,
        openCreateModal,
        openEditModal,
        closeModal
    };
}