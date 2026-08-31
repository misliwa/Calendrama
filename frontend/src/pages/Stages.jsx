import PageLayout from "../components/PageLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import {useEffect, useState} from "react";
import * as stageApi from "../api/stages.js";
import {useDisclosure} from "@mantine/hooks";
import StageModal from "../components/StageModal.jsx";

function Stages() {
    const [stages, setStages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editedStage, setEditedStage] = useState(null);

    const [opened, {open, close}] = useDisclosure(false);


    const addStage = async (stage) => {
        try {
            setError(null);
            const createdStage = await stageApi.addStage(stage);
            setStages(previousStages => [...previousStages, createdStage]);
        } catch (error) {
            setError(error);
            throw error;
        }

    }

    const updateStage = async (stageId, stage) => {
        try {
            setError(null);

            const updatedStage = await stageApi.updateStage(stageId, stage);

            setStages(previousStages => previousStages
                .map(stage =>
                    stage.id === updatedStage.id ? updatedStage : stage
                ));
        } catch (error) {
            setError(error);
            throw error;
        }
    }

    const handleOpenAddModal = () => {
        setEditedStage(null);
        open();
    };

    const handleOpenEditModal = (stage) => {
        setEditedStage(stage);
        open();
    };

    const handleModalSubmit = async (values) => {
        if (editedStage) {
            await updateStage(editedStage.id, values);
        } else {
            await addStage(values);
        }
    };

    const deleteStage = async (stageId) => {
        const confirmed = window.confirm(
            "Czy na pewno chcesz usunąć tę scenę?"
        );

        if (!confirmed) {
            return;
        }


        try {
            setError(null);

            await stageApi.deleteStage(stageId);

            setStages(previousStages =>
                previousStages.filter(stage => stage.id !== stageId)
            );
        } catch (error) {
            setError(error);
        }
    };

    const deleteSelectedStages = async (selectedStageIds) => {
        const confirmed = window.confirm(
            `Czy na pewno chcesz usunąć ${selectedStageIds.length} zaznaczonych scen?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError(null);

            await Promise.all(
                selectedStageIds.map(stageId => stageApi.deleteStage(stageId))
            );

            setStages(previousStages =>
                previousStages.filter(stage => !selectedStageIds.includes(stage.id))
            );
        } catch (error) {
            setError(error);
        }

    };

    const loadStages = async () => {
        try {
            const stages = await stageApi.getStages();
            setStages(stages);
        } catch (e) {
            setError(e);
            console.log(e.status + " " + e.code + " " + e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadStages();
    }, []);

    return (
        <PageLayout title="Sceny">
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
                    columns={stageApi.stageColumns}
                    data={stages}
                    onAdd={handleOpenAddModal}
                    onEdit={handleOpenEditModal}
                    onDelete={deleteStage}
                    onDeleteSelected={deleteSelectedStages}
                />
            )}
            <StageModal
                opened={opened}
                onClose={close}
                onSubmit={handleModalSubmit}
                stageToEdit={editedStage}
            />

        </PageLayout>
    );
}

export default Stages;