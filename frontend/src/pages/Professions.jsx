import PageLayout from "../components/PageLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import {professionsApi, professionColumns} from "../api/professions.js";
import ProfessionModal from "../components/ProfessionModal.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {useCrudModal} from "../hooks/useCrudModal.jsx";
import {Box} from "@mantine/core";
import MantineDataTable from "../components/MantineDataTable.jsx";

function Professions() {
    const {
        items: professions,
        error,
        loading,
        createItem,
        updateItem,
        deleteItem,
        deleteSelectedItems
    } = useCrud(professionsApi);

    const {
        opened,
        editedItem: editedProfession,
        openCreateModal,
        openEditModal,
        closeModal
    } = useCrudModal();


    const handleModalSubmit = async (values) => {
        if (editedProfession) {
            await updateItem(editedProfession.id, values);
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
                    columns={professionColumns}
                    data={professions}
                    onAdd={openCreateModal}
                    onEdit={openEditModal}
                    onDelete={deleteItem}
                    onDeleteSelected={deleteSelectedItems}
                />
            )}
            <ProfessionModal
                opened={opened}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
                professionToEdit={editedProfession}
            />

        </Box>
    );
}

export default Professions;