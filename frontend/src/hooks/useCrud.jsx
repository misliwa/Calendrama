import { useEffect, useState } from "react";

export function useCrud(api) {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try {
            const data = await api.findAll();

            setItems(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const createItem = async (item) => {
        try {
            setError(null);
            const createdItem = await api.create(item);
            setItems(previousItems => [...previousItems, createdItem]);
        } catch (error) {
            setError(error);
            throw error;
        }

    }

    const updateItem = async (itemId, item) => {
        try {
            setError(null);

            const updatedItem = await api.updateById(itemId, item);

            setItems(previous => previous
                .map(item =>
                    item.id === updatedItem.id ? updatedItem : item
                ));
        } catch (error) {
            setError(error);
            throw error;
        }
    }

    const deleteItem = async (itemId) => {
        const confirmed = window.confirm(
            "Czy na pewno chcesz usunąć ten obiekt?"
        );

        if (!confirmed) {
            return;
        }


        try {
            setError(null);

            await api.deleteById(itemId);

            setItems(previous =>
                previous.filter(item => item.id !== itemId)
            );
        } catch (error) {
            setError(error);
        }
    };

    const deleteSelectedItems = async (selectedIds) => {
        const confirmed = window.confirm(
            `Czy na pewno chcesz usunąć ${selectedIds.length} zaznaczonych obiektów?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError(null);

            await Promise.all(
                selectedIds.map(id => api.deleteById(id))
            );

            setItems(previous =>
                previous.filter(item => !selectedIds.includes(item.id))
            );
        } catch (error) {
            setError(error);
        }

    };

    return {
        items,
        error,
        loading,
        createItem,
        updateItem,
        deleteItem,
        deleteSelectedItems
    };
}