import PageLayout from "../components/PageLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import {stagesApi, stageColumns} from "../api/stages.js";
import StageModal from "../components/StageModal.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {useCrudModal} from "../hooks/useCrudModal.jsx";
import {Box} from "@mantine/core";
import MantineDataTable from "../components/MantineDataTable.jsx";

function Stages() {
    const {
        items: stages,
        error,
        loading,
        createItem,
        updateItem,
        deleteItem,
        deleteSelectedItems
    } = useCrud(stagesApi);

    const {
        opened,
        editedItem: editedStage,
        openCreateModal,
        openEditModal,
        closeModal
    } = useCrudModal();

    const handleModalSubmit = async (values) => {
        if (editedStage) {
            await updateItem(editedStage.id, values);
        } else {
            await createItem(values);
        }
    };


    return (
        <Box h="100%" style={{display: 'flex', flexDirection: 'column', minHeight: 0}}>
            {error &&
                <div className="alert alert-danger">
                    {error.message}
                </div>
            }
            {loading ? (
                <div>Loading...</div>
            ) : (
                <MantineDataTable
                    columns={stageColumns}
                    data={stages}
                    onAdd={openCreateModal}
                    onEdit={openEditModal}
                    onDelete={deleteItem}
                    onDeleteSelected={deleteSelectedItems}
                />
            )}
            <StageModal
                opened={opened}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
                stageToEdit={editedStage}
            />
        </Box>
    );
}

export default Stages;