import { useState } from "react";

export function useParentChildCrud(api) {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const load = async (parentId) => {
        setLoading(true);
        try {
            const data = await api.findAll(parentId);

            setItems(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const createItem = async (parentId, item) => {
        try {
            setError(null);
            const createdItem = await api.create(parentId, item);
            setItems(previousItems => [...previousItems, createdItem]);
        } catch (error) {
            setError(error);
            throw error;
        }

    }

    const updateItem = async (parentId, itemId, item) => {
        try {
            setError(null);

            const updatedItem = await api.updateById(parentId, itemId, item);

            setItems(previous => previous
                .map(item =>
                    item.id === updatedItem.id ? updatedItem : item
                ));
        } catch (error) {
            setError(error);
            throw error;
        }
    }

    const deleteItem = async (parentId, itemId) => {
        const confirmed = window.confirm(
            "Czy na pewno chcesz usunąć ten obiekt?"
        );

        if (!confirmed) {
            return;
        }


        try {
            setError(null);

            await api.deleteById(parentId, itemId);

            setItems(previous =>
                previous.filter(item => item.id !== itemId)
            );
        } catch (error) {
            setError(error);
            throw error;
        }
    };

    const deleteSelectedItems = async (parentId, selectedIds) => {
        const confirmed = window.confirm(
            `Czy na pewno chcesz usunąć ${selectedIds.length} zaznaczonych obiektów?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError(null);

            await Promise.all(
                selectedIds.map(id => api.deleteById(parentId, id))
            );

            setItems(previous =>
                previous.filter(item => !selectedIds.includes(item.id))
            );
        } catch (error) {
            setError(error);
        }

    };

    const getItemById = async (parentId, id) => {
        try {
            setError(null);
            const item = await api.getById(parentId, id);
            return item;
        } catch (error) {
            setError(error);
            throw error;
        }
    }

    const clearError = () => { setError(null); };

    return {
        items,
        error,
        loading,
        load,
        createItem,
        updateItem,
        deleteItem,
        deleteSelectedItems,
        getItemById,
        clearError
    };
}