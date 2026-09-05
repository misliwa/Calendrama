import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export function useCrudParentChildModal() {
    const [itemParent, setItemParent] = useState(null);
    const [editedItem, setEditedItem] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);

    const openCreateModal = (parent) => {
        setItemParent(parent);
        open();
    };

    const openEditModal = (parent, item) => {
        setItemParent(parent);
        setEditedItem(item);
        open();
    };

    const closeModal = () => {
        close();
        setEditedItem(null);
        setItemParent(null);
    };

    return {
        opened,
        editedItem,
        itemParent,
        openCreateModal,
        openEditModal,
        closeModal
    };
}