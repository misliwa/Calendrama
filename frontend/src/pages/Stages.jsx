import PageLayout from "../components/PageLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import * as api from "../api/stages.js";
import StageModal from "../components/StageModal.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {useCrudModal} from "../hooks/useCrudModal.jsx";

function Stages() {
    const {
        items: stages,
        error,
        loading,
        createItem,
        updateItem,
        deleteItem,
        deleteSelectedItems
    } = useCrud(api);

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
                    columns={api.columns}
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

        </PageLayout>
    );
}

export default Stages;