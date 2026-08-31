import PageLayout from "../components/PageLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import {useEffect, useState} from "react";
import {addStage, deleteStage, getStages} from "../api/stages.js";
import {useDisclosure} from "@mantine/hooks";
import CreateStageModal from "../components/CreateStageModal.jsx";

const stageColumns = [
    {
        name: "id",
        getValue: stage => stage.id
    },
    {
        name: "Nazwa",
        getValue: stage => stage.name
    },
    {
        name: "Opis",
        getValue: stage => stage.description
    },
];

function Stages() {
    const [stages, setStages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [opened, { open, close }] = useDisclosure(false);

    const handleAdd = async (stage) => {
       try{
           setError(null);
           const createdStage = await addStage(stage);
           setStages(previousStages => [...previousStages, createdStage]);
       }catch (error) {
           setError(error);
       }

    }

    const handleDelete = async (stageId) => {
        const confirmed = window.confirm(
            "Czy na pewno chcesz usunąć tę scenę?"
        );

        if (!confirmed) {
            return;
        }


        try {
            setError(null);

            await deleteStage(stageId);

            setStages(previousStages =>
                previousStages.filter(stage => stage.id !== stageId)
            );
        } catch (error) {
            setError(error);
        }
    };

    const handleDeleteSelected = async (selectedStageIds) => {
        const confirmed = window.confirm(
            `Czy na pewno chcesz usunąć ${selectedStageIds.length} zaznaczonych scen?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError(null);

            await Promise.all(
                selectedStageIds.map(stageId => deleteStage(stageId))
            );

            setStages(previousStages =>
                previousStages.filter(stage => !selectedStageIds.includes(stage.id))
            );
        } catch (error) {
            setError(error);
        }

    };

    useEffect(() => {
        const loadStages = async () => {
            try {
                const stages = await getStages();
                setStages(stages);
            } catch (e) {
                setError(e);
                console.log(e.status + " " + e.code + " " + e.message);
            } finally {
                setLoading(false);
            }
        }
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
                    columns={stageColumns}
                    data={stages}
                    onAdd={open}
                    onDelete={handleDelete}
                    onDeleteSelected={handleDeleteSelected}
                />
            )}
            <CreateStageModal
                opened={opened}
                onClose={close}
                onSubmit={handleAdd}
            >

            </CreateStageModal>
        </PageLayout>
    );
}

export default Stages;