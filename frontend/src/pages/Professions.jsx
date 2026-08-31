import PageLayout from "../components/PageLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import {useEffect, useState} from "react";
import * as api from "../api/professions.js";
import {useDisclosure} from "@mantine/hooks";
import ProfessionModal from "../components/ProfessionModal.jsx";
import {create} from "../api/professions.js";

function Professions() {
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editedProfession, setEditedProfession] = useState(null);

    const [opened, {open, close}] = useDisclosure(false);


    const addProfession = async (profession) => {
        try {
            setError(null);
            const createdProfession = await api.create(profession);
            setProfessions(previousStages => [...previousStages, createdProfession]);
        } catch (error) {
            setError(error);
            throw error;
        }

    }

    const updateProfession = async (professionId, profession) => {
        try {
            setError(null);

            const updatedProfession = await api.updateById(professionId, profession);

            setProfessions(previousStages => previousStages
                .map(profession =>
                    profession.id === updatedProfession.id ? updatedProfession : profession
                ));
        } catch (error) {
            setError(error);
            throw error;
        }
    }

    const handleOpenAddModal = () => {
        setEditedProfession(null);
        open();
    };

    const handleOpenEditModal = (stage) => {
        setEditedProfession(stage);
        open();
    };

    const handleModalSubmit = async (values) => {
        if (editedProfession) {
            await updateProfession(editedProfession.id, values);
        } else {
            await addProfession(values);
        }
    };

    const deleteProfession = async (professionId) => {
        const confirmed = window.confirm(
            "Czy na pewno chcesz usunąć ten obiekt?"
        );

        if (!confirmed) {
            return;
        }


        try {
            setError(null);

            await api.deleteById(professionId);

            setProfessions(previousStages =>
                previousStages.filter(stage => stage.id !== professionId)
            );
        } catch (error) {
            setError(error);
        }
    };

    const deleteSelected = async (selectedIds) => {
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

            setProfessions(previous =>
                previous.filter(profession => !selectedIds.includes(profession.id))
            );
        } catch (error) {
            setError(error);
        }

    };

    const loadProfessions = async () => {
        try {
            const professions = await api.findAll();
            setProfessions(professions);
        } catch (e) {
            setError(e);
            console.log(e.status + " " + e.code + " " + e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProfessions();
    }, []);

    return (
        <PageLayout title="Zawody">
            <SearchBar/>
            {error &&
                <div className="alert alert-danger">
                    {error.message}
                </div>
            }
            {loading ? (
                <div>Loading...</div>
            ) : (
                <DataTable
                    columns={api.columns}
                    data={professions}
                    onAdd={handleOpenAddModal}
                    onEdit={handleOpenEditModal}
                    onDelete={deleteProfession}
                    onDeleteSelected={deleteSelected}
                />
            )}
            <ProfessionModal
                opened={opened}
                onClose={close}
                onSubmit={handleModalSubmit}
                professionToEdit={editedProfession}
            />

        </PageLayout>
    );
}

export default Professions;